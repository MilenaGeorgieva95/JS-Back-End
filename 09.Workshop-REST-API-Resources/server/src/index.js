import express from "express";
import routes from "./routes.js";

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(routes);

app.get("*", (req, res) => {
  res.send("/404");
});

app.listen(3030, () =>
  console.log("Server is listening on http://localhost:3030")
);
