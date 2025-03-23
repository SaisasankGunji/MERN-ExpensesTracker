const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
const categoryRouter = require("./routes/categoryRouter");
const transactionRouter = require("./routes/transactionRouter");
const app = express();

//Connect to mongodb
mongoose
  mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://Saisasank:Saisasank@123@cluster0.y5nye.mongodb.net/mern-expenses?retryWrites=true&w=majority&appName=Cluster0");
  .then(() => console.log("DB Connected"))
  .catch((e) => console.log(e));

//! Cors config
const corsOptions = {
  origin: [
    "http://localhost:5173", // for local development
    "https://mern-expenses-tracker-three.vercel.app" // deployed frontend
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

//!Middlewares
app.use(express.json()); //?Pass incoming json data

//Routes
app.use("/", userRouter);
app.use("/", categoryRouter);
app.use("/", transactionRouter);

app.get("/", (req, res) => {
  res.send({
    activeStatus: true,
    error: false,
  });
});
//! Error
app.use(errorHandler);

//Start the server

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on this port ${PORT}`));
