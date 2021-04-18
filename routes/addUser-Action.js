const express = require("express")
const router = express.Router()
const fs = require("fs");


const dataBuffer = fs.readFileSync("./users.json");
const dataJSON = dataBuffer.toString();
const users = JSON.parse(dataJSON);

router.get("/", (req, res)=> {
    let url = req.originalUrl;
    let params = url.split('/');

    params = params.filter(p=>{
        return p.length > 0;
    })
    const id = params[1];
    const cash = params[2];
    const credit = params[3];
    const isActive = params[4];
    console.log(params);

    //id the id is invalid / the debt exceeds the credit
    if(id.length !== 9) {
        res.send(`<h1 style="font-family: Arial, Helvetica, sans-serif;">Invalid Id ${id}</h1>`);
    }

    const cred = credit * (-1);
    console.log(cred);
    if (cash < cred) {
        res.send(`<h1 style="font-family: Arial, Helvetica, sans-serif;">Cannot exceed credit</h1>`);
    }
    const user = users.find(u=> {
        return u.id === id;
    })

    //add user
    if (user === undefined) {

        const tempUsers = [...users];
        tempUsers.push({
            id: id,
            cash: cash,
            credit: credit,
            isActive: isActive
        });
        const dataJSON = JSON.stringify(tempUsers);
        fs.writeFileSync("./users.json", dataJSON);
        res.send(tempUsers);
    }
    //user exist already
    else res.send(`<h1 style="font-family: Arial, Helvetica, sans-serif;">User is already registered</h1>`);

    // res.send(id+ cash+ credit+ isActive);
})



module.exports = router;