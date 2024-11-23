"use client";

import { useState, useEffect } from "react";
import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";
import TodoFilters from "../components/TodoFilters";
import DeleteConfirmation from "../components/DeleteConfirmation";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "Pending",
    assignee: "",
  });
  const [filter, setFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTodos, setSelectedTodos] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [itemsToDelete, setItemsToDelete] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      window.location.href = "/auth";
    } else {
      fetchTodos();
    }
  }, []);

  // Fetch TODOs
  const fetchTodos = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:5000/api/todos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`, // Add the token here
        },
      });
      const data = await response.json();

      if (Array.isArray(data)) {
        setTodos(data);
      } else {
        console.error("API response is not an array:", data);
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/auth"
  }

  // Add or Edit TODO with validation
  const handleSaveTodo = async () => {
    const authToken = localStorage.getItem("authToken");
    if (!newTodo.title || !newTodo.dueDate) {
      alert("Title and Due Date are required!");
      return;
    }

  


      if (isEditing) {
        // update the existing TODO
        const response = await fetch(`http://localhost:5000/api/todos/${newTodo._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`
          },
          body: JSON.stringify(newTodo),
        });
        const data = await response.json();
        setTodos((prevTodos) =>
          prevTodos.map((item) => (item._id === data._id ? data : item))
        );
      } else {
        // create a new TODO
        const response = await fetch("http://localhost:5000/api/todos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`
          },
          body: JSON.stringify(newTodo),
        });
        const data = await response.json();
        setTodos([...todos, data]);
      }

      // Reset form after save
      setIsEditing(false);
      setNewTodo({ title: "", description: "", dueDate: "", status: "Pending", assignee: "" });
    };

    const handleEditTodo = (todo) => {
      setIsEditing(true);
      setNewTodo({
        _id: todo._id,
        title: todo.title,
        description: todo.description || "",
        dueDate: todo.dueDate ,
        status: todo.status,
        assignee: todo.assignee || "",
      });

      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleMultipleDelete = () => {
      setItemsToDelete(selectedTodos);
      setShowConfirmation(true);
    };

    const confirmDelete = async () => {
      const authToken = localStorage.getItem("authToken");
      try {
        for (let id of itemsToDelete) {
          await fetch(`http://localhost:5000/api/todos/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${authToken}`
            }
          });
        }
        setTodos(todos.filter((todo) => !itemsToDelete.includes(todo._id)));
        setSelectedTodos([]);
        setShowConfirmation(false);
      } catch (error) {
        console.error("Error deleting TODO:", error);
      }
    };

    const cancelDelete = () => {
      setShowConfirmation(false);
      setItemsToDelete([]);
    };

    // Filter TODOs
    const filteredTodos = todos.filter((todo) =>
      filter === "All" ? true : todo.status === filter
    );

    // Sort TODOs by due date
    const sortedTodos = [...filteredTodos].sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    if (loading) {
      return <div className="load-el">Loading...</div>; 
    }

    return (
      <div>
        <header>
          <h1>Todo App</h1>
          <button onClick={() => handleLogout()}>Logout</button>
        </header>

        <TodoForm
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          handleSaveTodo={handleSaveTodo}
          isEditing={isEditing}
        />

        <div className="gray-line"></div>

        {todos.length > 0 && (
          <TodoFilters
            setFilter={setFilter}
            filter={filter}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
        )}

        {sortedTodos.length > 0 && (
          <button
            className="delete-multiple-btn"
            onClick={handleMultipleDelete}
            disabled={selectedTodos.length === 0}
          >
            Delete Selected
          </button>
        )}

        <ul className="todo-list">
          {sortedTodos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              selectedTodos={selectedTodos}
              setSelectedTodos={setSelectedTodos}
              handleEditTodo={handleEditTodo}
            />
          ))}
        </ul>

        {showConfirmation && (
          <DeleteConfirmation
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
            itemCount={itemsToDelete.length}
          />
        )}
      </div>
    );
  };

  export default Home;
