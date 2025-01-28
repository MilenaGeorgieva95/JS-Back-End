import express from "express";
import cookieParser from "cookie-parser";
import expressSession from "express-session";

const app = express();

app.use(cookieParser());
app.use(
  expressSession({
    secret: "SecretSE",
    resave: false, //resave only after modify
    saveUninitialized: true,
    cookie: { secure: false }, //true for HTTPS
  })
);

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
  res.cookie("username", "Jane", {
    httpOnly: true,
  });
  res.end();
});

app.get("/get-cookie", (req, res) => {
  const cookie = req.cookies["username"];
  console.log(cookie);
  res.end();
});

//express-session library, sets unique id on the client and keeps the information on the server
app.get("/set-session-data/:name", (req, res) => {
  req.session.username = req.params.name;
  req.session.age = 20;

  res.end();
});

app.get("/get-session-data", (req, res) => {
  console.log(req.session);
  console.log(req.session.username);
  res.send(req.session.username);

  res.end();
});

app.listen(3000, () =>
  console.log("Server listening on http://localhost:3000")
);
