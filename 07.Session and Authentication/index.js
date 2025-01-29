import express from "express";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
app.use(express.urlencoded({ extended: false }));

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
  // console.log(cookie);
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
  // console.log(cookie);
  res.end();
});

//express-session library, sets unique id on the client and keeps the information on the server
app.get("/set-session-data/:name", (req, res) => {
  req.session.username = req.params.name;
  req.session.age = 20;

  res.end();
});

app.get("/get-session-data", (req, res) => {
  // console.log(req.session);
  res.send(req.session.username);
});

//bcrypt hashing
app.get("/get-hash/:message", async (req, res) => {
  const message = req.params.message;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(message, salt);
  console.log(salt);

  res.send(hash);
});

app.get("/check-hash/:message", async (req, res) => {
  const message = req.params.message;
  const savedHash =
    "$2b$10$JXGil1pvWLDimITse59The0zT8M3rNZsSywvfnZRYhUN/l/h2ExpK";
  const isValid = await bcrypt.compare(message, savedHash);
  res.send(isValid);
});

//JWT: headers, payload, signiture. jwt.sign and jwt.verify
const secret = "SomeSecret";

app.get("/generate-jwt/:message", (req, res) => {
  const message = req.params.message;

  const payload = {
    username: "Ted",
    age: 20,
    message,
  };

  const token = jwt.sign(payload, secret, { expiresIn: "2h" });
  res.send(token);
});

app.get("/verify-jwt/:token", (req, res) => {
  const token = req.params.token;

  const decodedToken = jwt.verify(token, secret);
  res.send(decodedToken);
});

//*Basic login demo
app.get("/register", (req, res) => {
  res.send(`
    <form method="POST">
      <div>
        <label for="username">Username: </label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="username..."
        />
      </div>
      <div>
        <label for="password">Password: </label>
        <input
          type="password"
          name="password"
          id="password"
        />
      </div>

      <div>
        <button>Submit</button>
      </div>
    </form>`);
});

const users = [];
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  //*hash password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  //*save user data //TODO: check if user exists
  users.push({ username, password: hash });
  //*redirect to login
  res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.send(`
    <form method="POST">
      <div>
        <label for="username">Username: </label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="username..."
        />
      </div>
      <div>
        <label for="password">Password: </label>
        <input
          type="password"
          name="password"
          id="password"
        />
      </div>

      <div>
        <button>Login</button>
      </div>
    </form>`);
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.send("Invalid user!");
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.send("Password is not valid!");
  }
  console.log(username, password);
  res.send(`${username} logged in!`);
});

app.listen(3000, () =>
  console.log("Server listening on http://localhost:3000")
);
