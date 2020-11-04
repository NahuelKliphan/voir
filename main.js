const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const database = require('./database').database;
const isDev = require('electron-is-dev');
const { autoUpdater } = require("electron-updater");

var mainWindow;

if (isDev) {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: { nodeIntegration: true },
  });

  mainWindow.loadFile('./src/index.html');
  mainWindow.maximize();

  if (!isDev) {
    mainWindow.setMenu(null);
    mainWindow.setFullScreen(true);
    autoUpdater.checkForUpdatesAndNotify();
  } else {
    autoUpdater.checkForUpdates();
  }
}

app.whenReady().then(() => {

  database.connect(error => {
    if (error) {
      console.error('Error al conectar Base de datos.', error.stack);
    } else {
      console.log('Base de datos conectada.');
    }
  });

  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('base', (event, query) => {
  database.query(query).then(res => {
    event.reply('response', ['ok', res.rows])
  }).catch(e => event.reply('response', ['error', e]));
});

ipcMain.on('exit', (event) => {
  database.end();
  app.quit();
});

//Autoupdater

const sendStatusToWindow = (text) => {
  mainWindow.webContents.send('update', text);
}

const sendStatuspercentToWindow = (text) => {
  mainWindow.webContents.send('percent', text);
}

autoUpdater.on('checking-for-update', () => {
  //sendStatusToWindow('Buscando Actualizaciones');
});
autoUpdater.on('update-available', (info) => {
  //sendStatusToWindow('Actualización disponible');
});
autoUpdater.on('update-not-available', (info) => {
  //sendStatusToWindow('Actualización no disponible');
});
autoUpdater.on('error', (err) => {
  //sendStatusToWindow('Error de Actualización ' + err);
});
autoUpdater.on('download-progress', (progressObj) => {
  let log_message = 'Descargando ' + Number.parseFloat(progressObj.percent).toFixed(2) + '%';
  //sendStatusToWindow(log_message);
  //sendStatuspercentToWindow(progressObj.percent);
});
autoUpdater.on('update-downloaded', (info) => {
  //sendStatusToWindow('Actualización descargada');
  autoUpdater.quitAndInstall();
});
