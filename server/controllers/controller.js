const asyncHandler = require("express-async-handler")
const Todo = require("../models/Todo")

// @route GET /api/todos
// @desc Get all TODO items
const getAllTodos = asyncHandler(async (req, res) => {
    const todos = await Todo.find({ user_id: req.user.id }).sort({ dueDate: 1 });
    res.json(todos);
})

// @route POST /api/todos
// @desc Create a new Todo
const createTodo = asyncHandler(async (req, res) => {
    const { title, description, dueDate, status, assignee } = req.body;

    const newTodo = new Todo({
        title,
        description,
        dueDate,
        status,
        assignee,
        user_id: req.user.id
    });

    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo)
});

// @route PUT /api/todos/:id
// @desc Update a Todo item
const updateTodo = asyncHandler(async (req, res) => {

    const updatedTodo = await Todo.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );

    if (!updatedTodo) {
        return res.status(404).json({ message: "Todo not found" });
    }

    res.json(updatedTodo)
});

// @route DELETE /api/todos/:id
// @desc Delete a Todo item
const deleteTodo = asyncHandler(async (req, res) => {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

    if (!deletedTodo) {
        return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo deleted successfully" });
})

module.exports = { getAllTodos, createTodo, updateTodo, deleteTodo }