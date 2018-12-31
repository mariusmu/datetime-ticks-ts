
const { app, BrowserWindow, remote } = require('electron');
const { autoUpdater } = require('electron-updater');

const fs = require("fs");
const path = require('path');
var env = process.argv[2] || 'dev';
const DEV = false;
const DEBUG_ENABLED = false;

function DEBUG(str) {
    if (!DEBUG_ENABLED) {
        return;
    }
    const dir = __dirname + "/log.txt";
    fs.appendFile(dir, str);
}


require('electron-reload')(__dirname);
const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');
installExtension(REACT_DEVELOPER_TOOLS);

let win;

function init() {
    try {
        win = new BrowserWindow({ width: 800, height: 600, titleBarStyle: "hidden" });
        win.loadFile(path.join(__dirname, "build/index.html"));
    } catch (err) {
        DEBUG(err);
        process.exit();
    }

    if (DEV) {
        win.webContents.openDevTools();
    }   
    win.on('closed', () => {
        DEBUG("closed");
        win = null;
        setTimeout(() => app.quit(), 200) 
    });

}

app.on("ready", init);

app.on('before-quit', () => {
    win.removeAllListeners('close');
    win.close();
    win = null;
 
});

app.on("activate", () => {
    if (win === null) {
        init();
    }
    autoUpdater.checkForUpdatesAndNotify();
});


