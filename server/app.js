const conn = require("./database").connection;
const query = require("./database").executeQuery;
const passport = require("passport");
const express = require("express");
const app = express();

conn.connect((e) => {
  if (e) console.log(e);
});

app.use(express.json({ limit: "10kb" }));

app.get("/", (req, res, next) => {
  res.json({ message: "success" });
});

app.get("/users", async (req, res, next) => {
  try {
    const result = await query("select * from user");
    console.log(result);
    res.end();
  } catch (e) {
    console.log(e);
  }
});

app.listen("3001", () => {
  console.log("App is running on port 3001");
});
