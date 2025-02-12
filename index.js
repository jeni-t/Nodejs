const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const mongodb = require("mongodb")
const MongoClient = mongodb.MongoClient
const app = express()
const dotenv = require("dotenv").config()

console.log(process.env.DB)
const url = process.env.DB
mongoose.connect(url)
console.log("mongoose connected")

app.use(express.json())
app.use(
    cors({
        origin:"*"
    })
)

let products = []

app.get("/products",(req,res)=>{
    res.json(products)
})

app.post("/product",(req,res)=>{
    //req.body.id = products.length+1
    products.push(req.body)
    res.json({message:"product added successfully"})
})
app.listen(3000)