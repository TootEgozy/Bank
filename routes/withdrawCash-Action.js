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
    const cash = parseInt(params[2]);


    //user is not defined / the debt exceeds the credit
    if(id.length !== 9) {
        res.send(`<h1 style="font-family: Arial, Helvetica, sans-serif;">Invalid Id ${id}</h1>`);
    }

    const user = users.find(u=> {
        return String(u.id) === String(id);
    })

    const userCash = parseInt(user.cash);
    const userCred = parseInt(user.credit) * (-1);
    const newCash = userCash + cash;

    if (newCash < userCred) res.send(`<h1 style="font-family: Arial, Helvetica, sans-serif;">Cannot exceed credit</h1>`)
    else if (user === undefined) res.send(`<h1 style="font-family: Arial, Helvetica, sans-serif;">User is not registered</h1>`);
    
    // {

    //     const tempUsers = [...users];
    //     tempUsers.push({
    //         id: id,
    //         cash: cash,
    //         credit: credit,
    //         isActive: isActive
    //     });
    //    
    // }

    //deposit
    else {
        let tempUsers = [...users];
        tempUsers.map(user=> {
            if(String(user.id) === String(id)) {
                user.cash = newCash;
                console.log("user");
                console.log(user);
            }
            return user;
        });
        console.log(tempUsers);
    
        const dataJSON = JSON.stringify(tempUsers);
        fs.writeFileSync("./users.json", dataJSON);
        res.send(`
        <table className="users-table">
            <tr>
                <td>Id:</td>
                <td>Cash:</td>
                <td>Credit:</td>
                <td>Is Active:</td>
            </tr>
            ${tempUsers.map(user=> {
              return  `<tr>
                    <td>${user.id}</td>
                    <td>${user.cash}</td>
                    <td>${user.credit}</td>
                    <td>${user.isActive}</td>
                </tr>`
            })}
        </table>
        `);
    }
    
})



module.exports = router;