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
  res.download("./cat.jpg");
});
//browser can display the file
app.get("/download2", (req, res) => {
  res.sendFile(path.resolve("./cat.jpg"));
});

app.get("/download3", (req, res) => {
  res.attachment("./cat.jpg");
  res.end();
});

app.listen(3000, () =>
  console.log("Server is listening on http://localhost:3000")
);

//app.METHOD(PATH, HANDLER) => app.get('/cats/create', (req, res)=>{})
//METHOD+PATH == Endpoint  HANDLER == Action
