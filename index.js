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
app.get('/',(req,res)=>{
    return res.send(
        `<h1>Welcome to the Trade-Parsing-and-Balance-Calculator</h1>
        <p>This is the root endpoint of the Trade-Parsing-and-Balance-Calculator API.</p>
        <p>Available routes:</p>
        <ul>
            <li><a href="/api/v1/upload" method="POST">Upload Data</a></li>
            <p>RENDER - https://trade-parsing-and-balance-calculator-j7cy.onrender.com/api/v1/upload</p>
            <p>an API that accepts a CSV file as the input, parses the data present in it and stores it in a database</p>
            <li><a href="/api/v1/balance">Get Asset Balance</a></li>
            <p>RENDER - https://trade-parsing-and-balance-calculator-j7cy.onrender.com/api/v1/balance</p>
            <p>an API that would give the asset-wise balance of the account at any given timestamp.</p>
        </ul>`
    );
})

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