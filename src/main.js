const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const database = require('./database').database;

if (process.env.NODE_ENV !== 'production') {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
  });
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: { nodeIntegration: true },
  });

  mainWindow.maximize();

  if (process.env.NODE_ENV == 'production') {
    mainWindow.setMenu(null);
    mainWindow.setFullScreen(true);
  }

  mainWindow.loadFile('./src/index.html');
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
