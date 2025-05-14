import { WebSocketServer, WebSocket } from "ws"


const wss = new WebSocketServer({port:8080});

interface User{
    socket : WebSocket,
    roomId : string
}

let allSockets: User[] =[];

wss.on("connection", function(socket){

    console.log("connected!");


    socket.on("message", function(message){

        const data = JSON.parse(message as unknown as string);

        if(data.type == "join")
        {
            allSockets.filter((x)=> x.socket != socket);
            
            allSockets.push({socket, roomId:data.payload.roomId});
        }
        else{
            const currRoom = allSockets.find((x) => x.socket == socket)

            allSockets.forEach((conn) => {
                if(conn.roomId==currRoom?.roomId){ 
                    conn.socket.send(data.payload.message);
                }
            })
        }
    })
})