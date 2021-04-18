const express = require("express")
const router = express.Router()
const fs = require("fs");
const path = require("path");
const { route } = require("./showUsers");

// router.get("/", (req, res)=> {
//     res.send("hey");
// })

router.use("/", express.static(path.join(__dirname, '../public/menu')));


module.exports = router;