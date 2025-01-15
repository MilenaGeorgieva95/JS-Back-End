import http from "http";
import fs from "fs/promises";
import { v4 as uuid } from "uuid";

import siteCss from "./content/styles/site.css.js";
import homePage from "./views/home/index.html.js";
import addBreedPage from "./views/addBreed.html.js";
import addCatPage from "./views/addCat.html.js";

let catsData = [];
initCatsData();

async function initCatsData() {
  const catsJson = await fs.readFile("./cats.json", { encoding: "utf-8" });
  catsData = JSON.parse(catsJson);
}

async function saveCatsData() {
  const catsJson = JSON.stringify(catsData, null, 2);
  await fs.writeFile("./cats.json", catsJson, { encoding: "utf-8" });
}

const server = http.createServer((req, res) => {
  if (req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
      req.on("end", () => {
        const newCat = Object.fromEntries(new URLSearchParams(body));
        newCat.id = uuid();
        catsData.push(newCat);
        saveCatsData();

        res.writeHead(302, {
          location: "/",
        });
        res.end();
      });
    });
    return;
  }

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
