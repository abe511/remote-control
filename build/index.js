"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
// const PORT = process.env.PORT || 5050;
const HOST = "localhost";
const PORT = parseInt(process.env.PORT) || 5050;
// const server = http.createServer();
const wss = new ws_1.WebSocketServer({ host: HOST, port: PORT });
console.log(`WS server is started on ws://${wss.options.host}:${wss.options.port}`);
wss.on("connection", (ws) => {
    ws.on("message", (message) => {
        const cmd = message.toString().split(" ");
        switch (cmd[0]) {
            case "mouse_up":
            case "mouse_down": {
                console.log(`<- ${cmd[0]} {y ${cmd[1]}}`);
                break;
            }
            case "mouse_right":
            case "mouse_left": {
                console.log(`<- ${cmd[0]} {x ${cmd[1]}}`);
                break;
            }
            case "mouse_position": {
                console.log(`<- ${cmd[0]} {x ${cmd[1]}},{y ${cmd[2]}}`);
                break;
            }
            case "draw_circle":
            case "draw_square": {
                console.log(`<- ${cmd[0]} {${cmd[1]}}`);
                break;
            }
            case "draw_rectangle": {
                console.log(`<- ${cmd[0]} {${cmd[1]}} {${cmd[2]}}`);
                break;
            }
            case "prnt_scrn": {
                console.log(`<- ${cmd[0]} {${cmd[1]}} {${cmd[2]}}`);
                console.log(`-> ${cmd[0]} {base64 string (png buf)`); // PNG BUFFER BASE64 STRING HERE
                ws.send("send base64 string"); // SEND PNG BUFFER BASE64 STRING
                break;
            }
        }
        if (message.toString() === "quit") {
            ws.send("WS server shutting down");
            ws.close();
        }
        // console.log(message.toString());
    });
    ws.send("connected");
});
// server.listen(PORT, () => {
//     console.log(`HTTP server started on port: ${PORT}`);
// })
