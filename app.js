const express = require('express');
const router = express.Router();
const fs = require("fs");
const bodyParser = require('body-parser');

const app = express();

//passport id, cash(default 0), credit(default 0).

const users = [
    {
        id: 325568413,
        cash: 80,
        credit: 1000,
        isActive: true
    },
    {
        id: 565589421,
        cash: 10000,
        credit: 3000,
        isActive: true,
        isActive: true
    },
    {
        id: 353389647,
        cash: -200,
        credit: 1000,
        isActive: true
    },
    {
        id: 567702450,
        cash: -10,
        credit: 500,
        isActive: true
    },
    {
        id: 987754690,
        cash: 500,
        credit: 2000,
        isActive: true
    },
    {
        id: 654452010,
        cash: 800,
        credit: 500,
        isActive: true
    },
    {
        id: 346605708,
        cash: 600,
        credit: 2500,
        isActive: true
    },
    {
        id: 703320541,
        cash: -100,
        credit: 1000,
        isActive: true
    },
    {
        id: 743372109,
        cash: 700,
        credit: 300,
        isActive: true
    },
    {
        id: 201140568,
        cash: -500,
        credit: 2000,
        isActive: true
    },
]

const usersJson = JSON.stringify(users);
(fs.existsSync('users.json'))? "" : fs.writeFileSync('users.json', usersJson);

app.use(bodyParser.json());

app.use(require('./routes'));

app.use((req, res)=> {
    res
    .status(404)
    .send("Unknown request");
})

app.listen(3000);