"use client";

const TodoItem = ({ todo, handleEditTodo, handleDelete, selectedTodos, setSelectedTodos }) => {
  const handleSelect = (e) => {
    const { checked } = e.target;
    setSelectedTodos((prevSelected) =>
      checked ? [...prevSelected, todo._id] : prevSelected.filter((id) => id !== todo._id)
    );
  };

  const handleItemClick = () => {
    const isSelected = selectedTodos.includes(todo._id);
    if (isSelected) {
      setSelectedTodos(selectedTodos.filter((id) => id !== todo._id));
    } else {
      setSelectedTodos([...selectedTodos, todo._id]);
    }
  };

  const isChecked = selectedTodos.includes(todo._id);

  return (
    <li
      className={`todo-card ${isChecked ? 'selected' : ''}`}
      onClick={handleItemClick}
    >
      <div className="checkbox-container">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleSelect}
          id={`todo-checkbox-${todo._id}`}
        />
      </div>

      <div className="todo-info">
        <strong className="todo-title">{todo.title}</strong>
        <span className="todo-status">{todo.status}</span>
        <span className="todo-due-date">
          (Due: {new Date(todo.dueDate).toLocaleDateString()})
        </span>

        <p className="todo-description">{todo.description}</p>
        <p className="todo-assignee"> {todo.assignee ? `Assigned to: ${todo.assignee}` : "Unassigned"}</p>
      </div>

      <div className="todo-actions">
        <button onClick={() => handleEditTodo(todo)} className="edit-btn">Edit</button>
      </div>
    </li>
  );
};

export default TodoItem;
