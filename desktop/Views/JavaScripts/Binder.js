//import electron from "electron";
const electron = require("electron");
const { ipcRenderer } = electron;

ipcRenderer.on("server:created", (e, item) => window.alert(item));
ipcRenderer.on("server:stopped", (e, item) => window.alert(item));
ipcRenderer.on("server:test", (e, item) => window.alert("Server woking"));
ipcRenderer.on("server:up", (e, item) => /*Reveal.up()*/ wazo.up());
ipcRenderer.on("server:down", (e, item) => /*Reveal.down()*/ wazo.down());
ipcRenderer.on("server:left", (e, item) => /*Reveal.left()*/ wazo.left());
ipcRenderer.on("server:right", (e, item) => /*Reveal.right()*/ wazo.right());
