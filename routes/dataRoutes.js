const express = require('express');


const {uploadAndStoreCsvData, getAssetBalanceAtTimestamp} = require('../controllers/dataController');

const router = express.Router();



const dataRoutes = (upload) => {
    router.post('/upload', upload.single('file'), uploadAndStoreCsvData);
    router.get('/balance', getAssetBalanceAtTimestamp);
    return router;
}

module.exports = dataRoutes;