const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const { error } = require("console");

const app = express();
const PORT = 8000;

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

// app.use((req, res, next) => {
//   console.log("Hello Hey From Middleware 01:.....");
//   req.myUserName = "Muhammad Rashid Hussain";
//   //   return res.json({ msg: "Hello Hey From Middleware 01:....." });
//   next();
// });

// app.use((req, res, next) => {
//   console.log("Hello Hey From Middleware 02:.....", req.myUserName);
//   //   return res.json({ msg: "Hello Hey From Middleware 02:....." });
//   next();
// });

app.get("/users", (req, res) => {
  const html = `<ul>
        ${users
          .map(
            (user) =>
              // `<li>${user.first_name} -------- ${user.last_name} -------- ${user.email} -------- ${user.gender} -------- ${user.job_title}</li>`
              `<li>${user.first_name}</li>`
          )
          .join("")}
        </ul>`;
  res.send(html);
});

app.get("/api/users", (req, res) => {
  res.setHeader("X-myName", "Rashid Hussain");
  console.log(req.headers);
  console.log("I am in Get Root", req.myUserName);
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) return res.status(404).json({ error: "user are Not Found" });
    return res.json(user);
  })
  .patch((req, res) => {
    // TODO: Edit the user with id
    return res.json({ status: "pending" });
  })
  .delete((req, res) => {
    // TODO: Delete the user with id
    return res.json({ status: "pending" });
  });

app.post("/api/users", (req, res) => {
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
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.status(201).json({ status: "Success", id: users.length });
  });
});

app.listen(PORT, () => console.log(`Server is Started at Port ${PORT}`));
