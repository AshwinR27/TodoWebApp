"use client";

const TodoForm = ({ newTodo, setNewTodo, handleSaveTodo, isEditing }) => {
    return (
        <form className="form-container" onSubmit={handleSaveTodo}>
            <input
                autoComplete="off"
                id="title-el"
                type="text"
                placeholder="Title"
                value={newTodo.title}
                onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                required
            />
            <textarea
                autoComplete="off"
                placeholder="Description (optional)"
                value={newTodo.description}
                onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
            />
            <input
                type="date"
                value={newTodo.dueDate}
                onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
                required
            />
            <select
                value={newTodo.status}
                onChange={(e) => setNewTodo({ ...newTodo, status: e.target.value })}
            >
                <option value="Pending">Pending</option>
                <option value="In Review">In Review</option>
                <option value="Completed">Completed</option>
            </select>
            <input
                autoComplete="off"
                type="text"
                placeholder="Assignee (optional)"
                value={newTodo.assignee}
                onChange={(e) => setNewTodo({ ...newTodo, assignee: e.target.value })}
            />
            <button type="submit">
                {isEditing ? "Save Todo" : "Add Todo"}
            </button>
        </form>

    );
};

export default TodoForm;
