const url = new URL("https://localhost:3000/content/?page=3");
console.log(url.origin);
console.log(url.protocol);
console.log(url.host);
console.log(url.hostname);
console.log(url.port);
console.log(url.pathname);
console.log(url.search);
console.log(url.searchParams);
console.log(url.hash); //not visible in the url

const queryString = require("querystring");
const qs = queryString.parse("year=2017&month=february");
const year = qs.year; //2017
const month = qs.month; //february
console.log(month);

const http = require("http");
const server = http.createServer((request, response) => {
  console.log("Request received");

  //   console.log(request); //the full request object
  console.log(request.method); //Get/Post
  console.log(request.url); // /cats
  console.log(request.headers); //object with headers

  //   console.log(response); //the full response object
  //   response.writeHead(); //writes directly in the headers
  //   response.write("Hello world"); //writes directly in the body
  //   response.end(); //sends the response, have to be in this order

  if (request.url == "/favicon.ico") {
    response.statusCode = 404;
    response.end();
  } else {
    response.writeHead(200, ["Content-Type", "text/html"]);
    response.write("<h1>");
    response.write("Hello world");
    response.write("</h1>");
    response.end();
  }
});
server.listen(3000);
