
const { app, BrowserWindow, remote, dialog } = require('electron');
const { autoUpdater } = require('electron-updater');
const logger = require("electron-log");
const fs = require("fs");
const path = require('path');
var env = process.argv[2] || 'dev';
const DEV = false;

logger.transports.file.level = false;
logger.transports.file.format = '{h}:{i}:{s}:{ms} {text}';
logger.transports.file.maxSize = 5 * 1024 * 1024;
logger.transports.file.file = __dirname + '/datetime-convert-log.txt';
logger.transports.file.streamConfig = { flags: 'w' };
logger.transports.file.stream = fs.createWriteStream('datetime-convert-log.txt');


require('electron-reload')(__dirname);
const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');
installExtension(REACT_DEVELOPER_TOOLS);

autoUpdater.logger = logger;

let win;

function updateDownloaded(event, releaseNote, releaseName) {
    const options = {
        type: "question",
        buttons: ["Restart", "Later"],
        title: "Updates available",
        detail: "A new version has been downloaded. Do you want to restart and update the app?"
    };

    dialog.showMessageBox(options, (response) => {
        if (response === 0) {
            autoUpdater.quitAndInstall();
        }
    });
}


function init() {
    try {
        logger.info("Starting app");
        win = new BrowserWindow({ width: 800, height: 600, titleBarStyle: "hidden" });
        if (DEV) {
            win.loadFile(path.join(__dirname, "index.html"));
        } else {
            win.loadFile(path.join(__dirname, "build/index.html"));
        }
      
        setInterval(function() {
            logger.info("Wil check for update");
            autoUpdater.checkForUpdatesAndNotify()
        }, 60000);
        
        autoUpdater.on("update-downloaded", updateDownloaded);
        autoUpdater.on('error', message => {
            logger.error("Error updating package");
            dialog.showErrorBox("Update problem", message);
        });
    } catch (err) {
        win.removeAllListeners();
        win.close();
        win = null;
        setTimeout(() => app.quit(), 200);
    }

    if (DEV) {
        win.webContents.openDevTools();
    }   
    win.on('closed', () => {
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


