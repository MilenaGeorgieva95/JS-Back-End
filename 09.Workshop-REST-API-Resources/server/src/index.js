import express from "express";
import routes from "./routes.js";
import cors from 'cors';

const app = express();
app.use(express.json());

app.use(cors());
app.use(routes);

app.get("*", (req, res) => {
  res.send("/404");
});

app.listen(3030, () =>
  console.log("Server is listening on http://localhost:3030")
);
