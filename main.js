
const { app, BrowserWindow } = require('electron')
require('electron-reload')(__dirname);
const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');

installExtension(REACT_DEVELOPER_TOOLS);

let win; 

function init() {
    win = new BrowserWindow({width: 800, height: 600, titleBarStyle: "hidden" });
    win.loadFile("index.html");
    win.webContents.openDevTools();
    win.on('closed', () => {
        win = null;
    });

}

app.on("ready", init);

app.on("windows-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (win === null) {
        init();
    }
});


