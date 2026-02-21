import mongoose from "mongoose"

const connDB = async ()=>{

    try {
        await mongoose.connect(process.env.MONGO_URI,{
            dbName: "Ai-chat-app"
        })
        console.log("database connected sucessfully")
    } catch (error) {
        console.log("Error connection to DB", error)
        
    }
} 
export default connDB;