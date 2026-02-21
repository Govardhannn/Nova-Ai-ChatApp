import express from "express"
import cookieParser from "cookie-parser";
import route from "./routes/user.route.js"
const app = express()


app.use(express.json());
app.use(cookieParser())





export default app;