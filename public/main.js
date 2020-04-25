const {
    app, 
    BrowserWindow, 
} = require('electron')
const path = require('path')
const url = require('url')

function createWindow() {
    let win = new BrowserWindow({
        width:500,
        // minwidth:800,
        height:800,
        // minheight:500,
        webPreferences:{
            nodeIntegration: true
        }
    })

    const startUrl = process.env.DEV
    ? 'http://localhost:3000'
    : url.format({
        pathname: path.join(__dirname, '../build/index.html'),
        protocol: 'file:',
        slashes: true,
    });
    
    win.loadURL(startUrl)

    win.removeMenu()
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    app.quit()
})