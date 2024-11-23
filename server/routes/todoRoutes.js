const express = require("express");
const { getAllTodos, createTodo, updateTodo, deleteTodo } = require("../controllers/controller")
const router = express.Router()
const { protect } = require('../middleware/authMiddleware');

router.use(protect)
router.route("/").get(getAllTodos).post(createTodo);
router.route("/:id").put(updateTodo).delete(deleteTodo);

module.exports = router
