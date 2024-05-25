const express = require('express');

const {uploadAndStoreCsvData, getAssetBalanceAtTimestamp} = require('../controllers/dataController');

const router = express.Router();

router.post('/upload', uploadAndStoreCsvData);
router.get('/balance', getAssetBalanceAtTimestamp);




module.exports = router;