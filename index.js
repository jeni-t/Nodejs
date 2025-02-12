const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const mongodb = require("mongodb")
const MongoClient = mongodb.MongoClient
const app = express()
const dotenv = require("dotenv").config()
const Recipe = require("./models/CreateRecipe");

const url = process.env.DB
mongoose.connect(url)

app.use(express.json())
app.use(
    cors({
        origin:"*"
    })
)

app.post("/PostRecipes", async (req, res) => {
    try {
        
        const newRecipe = new Recipe({ 
            title :req.body.title, 
            ingredients :req.body.ingredients, 
            instructions :req.body.instructions
        });
        await newRecipe.save();

        res.status(201).json({ message: "Recipe created successfully", recipe: newRecipe });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error });
    }
});

app.get("/GetRecipes", async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error });
    }
});


app.get("/GetRecipes/:id", async (req, res) => {
    try {
        const recipe = await Recipe.find((recipe)=>recipe.id == req.params.id);

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        res.json(recipe);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error });
    }
});

app.put("/UpdateRecipes/:id", async (req, res) => {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                ingredients: req.body.ingredients,
                instructions: req.body.instructions
            },
            
        );

        if (!updatedRecipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        res.json({ message: "Recipe updated successfully", recipe: updatedRecipe });
    } catch (error) {

        res.status(500).json({ message: "Something went wrong", error });
    }
});

app.delete("/DeleteRecipes/:id", async (req, res) => {
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);

        if (!deletedRecipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        res.json({ message: "Recipe deleted successfully" });
    } catch (error) {

        res.status(500).json({ message: "Something went wrong", error });
    }
});

app.listen(3000)