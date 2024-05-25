const express = require('express');

const connectDB = require('./config/db');
require('dotenv').config



const app = express();

const PORT = process.env.PORT || 3000

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