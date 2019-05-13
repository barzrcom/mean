import * as jwt from 'jsonwebtoken';

const enum WSReadyState {
    /** The connection is not yet open. */
    CONNECTING = 0,
    /** The connection is open and ready to communicate. */
    OPEN = 1,
    /** The connection is in the process of closing. */
    CLOSING = 2,
    /** The connection is closed or couldn't be opened. */
    CLOSED = 3
}

export type WsUser = {
    ws: WebSocket;
    keepalive: any;
    id: String;
    username: String;
    email: String;
    role: String;
};

let wsUsers: Array<WsUser> = [];

let sendClientList = () => {
    // build users list
    let users = [];
    wsUsers.forEach(function(wsUser) {
        users.push({
            _id: wsUser.id,
            email: wsUser.email,
            username: wsUser.username,
            role: wsUser.role 
        });
    });

    wsUsers.forEach(function(client) {
        // send message to all admins
        if (client.role === "admin" && client.ws.readyState == WSReadyState.OPEN) {
            client.ws.send(JSON.stringify({
                type: 'list',
                message: users 
            }));
        }
    });
}
let keepalive = (ws) => {
    if (ws.readyState == WSReadyState.OPEN) { 
        ws.send(JSON.stringify({
            type: 'keepalive',
            message: "" 
        }));
    } else {
        handleLogout(ws)
    }
}

let ping = (ws) => {
    if (ws.readyState == WSReadyState.OPEN) { 
        ws.send(JSON.stringify({
            type: 'ping',
            message: "pong" 
        }));
    }
}

let handleLogout = (ws) => {
    wsUsers.forEach(function(client) {
        // remove disconnected users
        if (client.ws.readyState != WSReadyState.OPEN || ws === client.ws) {
            clearInterval(client.keepalive);
            wsUsers.splice( wsUsers.indexOf(client), 1 );
        }
    });
    sendClientList();
}

let handleLogin = (ws, token) => {
    jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
        if (err) return;

        console.log("user connected", decoded.user.username)
        wsUsers.push({
            ws: ws,
            keepalive: setInterval(function () {
                keepalive(ws);
            }, 2000),
            id: decoded.user.id,
            username: decoded.user.username,
            email: decoded.user.email,
            role: decoded.user.role,
        })
        sendClientList();
    });
}

export default function setWebSocket(app) {
    app.ws('/ws', function(ws, req, next) {
        console.log('connect ws');
        ws.on('message', function(data) {
            let msg = JSON.parse(data);
            switch(msg.type) { 
                case "login": { 
                    handleLogin(ws, msg.message);
                    break; 
                }
                case "list": { 
                    sendClientList();
                    break; 
                }
                case "ping": { 
                    wsUsers.forEach(function(client) {
                        if (client.email === msg.message) {
                            ping(client.ws);
                        }
                    });
                    break; 
                } 
                default: {  
                    break; 
                } 
             } 
        });
        next();
    });
}
