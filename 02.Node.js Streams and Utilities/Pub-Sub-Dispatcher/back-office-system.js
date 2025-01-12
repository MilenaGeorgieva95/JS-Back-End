import messageBroker from "./message-broker.js";

messageBroker.subscribe("userCreated", onCreateUser);
messageBroker.subscribe("userDeleted", onDeleteUser);

function onCreateUser(userData) {
  console.log("Back office created: ", userData);
}

function onDeleteUser(userData) {
  console.log("Back office deleted: ", userData);
}
