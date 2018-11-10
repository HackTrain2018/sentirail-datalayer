require("dotenv").config();

import express = require("express");
import "./twitter";

const PORT = 3000;

const app = express();

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.listen(PORT , () => {
  console.log(`Application listening on port ${PORT}`);
});
