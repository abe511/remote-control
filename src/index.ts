import http, { IncomingMessage, ServerResponse } from "http";
import { WebSocket, WebSocketServer } from "ws";
import { mouse, up, down, left, right, straightTo, Point } from "@nut-tree/nut-js";
import { config } from "dotenv";
import drawRectangle from "./drawRectangle";
import drawCircle from "./drawCircle";
import grabImage from "./grabImage";

config();

const PORT: number = parseInt(process.env.PORT as string) || 5050;

const server = http.createServer();
const wss = new WebSocketServer({noServer: true});


wss.on("connection", (ws, req) => {
    ws.on("open", () => {
        console.log("Websockets client connected");
    });

    ws.on("message", (message) => {
        const cmd = message.toString().split(" ");
        switch(cmd[0]) {
            case "mouse_up": {
                console.log(`<- ${cmd[0]} ${cmd[1]}`.toString());
                mouse.move(up(parseInt(cmd[1])));
                ws.send(`${cmd[0]} ${cmd[1]}`.toString());
                break;
            }
            case "mouse_down": {
                console.log(`<- ${cmd[0]} ${cmd[1]}`.toString());
                mouse.move(down(parseInt(cmd[1])));
                ws.send(`${cmd[0]} ${cmd[1]}`.toString());
                break;
            }
            case "mouse_right": {
                console.log(`<- ${cmd[0]} ${cmd[1]}`.toString());
                mouse.move(right(parseInt(cmd[1])));
                ws.send(`${cmd[0]} ${cmd[1]}`.toString());
                break;
            }
            case "mouse_left": {
                console.log(`<- ${cmd[0]} ${cmd[1]}`.toString());
                mouse.move(left(parseInt(cmd[1])));
                ws.send(`${cmd[0]} ${cmd[1]}`.toString());
                break;
            }
            case "mouse_position": {
                console.log(`<- ${cmd[0]}`);
                mouse.getPosition().then((data) => {
                    console.log(`-> ${cmd[0]} ${data.x},${data.y}`.toString());
                    ws.send(`${cmd[0]} ${data.x},${data.y}`.toString());
                });
                break;
            }
            case "draw_circle":
                drawCircle(parseInt(cmd[1]));
                console.log(`<- ${cmd[0]} ${cmd[1]}`.toString());
                ws.send(`${cmd[0]} ${cmd[1]}`.toString());
                break;
            case "draw_square": {
                drawRectangle(parseInt(cmd[1]), parseInt(cmd[1]));
                console.log(`<- ${cmd[0]} ${cmd[1]}`.toString());
                ws.send(`${cmd[0]} ${cmd[1]}`.toString());
                break;
            }
            case "draw_rectangle": {
                drawRectangle(parseInt(cmd[1]), parseInt(cmd[2]));
                console.log(`<- ${cmd[0]} ${cmd[1]} ${cmd[2]}`);
                ws.send(`${cmd[0]} ${cmd[1]} ${cmd[2]}`.toString());
                break;
            }
            case "prnt_scrn": {
                const region = {width: 200, height: 200};
                console.log(`<- ${cmd[0]}`);
                grabImage(region.width, region.height)
                    .then((image) => {
                        // console.log(image);
                        // const buf = image?.data.toString("base64");
                        const buf = image?.toString();
                        // console.log(`-> ${cmd[0]} ${buf}`.toString());
                        ws.send(`${cmd[0]} ${buf}`.toString());
                });
                break;
            }
        }
    });
    ws.on("close", () => {
        console.log("Websockets client disconnected");
    });
});

server.on("upgrade", (request: IncomingMessage, socket, head) => {
    console.log("Upgrading to Websockets");

    if(request.url === "/") {
        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit("connection", ws, request);
        }); 
    } else {
        socket.destroy();
    }
});

server.listen(PORT, () => {
    console.log(`HTTP server started on port: ${PORT}`);
});