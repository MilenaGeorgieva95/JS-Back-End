import express from "express";
import router from "./routes.js";
import handlebars from 'express-handlebars';

const app = express();

app.engine('handlebars', handlebars.engine({
    extname: 'hbs'
}));
app.set('view engine', 'handlebars');
app.set('views', 'src/views')

app.use(express.static("src/public"));
app.use(express.urlencoded({ extended: false }));
app.use(router);


app.listen(3000, () =>
  console.log("Server listening on http://localhost:3000")
);
