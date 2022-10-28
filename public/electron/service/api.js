const axios = require("axios");

const host = "http://192.168.0.6:3333";

const api = axios.create({
  baseURL: host,
  timeout: 1000,
});

module.exports = api;
