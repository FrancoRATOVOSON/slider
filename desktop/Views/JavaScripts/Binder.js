const electron = require("electron");
const { ipcRenderer } = electron;

ipcRenderer.on("button:click", function (e, item) {
    console.log(item);
});
ipcRenderer.on("server:created", (e, item) => window.alert(item));
ipcRenderer.on("server:stopped", (e, item) => window.alert(item));
ipcRenderer.on("server:test", (e, item) => window.alert("Server woking"));
ipcRenderer.on("server:up", (e, item) => Reveal.up());
ipcRenderer.on("server:down", (e, item) => Reveal.down());
ipcRenderer.on("server:left", (e, item) => Reveal.left());
ipcRenderer.on("server:right", (e, item) => Reveal.right());
