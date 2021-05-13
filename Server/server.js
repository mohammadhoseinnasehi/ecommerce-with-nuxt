const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
// Middlewares
const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json("Hello Ecommerce");
});

app.post("/", (req, res) => {
  console.log(req.body);
});

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Listening to Port", 3000);
  }
});
