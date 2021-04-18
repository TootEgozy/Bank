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
    const credit = params[2];

    console.log(params);

    const user = users.find(u=> {
        return String(u.id) === String(id);
    })

    const cash = parseInt(user.cash);

    //id the id is invalid / the debt exceeds the credit
    if(id.length !== 9) {
        res.send(`<h1 style="font-family: Arial, Helvetica, sans-serif;">Invalid Id ${id}</h1>`);
    }

    const cred = credit * (-1);
    console.log(cred);
    console.log(parseInt(user.cash));
    if (parseInt(user.cash) < cred) {
        res.send(`<h1 style="font-family: Arial, Helvetica, sans-serif;">Low cash: Cannot update credit</h1>`);
    }


    console.log(user);
    //add user
    if (user === undefined) res.send(`<h1 style="font-family: Arial, Helvetica, sans-serif;">User is not registered</h1>`);


    //user exist 
    else {
        const tempUsers = [...users];
        tempUsers.map(user=> {
            if(String(user.id) === String(id)) {
                user.credit = parseInt(credit);
                console.log("user");
                console.log(user);
            }
            return user;
        });
        console.log(tempUsers);

        const dataJSON = JSON.stringify(tempUsers);
        fs.writeFileSync("./users.json", dataJSON);
        res.send(tempUsers);
    }

    // res.send(id+ cash+ credit+ isActive);
})



module.exports = router;