const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("versions", {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    ping: () => ipcRenderer.invoke("ping")
});

contextBridge.exposeInMainWorld("ManageStorage",{
    saveEditorData: (data) => saveEditorData(data),
    readEditorData: () => readEditorData(),
    saveTypeWriterData: (data) => saveTypeWriterData(data),
    readTypeWriterData: () => readTypeWriterData(),
    exportWorkspace: (data) => exportWorkspace(data),
    exportListWorkspace: (data) => exportListWorkspace(data)
})

function saveEditorData(data) {
    ipcRenderer.send("saveEditorData", data);
}

function saveTypeWriterData(data){
    ipcRenderer.send("saveTypeWriterData", data);
}

function exportWorkspace(data){
    ipcRenderer.send("exportWorkspace", data);
}

function exportListWorkspace(data){
    ipcRenderer.send("exportListWorkspace", data);
}

function readEditorData() {
    return ipcRenderer.invoke("readEditorData");
}

function readTypeWriterData() {
    return ipcRenderer.invoke("readTypeWriterData");
}