const Stoge = require("electron-store");
const storage = new Stoge();

const default_printers = {
  printerName: "",
  widthPage: "",
  silent: true,
  auto: true,
  preview: false,
};
const default_sound = {
  active: true,
  volume: 0.5,
  audio: "notification.mp3",
};

function getDefaultPrinters() {
  const settingPrinters = storage.get("setting-printers");

  if (settingPrinters) {
    return settingPrinters;
  } else {
    storage.set("setting-printers", default_printers);
    return default_printers;
  }
}

function saveSettingPrinters(setting) {
  try {
    storage.set("setting-printers", setting);
  } catch (error) {
    console.log(error.message);
  }
}

function getWinSetting() {
  const default_bounds = [800, 600];
  const size = storage.get("win-size");
  if (size) return size;
  else {
    storage.set("win-size", default_bounds);
    return default_bounds;
  }
}

function saveBounds(bounds) {
  storage.set("win-size", bounds);
}

function getSoundActive() {
  const soundAlert = storage.get("sound-alert");
  if (soundAlert) return soundAlert;
  else {
    storage.set("sound-alert", default_sound);
    return default_sound;
  }
}

function saveDefaultAudio(values) {
  storage.set("sound-alert", values);
}

module.exports = {
  getWinSetting: getWinSetting,
  saveBounds: saveBounds,
  getDefaultPrinters: getDefaultPrinters,
  saveSettingPrinters: saveSettingPrinters,
  getSoundActive: getSoundActive,
  saveDefaultAudio: saveDefaultAudio,
};
