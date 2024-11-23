const mongoose = require("mongoose")

const TodoSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    description: {
        type: String
    },
    dueDate: {
        type: Date,
        required: [true, "Due date is required"]
    },
    status: {
        type: String,
        enum: ["Pending", "In Review", "Completed"],
        default: "Pending"
    },
    assignee: {
        type: String
    }
}, { timestamps: true });


module.exports = mongoose.model("Todo", TodoSchema);