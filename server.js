const express = require('express');
const multer = require('multer');
const uuid = require('uuid').v4;

const storage = multer.diskStorage({
    destination: (req, file, callback)=>{
        callback(null, 'uploads');
    },
    filename: (req, file, callback)=>{
        const {originalname} = file;
        callback(null, originalname);
    }
})
const upload = multer({storage})

const app = express();
app.use(express.static('public'));

app.post('/upload',upload.single('file'), (req, res)=>{
    return res.json({status: 'OK'})
})


app.listen(3001, ()=>console.log(`The server is running on port: 3001`))
