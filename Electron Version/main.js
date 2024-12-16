const { app, BrowserWindow, ipcMain} = require("electron");
const path = require("path");
const fs = require("fs");
const moment = require("moment");

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1024,
        height: 1444,
        webPreferences: {
            preload: path.join(__dirname, "/preload/preload.js")
        },
        center:true,
        icon: __dirname + "/MyIcon.ico",
        autoHideMenuBar: true
    });
    
   win.loadFile("index.html");
   win.maximize();
   win.on('show', ()=>{
    setTimeout(()=>{
        win.focus();
    },200);
   });
}
ipcMain.on("saveEditorData", (sender, data) => {
    let sData = JSON.stringify(data);
    fs.writeFileSync(__dirname+"/data/EditorData.json", sData);
});

ipcMain.on("saveTypeWriterData", (sender, data) =>{
    let sData = JSON.stringify(data);
    fs.writeFileSync(__dirname+"/data/TypeWriterData.json", sData);
});

ipcMain.on("exportWorkspace", (sender, data) => {
    let sData = JSON.stringify(data);
    var fileName = ("/AS_tw_wrkspc-"+moment().format("MMDDYYYY-hh-mm-ssa").toString()+".json");
    fs.writeFileSync(app.getPath('downloads')+fileName, sData);
});

ipcMain.on("exportListWorkspace", (sender, data)=> {
    let sData = JSON.stringify(data);
    var fileName = ("/AS_li_wrkspc-"+moment().format("MMDDYYYY-hh-mm-ssa").toString()+".json");
    fs.writeFileSync(app.getPath('downloads')+fileName, sData);
});

ipcMain.handle("readEditorData", ()=>{
    //Read the data
    let res = fs.existsSync(__dirname+"/data/EditorData.json");
    var sendBack;
    if (res) {
        let dt = fs.readFileSync(__dirname+"/data/EditorData.json");
        let data = JSON.parse(dt);
        sendBack = data;
    }
    return sendBack;
});

ipcMain.handle("readTypeWriterData", ()=>{
    //Read the data
    let res = fs.existsSync(__dirname+"/data/TypeWriterData.json");
    var sendBack;
    if (res) {
        let dt = fs.readFileSync(__dirname+"/data/TypeWriterData.json");
        let data = JSON.parse(dt);
        sendBack = data;
    }
    return sendBack;
});
app.whenReady().then(()=>{
    ipcMain.handle('ping', () => 'pong')
    createWindow();

    app.on("activate", ()=>{
        if(BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});

app.on("window-all-closed", ()=>{
    if(process.platform !== "darwin")
        app.quit();
});