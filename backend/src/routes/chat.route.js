import express from "express"
import { userMiddleware } from "../middleware/auth.middleware.js";

const chatRote = express.Router();

chatRote.post('/',userMiddleware, )




export default chatRote;