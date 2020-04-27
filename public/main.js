const {
    app, 
    BrowserWindow,
    ipcMain 
} = require('electron')
const path = require('path')
const url = require('url')

const { spawn } = require('child_process')

function createWindow() {
    let win = new BrowserWindow({
        width:800,
        minWidth:800,
        // maxWidth:1000,
        height:700,
        minHeight:700,
        // maxHeight:900,
        icon:path.join(__dirname, "document_lock.ico"),
        webPreferences:{
            nodeIntegration: true
        }
    })

    const startUrl = "http://localhost:3000"
    // const startUrl = url.format({
    //     pathname: path.join(__dirname, '../build/index.html'),
    //     protocol: 'file:',
    //     slashes: true,
    // });
    
    win.loadURL(startUrl)

    // win.webContents.toggleDevTools()

    win.removeMenu()
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    app.quit()
})

ipcMain.handle('START', async (event, args) => {
    const result = await runBin(args)
    console.log("res", typeof(result))
    console.log(result)
    return result
})

function runBin(args) {
    return new Promise((resolve, reject) => {
        let cmd = path.join(__dirname, "../bin/main.exe")
        const bin = spawn(cmd, args)
    
        bin.on("error", (err) => {
            console.log(`ERROR, ${String.fromCharCode.apply(null, err)}`)
            // reject(`ERR, ${String.fromCharCode.apply(null, err)}`)
            resolve("ERR")
        })
    
        bin.stderr.on("data", (data) => {
            console.log(`ERR, ${String.fromCharCode.apply(null, data)}`)
            // reject(`ERR, ${String.fromCharCode.apply(null, data)}`)
            resolve("ERR")
        })
    
        bin.stdout.on("data", (data) => {
            // console.log(String.fromCharCode.apply(null, data))
            resolve(String.fromCharCode.apply(null, data))
        })
    })
}