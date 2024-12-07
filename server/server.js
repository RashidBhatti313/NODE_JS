const http = require("http");
const fs = require("fs");
const url = require("url");

// const myServer = http.createServer((req, res) => {
//   //   console.log(req);
//   const log = `${Date.now()}: New Req Recived\n`;
//   fs.appendFile("log.txt", log, (err, data) => {
//     res.end("Hello From Server Again!");
//   });
// });

const myServer = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") return res.end();
  //   console.log(req);
  const log = `${Date.now()}: ${req.method} ${req.url} New Request Recived\n`;
  const myUrl = url.parse(req.url, true);
  //   console.log(myUrl);
  fs.appendFile("log.txt", log, (err, data) => {
    switch (myUrl.pathname) {
      case "/":
        if (req.method === "GET") res.end("HomePage");
        break;
      case "/about":
        // const qp = res.end("Im Rashid Hussain");
        const username = myUrl.query.myname;
        res.end(`Hi, ${username}`);
        // res.end("Hello I M Rashid Hussain");
        break;
      case "/search":
        const search = myUrl.query.search_query;
        res.end("Here are Your Results For " + search);
      case "/signup":
        if (req.method === "GET") res.end("This is SignUp Form!");
        else if (req.method === "POST") {
          // DB Query
          res.end("Success!");
        }
      default:
        res.end("404 Not Found");
        break;
    }
  });
});

myServer.listen(8000, () => console.log("Server Started!"));
