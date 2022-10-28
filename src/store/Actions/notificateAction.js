import { OPEN_CLOSE, SET_MESSAGE, NEW_ORDERS, CONFIG_SYSTEM } from "./types";

import { typeStatusMyOrders } from "../../hooks/MyOrders";
import {
  getOpenClose,
  setOpenClose,
  getOrders,
  getConfigSystem,
} from "../../hooks";

export const configSystem = () => (dispatch) => {
  return getConfigSystem().then((data) => {
    dispatch({
      type: CONFIG_SYSTEM,
      payload: data,
    });
  });
};

export const statusOpenClose = () => (dispatch) => {
  return getOpenClose().then(
    (data) => {
      dispatch({
        type: OPEN_CLOSE,
        payload: data.open_close,
      });
    },
    (error) => {
      dispatch({
        type: SET_MESSAGE,
        payload: "Opss!! Erro na comunição.",
      });
    }
  );
};

export const upgradeOpenClose = () => (dispatch) => {
  return setOpenClose().then(
    (data) => {
      dispatch({
        type: OPEN_CLOSE,
        payload: data.open_close,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: data.open_close
          ? "Loja aberta, Boas vendas."
          : "Loja Fechada,  Bom descanço!",
      });
    },
    (error) => {
      const message =
        error.response.data.error || error.message || error.toString();

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
    }
  );
};

export const myOrders = () => (dispatch) => {
  return getOrders(typeStatusMyOrders.ACTIVE).then(
    (data) => {
      dispatch({
        type: NEW_ORDERS,
        payload: data.length,
      });
    },
    (error) => {
      const message = error.message || error.toString();

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
    }
  );
};
