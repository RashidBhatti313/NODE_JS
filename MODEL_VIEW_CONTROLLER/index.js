const express = require("express");

const { connectMongoDb } = require("./connections.js");
const { logReqRes } = require("./middleware");
const userRouter = require("./router/users");

const app = express();
const PORT = 8000;

//Connections
connectMongoDb("mongodb://127.0.0.1:27017/my-first-database").then(() =>
  console.log("Mongodb Connected!")
);

// Middleware
app.use(express.urlencoded({ extended: false }));

app.use(logReqRes("log.txt"));

app.use("/api/users", userRouter);

app.listen(PORT, () => console.log(`Server is Started at Port ${PORT}`));
