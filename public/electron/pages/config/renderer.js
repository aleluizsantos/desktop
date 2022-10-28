const listAudioDefault = [
  { audio: "notification.mp3" },
  { audio: "notifiFood.mp3" },
];
let selectedVolumeAudio = 1;

window.addEventListener("DOMContentLoaded", async () => {
  const widthPrint = ["140px", "170px", "200px", "250px", "300px"];
  const listPrinters = document.getElementById("list_printers");
  const listWith = document.getElementById("list_Width");
  const listAudio = document.getElementById("list_audio");
  const volumeAudio = document.getElementById("volume");
  const printDefault = document.getElementById("print-default");
  const printSilent = document.getElementById("printSilent");
  const printAuto = document.getElementById("printAuto");
  const visualPrint = document.getElementById("visualPrint");
  const activeAudio = document.getElementById("active-audio");
  const bntBack = document.getElementById("bnt-back");
  const bntSalveConfig = document.getElementById("bnt-salveConfig");

  const { printerName, widthPage, silent, auto, preview } =
    await window.indexBrindge.getDefaultPrinters();

  // Buscar no storage o audio padrão e o volume
  const sound = await window.indexBrindge.getDefaultAudio();

  printDefault.innerText = `Padrão: ${printerName}`;
  printSilent.checked = silent;
  printAuto.checked = auto;
  visualPrint.checked = preview;
  activeAudio.checked = sound.active;
  volumeAudio.value = sound.volume * 100;

  // GET: Lista de todas as impressora do sistema do computador
  const printers = await window.indexBrindge.servicePrinterList();
  // Criar um lista das impressora no Layout
  // eslint-disable-next-line array-callback-return
  printers.map((item, index) => {
    const checked = item.name === printerName ? "checked" : "";
    listPrinters.innerHTML += `<input ${checked} type="radio" id="printer_${index}" name="printer" value="${item.name}" />
     <label for="printer_${index}">${item.name}</label><br>`;
  });
  // Criar um lista das largura no Layout
  // eslint-disable-next-line array-callback-return
  widthPrint.map((item, idx) => {
    const checked = item === widthPage ? "checked" : "";
    listWith.innerHTML += `<input ${checked}  type="radio" id="w_${idx}" name="width-print" value="${item}">
    <label for="w_${idx}">${item}</label><br>`;
  });
  // Inserir os audio disponíveis
  // eslint-disable-next-line array-callback-return
  listAudioDefault.map((item, idx) => {
    const selected = item.audio === sound.audio ? "selected" : "";
    listAudio.innerHTML += `
      <option id="op_${idx}" ${selected} value="${item.audio}">${item.audio}</option>`;
  });

  // Monitorar a alteração do range do volume
  volumeAudio.addEventListener("change", () => {
    selectedVolumeAudio = volumeAudio.value / 100;
  });

  // Fechar a janela configuração
  bntBack.addEventListener("click", () => window.top.close());
  // Salvar as configurações
  bntSalveConfig.addEventListener("click", () => {
    const nodeListPrint = document.getElementsByName("printer");
    const nodeListWidthPrint = document.getElementsByName("width-print");
    const selectAudio = document.getElementById("list_audio");

    let selectPrinterName;
    let selectWidthPage;
    let selectAudioDefault =
      selectAudio.options[selectAudio.selectedIndex].value;

    // Percorrer a lista de impressora e verificar qual o usuário escolheu
    for (const item of nodeListPrint) {
      if (item.checked) {
        selectPrinterName = item.value;
        break;
      }
    }
    // Percorrer a lista de largura e verificar qual o usuário escolheu
    for (const item of nodeListWidthPrint) {
      if (item.checked) {
        selectWidthPage = item.value;
        break;
      }
    }

    const dataSettingPrinter = {
      printerName: selectPrinterName,
      widthPage: selectWidthPage,
      silent: printSilent.checked,
      auto: printAuto.checked,
      preview: visualPrint.checked,
    };

    const dataSettingAudio = {
      active: activeAudio.checked,
      volume: selectedVolumeAudio,
      audio: selectAudioDefault,
    };

    window.indexBrindge.saveDefaultAudio(dataSettingAudio);
    window.indexBrindge.saveSettingPrinters(dataSettingPrinter);
    window.top.close(); //Fechar a janela
  });
});
// // === in renderer code

// import { ipcRenderer } from 'electron';

// // in some async function ...
// const printers = await ipcRenderer.invoke('serivce-printer-list');
// const data = [ ... ]; // data to print
// const options = {
//   printerName: printers[0], // a printer from the printers list
//   // ... other options
// };
// try {
//   await ipcRenderer.invoke('serivce-printer-print', (data, options));
// } catch(err) {
//   console.error(err);
// }

// // === in main code

// const { app, BrowserWindow, ipcMain } = require('electron');
// const { PosPrinter } = require('electron-pos-printer');

// // main window init logic
// const mainWindow = new BrowserWindow({ ... });

// ipcMain.handle('service-printer-list', async () => {
//   const webContents = mainWindow.webContents;
//   const printers = webContents.getPrinters();

//   return printers;
// });

// ipcMain.handle('service-printer-list', async (data, options) => PosPrinter.print(data, options));
