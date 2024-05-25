const express = require('express');
const multer = require('multer')
const path = require('path')
require('dotenv').config 


const connectDB = require('./config/db');
const dataRoutes = require('./routes/dataRoutes');

const app = express();

const PORT = process.env.PORT || 3000

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname.replaceAll(' ','-'));
    }
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/v1',dataRoutes(upload));

const start = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server started at port ${PORT}`);
        });
    } catch (error) {
        console.log('Server failed to start');
    }
}

start();