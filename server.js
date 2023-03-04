const express = require("express");
const path = require("path");
const router = require("./router");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "noda_modules")));
app.use("/", router);
app.listen(port, function () {
  console.log(`Running server on port ${port}`);
});
