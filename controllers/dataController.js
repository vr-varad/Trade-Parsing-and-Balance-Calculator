const fs = require("fs");
const csvParser = require("csv-parser");
const path = require("path");
const CsvData = require("../models/csvDataModel");

const uploadAndStoreCsvData = async (req, res) => {
    try {
        console.log("File uploaded successfully");
        const results = [];
        const filename = path.join(__dirname, "../uploads", req.file.filename);
        fs.createReadStream(filename)
        .pipe(csvParser())
        .on("data", (data) => results.push(data))
        .on("end", async() => {
            await Promise.all(results.map(async (transaction) => {
                const {
                    User_ID: user_id,
                    UTC_Time: utc_timestamp_str,
                    Operation: operation,
                    Market: market,
                    "Buy/Sell Amount": buy_sell_amt_str,
                    Price: price_str,
                } = transaction;
                const utc_timestamp = new Date(utc_timestamp_str);
                const buy_sell_amt = Number(buy_sell_amt_str);
                const base_coin = market.split('/')[0];
                const quote_coin = market.split('/')[1];
                const price = Number(price_str);
                const transactionInfo = {
                    user_id,
                    operation,
                    utc_timestamp,
                    price,
                    base_coin,
                    quote_coin,
                    buy_sell_amt,
                };
                const csvData = await CsvData.find(transactionInfo)
                if(csvData.length==0){
                    await CsvData.create(transactionInfo);
                }
            })
        )
        const allTransaction = await CsvData.find({}).sort({utc_timestamp : 1})
        return res.status(200).json({
            success: true,
            message: "Data Added Successfully!!",
            data: allTransaction
        });
    });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",

        })
    }
};

const getAssetBalanceAtTimestamp = async (req, res) => {
    try {
        const timestamp = req.body.timestamp
        const allTransaction = await CsvData.find({})
        const req_utc_timestamp = new Date(timestamp)
        const filteredTransctions = allTransaction.filter(transaction => transaction.utc_timestamp <  req_utc_timestamp)
        const coins = {};
        filteredTransctions.map(transaction => {
            const base_coin = transaction.base_coin;
            if(coins[base_coin]){
                coins[base_coin] += transaction.operation === 'Buy'?transaction.buy_sell_amt:-transaction.buy_sell_amt;
            }else{
                coins[base_coin] = transaction.operation === 'Buy'?transaction.buy_sell_amt:-transaction.buy_sell_amt;
            }
        })
        return res.json({
            success: true,
            message: "Coins Fetched Successfully",
            coins
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",

        })
    }
};

module.exports = {
    uploadAndStoreCsvData,
    getAssetBalanceAtTimestamp,
};
