const fs = require("fs");

// Sync...
// fs.writeFileSync("./test.txt", "Hey There Brother!");

// Async...
// fs.writeFile("./test.txt", "Hello World Async...", (err) => {});

// Read File Sync..
// const result = fs.readFileSync("./contacts.txt", "utf-8");
// console.log(result);

// Read File Async
// fs.readFile("./contacts.txt", "utf-8", (err, result) => {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log(result);
//   }
// });

// Append Value in file Sync...

// fs.appendFileSync("./test.txt", new Date().getDate().toLocaleString());

// fs.appendFileSync("./test.txt", `Hey There!\n`);

// fs.appendFileSync("./test.txt", `${Date.now()} Hey There!\n`);

// Copy File Sync...
// fs.cpSync('./test.txt', './copy.txt');

// Delete File
// fs.unlinkSync("./copy.txt");

//statics File
// console.log(fs.statSync("./test.txt").isFile());
// console.log(fs.statSync("./test.txt").isDirectory());

// Make Directory (mkdir)
// fs.mkdirSync("my-docs");
// fs.mkdirSync("my-docss/a/b", { recursive: true });
