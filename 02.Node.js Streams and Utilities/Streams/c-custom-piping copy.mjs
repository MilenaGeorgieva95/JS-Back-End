import fs from "fs";

const readStream = fs.createReadStream("./input.html", {
  encoding: "utf-8",
  highWaterMark: 1000,
});

const writeStream = fs.createWriteStream("./input-copy.txt", {
  encoding: "utf-8",
  flags: "a",
});

readStream.on("data", (chunk) => {
  writeStream.write(chunk);
});

readStream.on("end", () => {
  writeStream.end();
});
