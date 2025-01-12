import http from "http";

import messageBroker from "./message-broker.js";

import "./audit-system.js";
import "./back-office-system.js";

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    res.write("Home page");
  } else if (req.url == "/create-user") {
    messageBroker.publish("userCreated", "John");
    res.write("User created");
  } else if (req.url == "/delete-user") {
    messageBroker.publish("userDeleted", "Beth");
    res.write("User deleted");
  } else {
    res.write("unknown");
  }
  res.end();
});

server.listen(3000);
console.log("Listening on port 3000...");
