import dotenv from "dotenv"
dotenv.config();
import app from "./src/app.js";
import connDB from "./src/config/db.js";

const port = process.env.PORT || 8888



const connString = async ()  =>{

    connDB()

app.listen(port, ()=>{

    console.log( `server is running on this ${port} port`)
})
}

connString()