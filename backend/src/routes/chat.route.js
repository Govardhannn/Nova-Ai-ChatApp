import express from "express"
import { userMiddleware } from "../middleware/auth.middleware.js";
import { createChat } from "../controllers/chat.controller.js";

const chatRote = express.Router();

chatRote.post('/',userMiddleware, createChat)




export default chatRote;