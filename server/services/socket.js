import { Server } from "socket.io";
import Redis from "ioredis";

const pub = new Redis({
  host: "",
  port: 0,
  username: "default",
  password: "",
});

const sub = new Redis({
  host: "",
  port: 0,
  username: "",
  password: "",
});

class SocketService {
  constructor() {
    console.log("Init Socket Service...");
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });
    // sub.subscribe("MESSAGES");
  }

  initListeners() {
    const io = this.io;
    console.log("Init Socket Listeners...");

    io.on("connect", (socket) => {
      console.log(`New Socket Connected`, socket.id);
      socket.on("event:message", async ({ message }) => {
        console.log("New Message Rec.", message);
        // await pub.publish("MESSAGES", JSON.stringify({ message }));
      });
    });

    sub.on("message", async (channel, message) => {
      if (channel === "MESSAGES") {
        console.log("new message from redis", message);
        io.emit("message", message);
        await produceMessage(message);
        console.log("Message Produced to Kafka Broker");
      }
    });
  }

  

  get io() {
    return this._io;
  }
}

export default SocketService;