import express from "express";
import handlebars from "express-handlebars";

import cats from "./views/cats.js";

const app = express();

//Add handlebars engine to express engines
app.engine("hbs", handlebars.engine({ extname: "hbs" }));
//Set default engine
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("home", { cats, layout: "main" });
});

app.get("/add-cat", (req, res) => {
  res.render("addCat", { layout: false });
});

app.get("/add-breed", (req, res) => {
  res.render("addBreed", { layout: "secondary" });
});

app.listen(3000, () => console.log("Listening on http://localhost:3000"));
