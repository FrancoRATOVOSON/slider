const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const { HttpServer } = require("./Out/Server/Listener");
const Ip = require("ip");

var mainWindow;
var server = new HttpServer();
var port = 3491;

function creacteWindow() {
    mainWindow = new BrowserWindow({
        autoHideMenuBar: true,
        titleBarStyle: "hidden",
        webPreferences: {
            nodeIntegration: true,
        },
    });

    mainWindow.loadFile("./index.html");

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
}
app.whenReady().then(creacteWindow);

//MenuBar
const mainMenuTemplate = [
    {
        label: "Server",
        submenu: [
            {
                label: "Launch",
                click() {
                    server.listen(port);
                    mainWindow.webContents.send(
                        "server:created",
                        `Serveur créé avec succès.\nAdresse: http://${Ip.address()}:${port}/`
                    );
                },
            },
            {
                label: "Stop",
                click() {
                    server.close();
                    mainWindow.webContents.send(
                        "server:stopped",
                        "Serveur arrêté."
                    );
                },
            },
        ],
    },
    {
        label: "View",
        submenu: [
            {
                label: "Full Screen",
                accelerator: "F11",
                click() {
                    mainWindow.isFullScreen()
                        ? mainWindow.setFullScreen(false)
                        : mainWindow.setFullScreen(true);
                },
            },
            {
                label: "Developper Tools",
                accelerator: "Ctrl+I",
                click() {
                    mainWindow.webContents.toggleDevTools();
                },
            },
        ],
    },
];

// Bind to View
ipcMain.on("button:click", (e, item) => {
    console.log(item);
    mainWindow.webContents.send("button:click", "Received");
});

// Server events
server.ServerEvent.on("server:received", (data) => {
    var eventName = "server:received";
    switch (data.toLowerCase()) {
        case "test":
            eventName = "server:test";
            break;
        case "up":
            eventName = "server:up";
            break;
        case "down":
            eventName = "server:down";
            break;
        case "left":
            eventName = "server:left";
            break;
        case "right":
            eventName = "server:right";
            break;
        default:
            eventName = "server:received";
            break;
    }
    mainWindow.webContents.send(eventName);
});
