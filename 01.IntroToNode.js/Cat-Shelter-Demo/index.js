const http = require("http");
const { homeHandler } = require("./src/handlers/home");
const { staticFileHandler } = require("./src/handlers/static");

const routes = {
  "/": homeHandler,
  "index.html": homeHandler,
};

const server = http.createServer((req, res) => {
  const route = routes[req.url];

  if (typeof route == "function") {
    route(req, res);
    return;
  } else if (staticFileHandler(req, res)) {
    return;
  }
  res.writeHead(404, ["Content-Type", "text/plaint"]);
  res.write("404 Not Found");
  res.end();
});

server.listen(3000);
console.log("listening on port 3000");
