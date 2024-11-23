const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const connectDb = require("./config/db")
const todoRoutes = require("./routes/todoRoutes")
const authRoutes = require("./routes/authRoutes")

// Load env varilables
dotenv.config();
const port = process.env.PORT || 5000

//connect to DB
connectDb();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/todos", todoRoutes);
app.use('/api/users', authRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running on Port: ${port}`)
});

