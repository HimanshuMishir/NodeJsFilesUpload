const express = require('express');
const multer = require('multer');
const uuid = require('uuid').v4;
const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');
const product_catalog = require('./models/products')

const database_url = process.env.DBURL
//console.log(database_url)
mongoose.connect(database_url,{
    useNewUrlParser: true, useUnifiedTopology: true
})
const connection = mongoose.connection;
connection.on('err', console.log)


const app = express();
app.use(express.static('public'));

app.post('/upload', (req, res)=>{
    
    const storage = multer.diskStorage({
        destination: (req, file, callback)=>{
            callback(null, 'uploads');
        },
        filename: (req, file, callback)=>{
           
           const ext = path.extname(file.originalname);
           const id = uuid();
           const filepath = `${id}${ext}`
            callback(null, filepath);
            console.log(filepath)
        }
    })
    const upload = multer({storage}).array('file', 10);
    upload(req, res, err=>{
        console.log(req.body.product_name)
        if(err){
            console.log(err);
        }
        res.json({status: 'OK', uploaded: req.files.length })
    })

})


app.listen(3001, ()=>console.log(`The server is running on port: 3001`))
