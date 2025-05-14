"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let allSockets = [];
wss.on("connection", function (socket) {
    console.log("connected!");
    socket.on("message", function (message) {
        const data = JSON.parse(message);
        if (data.type == "join") {
            allSockets.filter((x) => x.socket != socket);
            allSockets.push({ socket, roomId: data.payload.roomId });
        }
        else {
            const currRoom = allSockets.find((x) => x.socket == socket);
            allSockets.forEach((conn) => {
                if (conn.roomId == (currRoom === null || currRoom === void 0 ? void 0 : currRoom.roomId)) {
                    conn.socket.send(data.payload.message);
                }
            });
        }
    });
});
