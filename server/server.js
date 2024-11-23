const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const bodyParser = require("body-parser")
const connectDb = require("./config/db")
const todoRoutes = require("./routes/todoRoutes")

// Load env varilables
dotenv.config();
const port = process.env.PORT || 5000

//connect to DB
connectDb();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/todos", todoRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running on Port: ${port}`)
});

