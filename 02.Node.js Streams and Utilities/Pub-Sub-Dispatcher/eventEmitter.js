import events from "events";

//eventEmitter=messageBroker node core module
const eventEmitter = new events.eventEmitter();

//messageBroker.subscribe(event, handler) = eventEmitter.on(event, handler)
eventEmitter.on("createUser", onCreateUser);

function onCreateUser() {}

//messageBroker.publish(event, data) = eventEmitter.emit(event, data)
eventEmitter.emit("createUser", data);
