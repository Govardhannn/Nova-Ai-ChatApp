import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";
import connDB from "./src/config/db.js";
import initSocketServer from "./src/sockets/sockit.server.js";
// socket.io Using Here
import http from "http";
const httpServer = http.createServer(app);

const port = process.env.PORT || 8888;

// add here Socket.io for real time connection

const connString = async () => {
 await connDB();
   initSocketServer(httpServer)

  httpServer.listen(port, () => {
    console.log(`server is running on this ${port} port`);
  });
};

connString();
