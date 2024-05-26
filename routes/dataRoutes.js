const express = require('express');


const {uploadAndStoreCsvData, getAssetBalanceAtTimestamp} = require('../controllers/dataController');

const router = express.Router();



const dataRoutes = (upload) => {
    router.get('/',(req,res)=>{
        return res.send(
            `<h1>Welcome to the Data API</h1>
            <p>This is the root endpoint of the Data API.</p>
            <p>Available routes:</p>
            <ul>
                <li><a href="/api/v1/upload" method="POST">Upload Data</a></li>
                <p>an API that accepts a CSV file as the input, parses the data present in it and stores it in a database</p>
                <li><a href="/api/v1/balance">Get Asset Balance</a></li>
                <p>an API that would give the asset-wise balance of the account at any given timestamp.</p>
            </ul>`
        );
    })
    router.post('/upload', upload.single('file'), uploadAndStoreCsvData);
    router.get('/balance', getAssetBalanceAtTimestamp);
    return router;
}

module.exports = dataRoutes;