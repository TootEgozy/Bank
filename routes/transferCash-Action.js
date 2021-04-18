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
    const giverId = params[1];
    const reciverId = params[2];
    const cash = parseInt(params[3]);

    const giverUser = users.find(u=> {
        return String(u.id) === String(giverId);
    });

    const reciverUser = users.find(u=> {
        return String(u.id) === String(reciverId);
    });

    const negCredit = parseInt(giverUser.credit) *(-1);

    //checking that both users exist
    if(giverUser == undefined || reciverUser == undefined) res.send(`<h1 style="font-family: Arial, Helvetica, sans-serif;">One or both of the users is invalid</h1>`);

    //checking that the input cash is valid
    else if(cash < 0) res.send(`<h1 style="font-family: Arial, Helvetica, sans-serif;">Cannot deposit a negative amount</h1>`);
    
    //checking that the user has enough monew to transfer
    else if(parseInt(giverUser.cash)-cash < negCredit) res.send(`<h1 style="font-family: Arial, Helvetica, sans-serif;">Cannot exceed credit</h1>`);

    //transfer
    else {
        const tempUsers = [...users];
        console.log("giver:");
        console.log(giverUser);
        console.log("reciver:");
        console.log(reciverUser);
        console.log("cash:");
        console.log(cash);

        tempUsers.map(user=> {
            if(String(giverUser.id) === String(giverId)) {
                giverUser.cash = parseInt(giverUser.cash) - cash;
            }
            else if(String(reciverUser.id) === String(reciverId)) {
                reciverUser.cash = parseInt(reciverUser.cash) + cash;
            }
            return user;
        });

        console.log("=============");
        console.log("giver:");
        console.log(giverUser);
        console.log("reciver:");
        console.log(reciverUser);
        console.log("cash:");
        console.log(cash);

        const dataJSON = JSON.stringify(tempUsers);
        fs.writeFileSync("./users.json", dataJSON);
        res.send(tempUsers);

    }

    //201140568
    //567702450
})



module.exports = router;