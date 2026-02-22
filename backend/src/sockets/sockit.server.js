import { Server } from "socket.io";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import aiService from "../services/ai.service.js";



export const initSocketServer = (httpServer) => {
  const io = new Server(httpServer, {});

  io.use(async (socket, next) => {
    const cookies = cookie.parse(socket.handshake.headers?.cookie || "");

    if (!cookies.token) {
      return next(new Error("Authentication error: No Token Provided"));
    }

    try {
      const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET);

      const user = await userModel.findById(decoded.id);

      if (!user) {
        return next(new Error("User not found"));
      }

      socket.user = user;

      next(); // ✅ required
    } catch (error) {
      return next(new Error("Authentication error: Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    socket.on("ai-message", async (messagePayload) => {
     console.log("messagePayload :" , messagePayload)   
   
        console.log(messagePayload);
        const response = await aiService(messagePayload.content);

        socket.emit("ai-response", {
          content: response,
          chat: messagePayload.chat,
        });
    
        
     
    });
  });
};

export default initSocketServer;
