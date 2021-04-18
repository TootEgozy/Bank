const express = require('express')
const router = express.Router()
const fs = require("fs");

const dataBuffer = fs.readFileSync("./users.json");
const dataJSON = dataBuffer.toString();
const users = JSON.parse(dataJSON);


const usersId = users.map(user => user.id);
const usersCash = users.map(user => user.cash);
const usersCredit = users.map(user => user.credit);
const usersIsActive = users.map(user => user.isActive);

router.get('/', (req, res)=> {
    res.send(`
    <table className="users-table">
        <tr>
            <td>Id:</td>
            <td>Cash:</td>
            <td>Credit:</td>
            <td>Is Active:</td>
        </tr>
        ${users.map(user=> {
          return  `<tr>
                <td>${user.id}</td>
                <td>${user.cash}</td>
                <td>${user.credit}</td>
                <td>${user.isActive}</td>
            </tr>`
        })}
    </table>
    `);
})


module.exports = router;