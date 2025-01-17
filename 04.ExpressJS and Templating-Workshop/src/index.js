import express from "express";
import handlebars from "express-handlebars";
import homeController from "./controllers/homeController.js";

const app = express();

app.engine("hbs", handlebars.engine({ extname: "hbs" }));
app.set("view engine", "hbs");
app.set("views", "src/views");

app.use("/static", express.static("src/public"));

app.use(homeController);

app.listen(3000, () => console.log("Listening on http://localhost:3000"));
