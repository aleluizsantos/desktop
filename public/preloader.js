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
  //CreateOrder
  socket.on("operation", async (response) =>
    ipcRenderer.send(IPCkey.servicePrinterPrint, listOrder)
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
  checkNewOrder: () => console.log("ok...."),
};

contextBridge.exposeInMainWorld("indexBridge", indexBridge);

const listOrder = [
  {
    id: 34,
    dateTimeOrder: "2022-10-22T15:25:46.945Z",
    totalPurchase: "67.50",
    cash: "0.00",
    vTaxaDelivery: "0.00",
    coupon: "",
    discount: "0.00",
    note: "",
    timeDelivery: "60-80 min",
    address: "Rua da Saudade",
    number: "1864",
    neighborhood: "Jd. São Jorge",
    city: "Jales",
    uf: "SP",
    PointReferences: "",
    user_id: 2,
    deliveryType_id: 1,
    statusRequest_id: 1,
    payment_id: 1,
    name: "alessandro Santos",
    email: "aleluizsantos@gmail.com",
    phone: "17 98826-0129",
    deliveryType: "Delivery",
    statusRequest: "Em Analise",
    BGcolor: "#0AF405",
    payment: "Dinheiro",
    item: [
      {
        idItem: 90,
        amount: "1.00",
        price: "4.50",
        note: "",
        request_id: 34,
        product: "Coca Cola Lata 350ml",
        total: 4.5,
        additional: [
          {
            itemOrder_id: 90,
            description: "Pão Brioche",
            price: "0.00",
          },
          {
            itemOrder_id: 90,
            description: "Salada",
            price: "4.00",
          },
        ],
      },
      {
        idItem: 91,
        amount: "1.00",
        price: "15.00",
        note: "",
        request_id: 34,
        product: "Marmita Pequena",
        total: 15,
        additional: [
          {
            itemOrder_id: 91,
            description: "Pão Brioche",
            price: "0.00",
          },
        ],
      },
      {
        idItem: 92,
        amount: "2.00",
        price: "22.00",
        note: "",
        request_id: 34,
        product: "Marmita Média",
        total: 44,
        additional: [],
      },
    ],
  },
];
