"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Listener_1 = require("./Server/Listener");
var server = new Listener_1.HttpServer();
server.listen();
server.ServerEvent.on("server:received", (data) => console.log(data));
