const mongoose = require("mongoose");

async function connectMongoDb(url) {
  return mongoose.connect(url);
}
// url = "mongodb://127.0.0.1:27017/my-first-database"

module.exports = {
  connectMongoDb,
};
