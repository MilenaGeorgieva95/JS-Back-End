import express from "express";
import mongoose from 'mongoose';
import router from "./routes.js";
import handlebars from 'express-handlebars';
import cookieParser from "cookie-parser";
import expressSession from 'express-session';

import { addUserMiddleware } from "./middlewares/authMiddleware.js";
import { tempData } from "./middlewares/tempDataMiddleware.js";

const app = express();

const url = "mongodb://localhost:27017";
try {
  await mongoose.connect(url, { dbName: "home-recipes" })
  console.log("DB connected")
} catch (err) {
  console.log("DB failed: " + err.message);
}

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
    },
    helpers: {
      setTitle(title){
        this.pageTitle = title;
        return ''
      }
    }
}));
app.set('view engine', 'hbs');
app.set('views', 'src/views');


app.use(express.static("src/public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//?Config express session
app.use(expressSession({
  secret: 'HJTRFU87JH9435KDJFL334KASFD',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly:true }
}))

app.use(addUserMiddleware);
app.use(tempData);
app.use(router);

app.get("*", (req, res) => {
  res.render("404", { title: "404 Page" });
});

app.listen(3000, () =>
  console.log("Server listening on http://localhost:3000")
);
