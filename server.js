//Require express
const express = require("express");

// Require connectDB
const connectDB = require("./config/connectDB");

// Init express
const app = express();

//ConnectDB
connectDB();

app.use(express.json());


// Create port
const port = process.env.PORT || 5000;

// Launch the server
app.listen(port, (error) =>
  error ? console.log("error") : console.log(`The server is running on port ${port}`)
);
