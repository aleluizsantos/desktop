import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { upgradeConfigSystem } from "../../hooks";

import { CONFIG_SYSTEM } from "../../store/Actions/types";

import Swift from "../Switch";

export default function ConfigSystem() {
  const dispatch = useDispatch();
  const { configSystem } = useSelector((state) => state.Notificate);

  const handleUpgradeAction = async (key, item) => {
    const data = { ...configSystem, [key]: { ...item, auto: !item.auto } };
    const response = await upgradeConfigSystem(data);
    response.status === 200 &&
      dispatch({
        type: CONFIG_SYSTEM,
        payload: data,
      });
  };

  const handleOpenSettingConfig = () => window.indexBridge.openSettingConfing();

  return (
    <div>
      {Object.keys(configSystem).map((key, idx) => (
        <div key={idx} className="groupSetting">
          <div className="caption">
            <p>{configSystem[key].title}</p>
            <small>{configSystem[key].description}</small>
            {/* {key === "print" && (
              <small>Impressora padrão: {configSystem[key].printName}</small>
            )} */}
          </div>
          <div className="actions">
            <Swift
              value={configSystem[key].auto}
              onClick={() => handleUpgradeAction(key, { ...configSystem[key] })}
            />
          </div>
        </div>
      ))}
      <button onClick={handleOpenSettingConfig} className="bnt bnt-primary">
        Configurações...
      </button>
    </div>
  );
}
