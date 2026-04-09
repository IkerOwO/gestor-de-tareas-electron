const { app, BrowserWindow, ipcMain } = require('electron')

const path = require('node:path')
const { initDB, getNotes, addNote, deleteNote } = require('./Db/database')
const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    autoHideMenuBar: true,
    frame: false,
    icon: './resources/icon.png',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(async () => {
  await initDB();
  
  ipcMain.handle('get-notes', () => getNotes());
  ipcMain.on('add-note', (event, titulo, contenido) => addNote(titulo, contenido));
  ipcMain.on('delete-note', (event, id) => deleteNote(id));

  createWindow()
})

ipcMain.on('window-minimize', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender)
  win.minimize()
})

ipcMain.on('window-maximize', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender)
  if (win.isMaximized()) {
    win.unmaximize()
  } else {
    win.maximize()
  }
})

ipcMain.on('window-close', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender)
  win.close()
})