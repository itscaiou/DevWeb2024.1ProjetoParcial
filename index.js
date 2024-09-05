const express = require('express')

const mongoose = require('mongoose')

const app = express()
app.use(express.json())
const port = 3000

const Pokemon = mongoose.model('Pokemon', { 
    name: String,
    ID: Number,
    type: String,
    image_url: String 
});

app.get("/pokemons", async (req, res) => {
    const pokemon = await Pokemon.find()
    return res.send(pokemon)
})

app.get("/pokemons/:id", async (req,res) => {
    const pokemon = await Pokemon.findById(req.params.id)
    return res.send(pokemon)
})

app.post("/pokemons", async (req,res) => {
    const pokemon = new Pokemon({
        name: req.body.name,
        ID: req.body.ID,
        type: req.body.type,
        image_url: req.body.image_url
    })
    await pokemon.save()
    return res.send(pokemon)
})

app.put("/pokemons/:id", async (req, res) => {
    const pokemon = await Pokemon.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        ID: req.body.ID,
        type: req.body.type,
        image_url: req.body.image_url
    }, {
        new: true
    })
    return res.send(pokemon)
})


app.delete("/pokemons/:id", async (req,res) => {
    const pokemon = await Pokemon.findByIdAndDelete(req.params.id)
    return res.send(pokemon)
})


app.listen(port, () => {
    console.log('App running')
    mongoose.connect('mongodb+srv://caiov272:GAnGuroenBiFXWdd@pokemonsdevweb.raald.mongodb.net/?retryWrites=true&w=majority&appName=pokemonsDevWeb');

})
