const express = require("express");
const fs = require("fs");
const zlip = require("zlib");
const status = require("express-status-monitor");

const app = express();
const PORT = 9000;

app.use(status());

fs.createReadStream("./sample.txt").pipe(
  zlip.createGzip().pipe(fs.createWriteStream("./sample.zip"))
);

app.get("/", (req, res) => {
  const stream = fs.createReadStream("./sample.txt", "utf-8");
  stream.on("data", (chunk) => res.write(chunk));
  stream.on("end", () => res.end());
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
