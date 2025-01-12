import messageBroker from "./message-broker.js";

messageBroker.subscribe("userDeleted", onDeleteUser);

function onDeleteUser(userData) {
  console.log("Audit system deleted: ", userData);
}
