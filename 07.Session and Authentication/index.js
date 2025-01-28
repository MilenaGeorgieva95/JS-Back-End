import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("It works");
});

app.get("/set-cookie-manually", (req, res) => {
  // res.writeHead(200, {'Set-Cookie': 'username=John'});
  // res.end();

  //Express
  res.setHeader("Set-Cookie", "username=Cath");
  res.end();
});

app.get("/get-cookie-manually", (req, res) => {
  const cookie = req.header("Cookie");
  console.log(cookie);
  res.send("Cookie taken");
});

//Using cookie-parser library
app.get("/set-cookie", (req, res) => {
  res.cookie("username", "Jane");
  res.end();
});

app.get("/get-cookie", (req, res) => {
  const cookie = req.cookies["username"];
  console.log(cookie);
  res.end();
});

app.listen(3000, () =>
  console.log("Server listening on http://localhost:3000")
);
