const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const { timeStamp } = require("console");

const app = express();
const PORT = 8000;

// Connection Mongodb
mongoose
  .connect("mongodb://127.0.0.1:27017/my-first-database")
  .then(() => console.log("mongoDB Connected"))
  .catch((err) => console.log("mongoDB Error", err));

// Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timeStamp: true }
);

const User = mongoose.model("user", userSchema);

// Middleware
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `${Date.now()}: ${req.ip} ${req.method}: ${req.path} \n`,
    (err, data) => {
      next();
    }
  );
});

app.get("/users", async (req, res) => {
  const allDBUsers = await User.find({});
  const html = `<ul>
        ${allDBUsers
          .map(
            (user) =>
              // `<li>${user.first_name} -------- ${user.last_name} -------- ${user.email} -------- ${user.gender} -------- ${user.job_title}</li>`
              `<li>${user.firstName} ------ ${user.email}</li>`
          )
          .join("")}
        </ul>`;
  res.send(html);
});

app.get("/api/users", async (req, res) => {
  const allDBUsers = await User.find({});
  return res.json(allDBUsers);
});

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "user are Not Found" });
    return res.json(user);
  })
  .patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { lastName: "Changed" });
    return res.json({ status: "Success...." });
  })
  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "success...." });
  });

app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All fields are reqiured..." });
  }

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });
  console.log("Result", result);

  return res.status(201).json({ msg: "Success..." });
});

app.listen(PORT, () => console.log(`Server is Started at Port ${PORT}`));
