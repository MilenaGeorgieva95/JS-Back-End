import http from "http";

import siteCss from "./content/styles/site.css.js";
import homePage from "./views/home/index.html.js";
import addBreedPage from "./views/addBreed.html.js";
import addCatPage from "./views/addCat.html.js";

const catsData = [
  {
    src: "https://cdn.pixabay.com/photo/2015/06/19/14/20/cat-814952_1280.jpg",
    name: "Pretty Kitty",
    alt: "Striped cat",
    breed: "Bombay Cat",
    description:
      "Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.",
  },
  {
    src: "https://cdn.pixabay.com/photo/2018/08/08/05/12/cat-3591348_1280.jpg",
    name: "Pretty Kitty",
    alt: "Striped cat",
    breed: "Bombay Cat",
    description:
      "Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.",
  },
  {
    src: "https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_1280.jpg",
    name: "Pretty Kitty",
    alt: "White cat",
    breed: "Bombay Cat",
    description:
      "Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.",
  },
  {
    src: "https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262_1280.jpg",
    name: "Pretty Kitty",
    alt: "Striped kitty",
    breed: "Bombay Cat",
    description:
      "Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.",
  },
  {
    src: "https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262_1280.jpg",
    name: "Pretty Kitty",
    alt: "Orange cat",
    breed: "Bombay Cat",
    description:
      "Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.",
  },
];

const server = http.createServer((req, res) => {
  if (req.url == "/styles/site.css") {
    res.writeHead(200, {
      "content-type": "text/css",
    });
    res.write(siteCss);
    return res.end();
  } else {
    res.writeHead(200, {
      "content-type": "text/html",
    });

    switch (req.url) {
      case "/":
      case "/index.html":
        res.write(homePage(catsData));
        break;
      case "/cats/add-breed":
        res.write(addBreedPage());
        break;
      case "/cats/add-cat":
        res.write(addCatPage());
        break;
      default:
        res.write("Page not Found");
        break;
    }

    return res.end();
  }
});

server.listen(3000);
console.log("listening on http://localhost:3000");
