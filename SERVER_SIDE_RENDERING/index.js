const express = require("express");
const { connectToMongoDB } = require("./connect");
const path = require("path");
const urlRouter = require("./router/url");
const staticRoute = require("./router/staticRouter");
const URL = require("./models/url");

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("MongoDB Connected")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// for testing ..............
// app.get("/test", async (req, res) => {
//   const allUrls = await URL.find({});
//   return res.render("home", {
//     urls: allUrls,
//   });
// });

app.use("/url", urlRouter);
app.use("/", staticRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  if (entry) {
    res.redirect(entry.redirectURL);
  } else {
    res.status(404).send("URL not found");
  }
});

app.listen(PORT, () => console.log(`Server Started At Port ${PORT}`));
