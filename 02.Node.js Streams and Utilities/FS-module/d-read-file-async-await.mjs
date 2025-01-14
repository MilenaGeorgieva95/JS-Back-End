import fs from "fs/promises";

//Asynchronous file reading with async/await
//Top level await with import fs (doesn't work with require)

try {
  const loremText = await fs.readFile("./input.html", { encoding: "utf-8" });
  console.log(loremText);
} catch (err) {
  console.log(err.message);
}

console.log("File readed");
