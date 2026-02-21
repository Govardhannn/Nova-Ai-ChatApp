import express from "express";
import cookieParser from "cookie-parser";

//Routes
import authRoute from "./routes/user.route.js";
import chatRote from "./routes/chat.route.js";
const app = express();

app.use(express.json());
app.use(cookieParser());

// User Routes
app.use("/api/auth", authRoute);
// Chat Routes
app.use("/api/chat", chatRote);



export default app;
