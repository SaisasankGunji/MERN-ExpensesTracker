const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
const categoryRouter = require("./routes/categoryRouter");
const transactionRouter = require("./routes/transactionRouter");
const app = express();

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/mern-expenses")
  .then(() => console.log("DB Connected"))
  .catch((e) => console.log(e));

// CORS Configuration
const corsOptions = {
  origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));

// Middlewares
app.use(express.json()); // Parse incoming JSON data

// Routes
app.use("/", userRouter);
app.use("/", categoryRouter);
app.use("/", transactionRouter);

app.get("/", (req, res) => {
  res.send({
    activeStatus: true,
    error: false,
  });
});

// Error Handler
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
