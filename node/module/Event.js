import Event from "events";

const eventEmitter = new Event();

eventEmitter.on("greet", () => {
    console.log("Hello, World!");
});

eventEmitter.emit("greet");