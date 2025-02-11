import express from "express";
import cors from 'cors';
import mongoose from "mongoose";

import routes from "./routes.js";

try {
  await mongoose.connect('mongodb://localhost:27017', {dbName: 'furniture'})
  console.log('DB connected!');
} catch (err) {
  console.log('Cannot connect to DB!');
}

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
