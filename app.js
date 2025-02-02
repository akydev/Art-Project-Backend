const express = require("express");
const { dbConnection } = require("./db/database");
const userRoutes = require("./routhing/user");

const app = express();
const port = 3001;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("api/user", userRoutes);

const startConnection = async () => {
  try {
    await dbConnection("mongodb://localhost:27017/artproject");
    await app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startConnection();
