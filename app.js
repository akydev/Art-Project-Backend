// Import express
const express = require("express"); //Express module included in this file.

// Create an Express app
const app = express(); //Now express is intrigated in the app function.

// const port = 3000;
// app.listen(() => console.log("Server listening on port number", port));

// Define a route for the root URL
app.get("/", (req, res) => {
  res.send("This is the server response message: Hello World..!");
});

app.get("/greet", (req, res) => {
  const msg = req.query.name;
  res.send(`Hello ${msg}`);
});

app.use(express.json()); // Middleware to parse JSON bodies

app.post("/submit", (req, res) => {
  const { username, email } = req.body;
  res.send(`Received data: ${username}, ${email}`);
});

// Set the server to listen on port 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
