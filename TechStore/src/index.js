import express from "express";
import mongoose from 'mongoose';
import router from "./routes.js";
import handlebars from 'express-handlebars';

const app = express();

const url = "mongodb://localhost:27017";
try {
  await mongoose.connect(url, { dbName: "tech-store" })
  console.log("DB connected")
} catch (err) {
  console.log("DB failed: " + err.message);
}

app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', 'src/views');


app.use(express.static("src/public"));
app.use(express.urlencoded({ extended: false }));
app.use(router);


app.listen(3000, () =>
  console.log("Server listening on http://localhost:3000")
);
