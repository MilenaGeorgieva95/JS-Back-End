import 'dotenv/config';
import express from "express";
import router from "./routes.js";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { authMiddleware } from './middlewares/auth-middleware.js';

const app = express();

const url = "mongodb://localhost:27017";
mongoose
  .connect(url, { dbName: "magma-haven" })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB failed: " + err.message));

app.engine("hbs", handlebars.engine({ extname: "hbs" }));
app.set("views", "src/views");
app.set("view engine", "hbs");

app.use("/static", express.static("src/public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authMiddleware)

app.use(router);

app.get("*", (req, res) => {
  res.render("404", { title: "404 Page" });
});

app.listen(3000, () => console.log("Listening on http://localhost:3000"));
