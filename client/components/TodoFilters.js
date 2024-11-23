"use client";

const TodoFilters = ({ setFilter, filter, sortOrder, setSortOrder }) => {
  return (
    <div className="filters-container">
      <h3>Filters</h3>
      <select onChange={(e) => setFilter(e.target.value)} value={filter}>
        <option value="All">All</option>
        <option value="Pending">Pending</option>
        <option value="In Review">In Review</option>
        <option value="Completed">Completed</option>
      </select>

      <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
        Sort by Due Date ({sortOrder === "asc" ? "Ascending" : "Descending"})
      </button>
    </div>
  );
};

export default TodoFilters;
