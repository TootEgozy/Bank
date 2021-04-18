const express = require("express")
const router = express.Router()
const fs = require("fs");
const path = require("path");


const dataBuffer = fs.readFileSync("./users.json");
const dataJSON = dataBuffer.toString();
const users = JSON.parse(dataJSON);

// console.log(__dirname);
// console.log(path.join(__dirname, '../public/showUser'))

router.use("/", express.static(path.join(__dirname, '../public/addUser')));


// router.get('/:id', (req, res)=> {
//     console.log(router.param);
// })

module.exports = router;