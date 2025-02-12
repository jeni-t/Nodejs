const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const mongodb = require("mongodb")
const MongoClient = mongodb.MongoClient
const app = express()
const dotenv = require("dotenv").config()
const Recipe = require("./models/CreateRecipe");

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


app.post("/recipe",async(req,res)=>{
    try{
        const user = new Recipe({
            title: req.body.title,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
        })

        await Recipe.save()

        res.json({message:"Recipe created successfully"})
    }catch(error){
res.status(500).json({message:"somthing went wrong"})
    }
})

app.get("/recipes",async(req,res)=>{
    let recipes = await Recipe.find()
    res.json(recipes)
})
app.listen(3000)