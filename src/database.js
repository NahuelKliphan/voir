const { Client } = require('pg');
const { app } = require('electron');

const database = new Client(readDatabase());

function readDatabase() {
    const fs = require("fs");
    const ruta = app.getPath('userData');
    let data = fs.readFileSync(ruta + '\\base.txt').toString().split(';');
    console.log(JSON.parse(data[0]))
    return JSON.parse(data[0]);
}

exports.database = database;