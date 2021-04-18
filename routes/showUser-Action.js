const express = require("\express");
const router = express.Router();
const fs = require("fs");


const dataBuffer = fs.readFileSync("./users.json");
const dataJSON = dataBuffer.toString();
const users = JSON.parse(dataJSON);

router.get('/', (req, res)=> {
    console.log(req.body.id);
    //var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    // const url = req.originalUrl.replace(/\/+$/, "");
    // const params = url.split('/');
    // const id = params[params.length-1];
    // res.send(params);
    const url = req.originalUrl;
    let params = url.split("/");
    params = params.filter(p=> {
        return p.length > 0;
    })
    const id = params[1];

    if(id.length === 9) {
        const user = users.find(u=> {
            return u.id === parseInt(id);
        })
        if (user === undefined) res.send(`<h1 style="font-family: Arial, Helvetica, sans-serif;">User is not registered</h1>`);
        else res.send(user);
    }
    else {
        res.send(`<h1 style="font-family: Arial, Helvetica, sans-serif;">Invalid Id: ${id}</h1>`)
    }
});

module.exports = router;