import express from "express";

const app = express();
app.use(express.json());

let ETH_BALANCE = 200;
let USDC_BALANCE = 700000; //IMPERMANENT LOSS

// app.post("/add-liquidity", (req,res) => {

// })

app.post("/buy-asset", (req,res) => {
    const product = ETH_BALANCE*USDC_BALANCE;
    const quantity = req.body.quantity;
    const updatedEthQuantity = ETH_BALANCE-quantity;
    const updatedUsdcBalance = product/updatedEthQuantity; // ETH_BALANCE*USDC_BALANCE/updatedEthQuantity
    const paidAmount = updatedUsdcBalance - USDC_BALANCE;

    ETH_BALANCE =updatedEthQuantity;
    USDC_BALANCE = updatedUsdcBalance;
    res.json({
        message: `You paid ${paidAmount} USDC for ${quantity} ETH`
    })
})

app.post("/sell-asset", (req,res) => {
    const product = ETH_BALANCE*USDC_BALANCE;
    const quantity = req.body.quantity;
    const updatedEthQuantity = ETH_BALANCE+quantity;
    const updatedUsdcBalance = product/updatedEthQuantity; // ETH_BALANCE*USDC_BALANCE/updatedEthQuantity
    const gottenUsdc = USDC_BALANCE - updatedUsdcBalance;

    ETH_BALANCE =updatedEthQuantity;
    USDC_BALANCE = updatedUsdcBalance;
    res.json({
        message: `You sold ${quantity} ETH for ${gottenUsdc} USDC`
    })
})

// app.post("/quote", (req,res) => {
    
// })

app.listen(3000);
