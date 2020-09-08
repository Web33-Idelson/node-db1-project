const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
    res.send(`
    <h2>Welcome to db 1!!!</h2>
    `)
  });

module.exports = server;
