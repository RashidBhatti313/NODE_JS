const cluster = require("node:cluster");
const express = require("express");
const os = require("os");

const totalCPUs = os.cpus().length;

if (cluster.isPrimary) {
  // Fork workers.
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }
} else {
  const app = express();
  const PORT = 8000;

  app.get("/", (req, res) => {
    return res.json({ message: `Hello from express Server.${process.pid}` });
  });

  app.listen(PORT, () => console.log(`Server is Started at PORT:${PORT}`));
}
