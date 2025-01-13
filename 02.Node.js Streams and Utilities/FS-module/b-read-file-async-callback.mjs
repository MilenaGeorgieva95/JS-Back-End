import fs from "fs";

//Asynchronous file reading, handler func as last argument
fs.readFile("./input.html", { encoding: "utf-8" }, (err, loremText) => {
  if (err) {
    return console.error(err.message);
  }
  console.log(loremText);
});

console.log("File readed");
