import express from "express";
import handlebars from "express-handlebars";
import routes from "./routes.js";
import showRatingHelper from "./helpers/rating-helper.js";
import mongoose from "mongoose";

const app = express();

//db
try {
  const uri = "mongodb://localhost:27017/magic-movies";
  await mongoose.connect(uri);
  console.log("DB Connected Successfully!");
} catch (err) {
  console.log("Cannot connect to DB");
  console.log(err.message);
}

//handlebars
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    helpers: {
      showRating: showRatingHelper,
    },
  })
);

app.set("view engine", "hbs");
app.set("views", "src/views");

//express
app.use("/static", express.static("src/public"));
//parse form data POST params as req.body
app.use(express.urlencoded({ extended: false }));

//routes
app.use(routes);

//start server
app.listen(3000, () => console.log("Listening on http://localhost:3000"));
