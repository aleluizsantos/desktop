const { contextBridge, ipcRenderer } = require("electron");
const IPCkey = require("./electron/common/constants");
const {
  getDefaultPrinters,
  saveSettingPrinters,
  getSoundActive,
  saveDefaultAudio,
} = require("./electron/storage");

const socket = require("./electron/service/socket");

window.addEventListener("DOMContentLoaded", () => {
  socket.on("CreateOrder", async (data) =>
    ipcRenderer.send(IPCkey.servicePrinterPrint, data)
  );
});

let indexBridge = {
  servicePrinterList: async () =>
    await ipcRenderer.invoke(IPCkey.servicePrinterList),
  saveDefaultAudio: async (values) => saveDefaultAudio(values),
  getDefaultAudio: async () => getSoundActive(),
  getDefaultPrinters: async () => getDefaultPrinters(),
  saveSettingPrinters: (setting) => saveSettingPrinters(setting),
  openSettingConfing: () => ipcRenderer.send(IPCkey.openWinSettingConfig),
  checkNewOrder: (data) =>
    ipcRenderer.invoke(IPCkey.serviceCheckNewOrder, data),
  servicePrintCoupom: (data) => console.log(data),
  // ipcRenderer.send(IPCkey.servicePrinterPrint, data),
};

contextBridge.exposeInMainWorld("indexBridge", indexBridge);
