const io = require("socket.io-client");
// const host = "http://192.168.0.6:3333";
const host = "https://picanhacia.herokuapp.com";

const socket = io(host, {
  transports: ["websocket"],
  jsonp: false,
});

module.exports = socket;
