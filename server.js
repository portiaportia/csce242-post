const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));

const songs = [
    {id:1, name:"Jingle Bells", singer:"Michael Buble", genre:"jazz" },
    {id:2, name:"All I want for Christmas is you", singer:"Miara Carrie", genre:"pop"},
    {id:3, name:"Rodulf the Red Nose Reinder", singer:"DMX", genre:"rap"},
    {id:4, name:"White Christmas", singer:"Elvis Prezley", genre:"rock"}
]

app.get('/api/songs', (req,res)=>{
    res.send(songs);
});

app.get('/api/songs/:id', (req,res)=>{
    const requestedId = parseInt(req.params.id);
    const song = songs.find(s =>s.id === requestedId);

    if(!song) {
        res.status(404).send(`The song with id ${requestedId} was not found`);
        return;
    }

    res.send(song);
});

//render our html page
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
});

app.post('/api/songs', (req,res)=>{
    const schema = {
        name:Joi.string().min(3).required(),
        singer:Joi.string().min(4).required(),
        genre:Joi.string().required()
    }

    const result = Joi.validate(req.body, schema);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
    }

    const song = {
        id:songs.length + 1,
        name : req.body.name,
        singer : req.body.singer,
        genre : req.body.genre
    }
    console.log("name is: " + req.body.name);
    songs.push(song);
    res.send(song);
});

//listen
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
});