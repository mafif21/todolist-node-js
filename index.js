// import all depedencies
const express = require("express");
const bodyParser = require("body-parser");

// initialization
const app = express();
const port = 3000;

// setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(port, () => console.log("Connected"));
