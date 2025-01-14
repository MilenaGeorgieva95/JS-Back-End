import fs from "fs/promises";

//Asynchronous file reading with promises, returns promise so then/catch syntax
fs.readFile("./input.html", { encoding: "utf-8" })
  .then((loremText) => {
    console.log(loremText);
  })
  .catch((err) => {
    console.log(err.message);
  });

console.log("File readed");
