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
            results.map(async (transaction) => {
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
            const price = Number(price_str);
            const transactionInfo = {
                user_id,
                operation,
                utc_timestamp,
                price,
                market,
                buy_sell_amt,
            };
            const csvData = await CsvData.find(transactionInfo)
            if(csvData.length==0){
                await CsvData.create(transactionInfo);
            }
        });
        const allEntries = await CsvData.find({})
            return res.status(200).json({
                success: true,
                message: "Data Added Successfully!!",
                data: allEntries
            });
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",

        })
    }
};

const getAssetBalanceAtTimestamp = async (req, res) => {};

module.exports = {
    uploadAndStoreCsvData,
    getAssetBalanceAtTimestamp,
};
