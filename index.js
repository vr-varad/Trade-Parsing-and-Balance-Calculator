const express = require('express');
require('dotenv').config 

const connectDB = require('./config/db');
const dataRoutes = require('./routes/dataRoutes');

const app = express();

const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/v1',dataRoutes);

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