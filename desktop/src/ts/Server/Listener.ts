import express = require("express");
import { EventEmitter } from "events";

export class HttpServer {
    ///////////////////////////////////
    #_server: express.Application;
    get Server(): express.Application {
        return this.#_server;
    }

    //////////////////////////////////
    #_serverEvent: EventEmitter;
    get ServerEvent(): EventEmitter {
        return this.#_serverEvent;
    }

    //////////////////////////////////////////////////////
    constructor() {
        this.#_server = express();
        this.#_serverEvent = new EventEmitter();
        this.Server.use(express.json());
    }

    listen(port: number = 3491) {
        this.Server.listen(port);
        this.Server.post("/test", (req, res) => {
            //console.log(req.body.command);
            res.send("Message Transmited");
            this.ServerEvent.emit("server:received", req.body.command);
        });
    }
    close() {}
}

//exports.Server = HttpServer;

/****************
 * 1 9  9 8
 * +
 * 2 4  0 2
 * ---------
 * 3 13 9 10
 * ---------
 * 3 4  9 1
 ****************/
