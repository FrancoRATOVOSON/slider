"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __server, __serverEvent;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpServer = void 0;
const express = require("express");
const events_1 = require("events");
class HttpServer {
    constructor() {
        __server.set(this, void 0);
        __serverEvent.set(this, void 0);
        __classPrivateFieldSet(this, __server, express());
        __classPrivateFieldSet(this, __serverEvent, new events_1.EventEmitter());
        this.Server.use(express.json());
    }
    get Server() {
        return __classPrivateFieldGet(this, __server);
    }
    get ServerEvent() {
        return __classPrivateFieldGet(this, __serverEvent);
    }
    listen(port = 3491) {
        this.Server.listen(port);
        this.Server.post("/test", (req, res) => {
            res.send("Message Transmited");
            this.ServerEvent.emit("server:received", req.body.command);
        });
    }
    close() { }
}
exports.HttpServer = HttpServer;
__server = new WeakMap(), __serverEvent = new WeakMap();
