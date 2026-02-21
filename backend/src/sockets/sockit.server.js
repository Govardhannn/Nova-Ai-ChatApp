import {Server} from "socket.io"

export const initSocketServer = (httpServer)=>{

    const io = new Server(httpServer,{})


    io.on('connection', (socket)=>{
        console.log('New Socket Connection', socket.id )
        console.log("User connected ")
    })
}
export default initSocketServer