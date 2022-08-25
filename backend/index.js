const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

app.listen(3000,(error) =>{
    if (error){
        console.log('Something went wrong.');
    } else{
        console.log('Listening to port 3000...');
    }
})

app.post('/store',jsonParser,(req,res) => {
    let content = req.body;
    fs.writeFile('data.json',JSON.stringify(content,null,4),(err) =>{
        console.log(err);
    });
    res.status(200).send("Data saved!");
})

app.get('/result',(req,res) => {
    fs.readFile('data.json',(error,data) => {
        if(error){
            res.send(500,'Data not found');
        } else{
            res.status(200).send(JSON.parse(data));
        }
    });
});