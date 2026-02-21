import express from "express"
import cookieParser from "cookie-parser";
import authRoute from "./routes/user.route.js"
const app = express()


app.use(express.json());
app.use(cookieParser())
app.use('/api/auth', authRoute)


app.post('/', function(req , res){
    res.send('server is working')
})

export default app;