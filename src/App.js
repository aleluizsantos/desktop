import React, { useEffect } from "react";
import io from "socket.io-client";
import { Router } from "react-router";
import { useDispatch } from "react-redux";
import { createBrowserHistory } from "history";

import { Routes } from "./routes";
import { url } from "./services/host";
import {
  OPEN_CLOSE,
  CLIENT_ONLINE,
  UPDATE,
  CLIENT_REGISTERED,
} from "./store/Actions/types";
import { statusOpenClose, myOrders } from "./store/Actions";

const history = createBrowserHistory();

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      dispatch(statusOpenClose());
      dispatch(myOrders()).then((resp) => actionNewOrder(resp));

      const socket = io(url, {
        transports: ["websocket"],
        jsonp: false,
      });

      socket.on("operation", (response) => {
        dispatch({
          type: OPEN_CLOSE,
          payload: response.open_close,
        });
      });
      socket.on("onlineClients", (response) => {
        dispatch({
          type: CLIENT_ONLINE,
          payload: response,
        });
      });
      socket.on("update", (response) => {
        dispatch({
          type: UPDATE,
          payload: response.update,
        });
      });
      // socket.on("CreateOrder", (response) => {
      //   dispatch({
      //     type: NEW_ORDERS,
      //     payload: response.CreateOrder,
      //   });
      // });
      socket.on("ClientsRegistered", (response) => {
        dispatch({
          type: CLIENT_REGISTERED,
          payload: response.countUser,
        });
      });
    })();
  }, [dispatch]);

  async function actionNewOrder(order) {
    if (order.length > 0) {
      // Disparar um janela para o usuário informando que existe pedido
      // o usuario deve escolher 0=IMPRIMIR | 1=ABRIR APLICAÇÃO | 2=IR PARA PAINEL PEDIDO
      const respDialog = await window.indexBridge.checkNewOrder(order);
      respDialog === 2 && history.push("/myOrders");
    }
  }

  return (
    <Router history={history}>
      <Routes />
    </Router>
  );
};
export default App;
