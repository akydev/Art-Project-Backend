const mongoose = require("mongoose");

const dbConnection = (url) => {
  mongoose
    .set("strictQuery", false)
    .connect(url)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));
};

module.exports = { dbConnection };
