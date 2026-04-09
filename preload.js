const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron
})

contextBridge.exposeInMainWorld('windowAPI', {
    minimize: () => ipcRenderer.send('window-minimize'),
    maximize: () => ipcRenderer.send('window-maximize'),
    close: () => ipcRenderer.send('window-close')
})

contextBridge.exposeInMainWorld('dbAPI', {
    getNotes: () => ipcRenderer.invoke('get-notes'), // Promise
    addNote: (titulo, contenido) => ipcRenderer.send('add-note', titulo, contenido),
    deleteNote: (id) => ipcRenderer.send('delete-note', id)
})
