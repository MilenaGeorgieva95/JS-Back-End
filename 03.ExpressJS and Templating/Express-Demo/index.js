import express from "express";
import path from "path";

// const server = express();

// server.get("/", (req, res) => {
//   console.log("Request");
//   //   res.write("Hello from express");
//   //   res.end();
//   res.send("Hello from express");
// });

// server.listen(3000, () =>
//   console.log("Server is listening on http://localhost:3000")
// );

const app = express();

//If there is a path name file in the public dir, it returns it with sendFile, otherwise continues down
app.use(express.static("public"));

//App middleware
app.use((req, res, next) => {
  console.log(req.url);
  next();
});
//Path middleware-all paths starting with '/auth' incl '/auth/cats'
app.use("/auth", (req, res, next) => {
  //Check if user is valid for '/auth
  if (Math.random() < 0.5) {
    res.send("Authorized");
    next(); //Valid
  } else {
    res.status(401).send("Unauthorized");
  }
});
//Route middleware
app.get(
  "/users",
  (req, res, next) => {
    console.log("Route middleware");
    next();
  },
  (req, res) => {
    res.send("Users page");
  }
);

app.get("/", (req, res) => {
  console.log("Request");
  res.send("Hello from express");
});

app.get("/cats", (req, res) => {
  res.send("Cats page");
});

app.get("/cats/:catId", (req, res) => {
  const paramsObj = req.params;
  //paramsObj=== {'catId':'123'}
  res.send(paramsObj.catId);
});

//download
app.get("/download", (req, res) => {
  res.download("./public/cat.jpg");
});
//browser can display the file
app.get("/download2", (req, res) => {
  res.sendFile(path.resolve("./public/cat.jpg"));
});
//doesn't end the stream
app.get("/download3", (req, res) => {
  res.attachment("./public/cat.jpg");
  res.end();
});

app.get("/data", (req, res) => {
  res.json({
    name: "Data",
    grades: [1, 2, 3, 4],
  });
});

app.get("/redirect", (req, res) => {
  res.redirect("/");
});

app.listen(3000, () =>
  console.log("Server is listening on http://localhost:3000")
);

//app.METHOD(PATH, HANDLER) => app.get('/cats/create', (req, res)=>{})
//METHOD+PATH == Endpoint  HANDLER == Action
