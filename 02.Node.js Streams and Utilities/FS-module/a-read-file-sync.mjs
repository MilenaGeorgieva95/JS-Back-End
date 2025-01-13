import fs from "fs";

//Synchronous file reading
const loremText = fs.readFileSync("./input.html", { encoding: "utf-8" });
//After all completed continues to next line
console.log(loremText);
console.log("File loaded");
