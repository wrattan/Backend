const express = require ("express");
const app = express();
const mysql = require('mysql2');
const cors = require ("cors");
const e = require("express");


app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    user:"root1",
    host: "34.94.242.160",
    password:"Team6password",
    database: "Team6",
});

db.connect();

// 3001 is our route
// app.post('/create', (req, res) => {
//     const name = req.body.name;
//     const phone = req.body.phone;
//     const email = req.body.email;
//     const userid = req.body.userid;
//     const password = req.body.password;

//     db.query('INSERT INTO users (userid, name, phone, email, password) VALUES (?,?,?,?,?)', 
//     [userid, name, phone, email, password], (err, result) => {
//         if (err){
//             console.log(err);
//         } else{
//             res.send("Values Inserted");
//         }
//     }
//     );
// })

// Get using AXIOS params
app.get('/Products', (request, response) => {
    const ptag = request.query.ptag;
    const pname = request.query.pname;
    if(ptag !== "*"){
    db.query("SELECT * FROM Products WHERE ptag='"+ptag+"' AND pname LIKE'"+pname+"%'", (err, result) => {
        if (err){
            console.log(err);
        } else{
            response.send(result);
        }
        console.log(ptag+", "+pname);
    })
}
    else{
        db.query("SELECT * FROM Products WHERE pname LIKE'"+pname+"%'", (err, result) => {
            if (err){   
                console.log(err);
            } else{
                response.send(result);
            }
            console.log(ptag+", "+pname);
        })
    }
});

app.listen(3001, () => {
    console.log("Your server is running on port 3001");
})

