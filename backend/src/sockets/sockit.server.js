import { Server } from "socket.io";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import generateContent from "../services/ai.service.js";

export const initSocketServer = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*", // change in production
      credentials: true,
    },
  });

  // 🔐 Authentication Middleware
  io.use(async (socket, next) => {
    try {
      const cookies = cookie.parse(socket.handshake.headers?.cookie || "");

      if (!cookies.token) {
        return next(new Error("Authentication error: No Token Provided"));
      }

      const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET);

      const user = await userModel.findById(decoded.id).select("-password");

      if (!user) {
        return next(new Error("User not found"));
      }

      socket.user = user;
      next();
    } catch (error) {
      return next(new Error("Authentication error: Invalid token"));
    }
  });

  // 🤖 AI Socket
  io.on("connection", (socket) => {
   

  socket.on("ai-message", async (messagePayload) => {
  console.log("Received message:", messagePayload);

  try {
    const response = await generateContent(messagePayload.content);

    console.log("Gemini Response:", response);

  io.emit("ai-response", {
  content: response,
  chat: messagePayload.chat,
});
  } catch (error) {
    console.error("AI Error:", error);
    socket.emit("ai-error", { message: "AI failed" });
  }
});

    socket.on("disconnect", () => {
      console.log("User Disconnected:", socket.id);
    });
  });
};

export default initSocketServer;