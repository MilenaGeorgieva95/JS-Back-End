import fs from "fs/promises";

//returns array with all file names in the directory
console.log(await fs.readdir("."));

//creates new directory
await fs.mkdir("./test-dir");

//removes directory
await fs.rmdir("/test-dir");

//chage directory name
await fs.rename("./test-dir", "./test-dir2");

//removes file
await fs.unlink("./some-file.txt");
