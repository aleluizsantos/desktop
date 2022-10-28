const eventEmitter = require("events");
const { PosPrinter } = require("electron-pos-printer");

const { getDefaultPrinters } = require("../../storage");
const soundAlert = require("../sound_Alert");
const LayoutCoupom = require("./layoutCoupom");

eventEmitter.defaultMaxListeners = 35;
/**
 * Criar o cupom para impressão
 * @param {Array<object>} data Array de objeto contendo os pedidos
 * @return {Function} PosPrinter
 */
function printCoupom(data) {
  const { printerName, widthPage, silent, preview } = getDefaultPrinters();
  const options = {
    preview: preview, // Preview in window or print
    width: widthPage, //  width of content body
    margin: "0 0 0 0", // margin of content body
    copies: 1, // Number of copies to print
    printerName: printerName, // printerName: string, check it at webContent.getPrinters()
    timeOutPerLine: 5000,
    silent: silent,
  };

  data.map(async (order) => {
    const layoutCoupom = await LayoutCoupom(order);
    if (printerName && widthPage && layoutCoupom) {
      PosPrinter.print(layoutCoupom, options)
        .then(() => {
          soundAlert();
        })
        .catch((error) => {
          throw new Error(error);
        });
    } else {
      alert("Select the printer and the width");
    }
  });
}

module.exports = printCoupom;
