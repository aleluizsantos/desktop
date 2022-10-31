const { dialog } = require("electron");
const printCoupom = require("../componets/printCoupom");

const optionsMessage = {
  type: "question",
  buttons: ["Sim, por favor", "Não, obrigado", "Ir para caixa de pedido"],
  defaultId: 2,
  title: "Novo pedido",
  message: "Existe pedido em sua caixa de entrada?",
  detail: "Deseja imprimir os pedidos?",
};

async function actionNewOrders(orders) {
  const respDialog = dialog.showMessageBoxSync(null, optionsMessage);
  switch (respDialog) {
    case 0:
      printCoupom(orders);
      break;
    case 1:
      break;
    default:
      break;
  }
  return respDialog;
}

module.exports = actionNewOrders;
