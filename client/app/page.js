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
  const [isEditing, setIsEditing] = useState(false);  // To track if we are editing a todo
  const [selectedTodos, setSelectedTodos] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [itemsToDelete, setItemsToDelete] = useState([]);

  // Fetch TODOs
  useEffect(() => {
    async function fetchTodos() {
      const response = await fetch("http://localhost:5000/api/todos");
      const data = await response.json();
      setTodos(data);
    }
    fetchTodos();
  }, []);

  // Add or Edit TODO
  const handleSaveTodo = async () => {
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
      dueDate: todo.dueDate,
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
    try {
      for (let id of itemsToDelete) {
        await fetch(`http://localhost:5000/api/todos/${id}`, {
          method: "DELETE",
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

  return (
    <div>
      <header>
        <h1>TODO List</h1>
      </header>

      <TodoForm
        newTodo={newTodo}
        setNewTodo={setNewTodo}
        handleSaveTodo={handleSaveTodo}
        isEditing={isEditing}
      />

      <div className="gray-line"></div>

      {todos.length > 0 &&
        <TodoFilters
          setFilter={setFilter}
          filter={filter}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
      }

      {sortedTodos.length > 0 && <button className="delete-multiple-btn" onClick={handleMultipleDelete} disabled={selectedTodos.length === 0}>
        Delete Selected
      </button>}


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
