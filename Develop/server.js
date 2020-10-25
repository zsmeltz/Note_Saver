const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 8082;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());
var notes = [];

app.get("/", function(req, res){
    res.header("Content-Type", "text/html");
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function(req, res){
    res.header("Content-Type", "text/html");
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", function(req, res){
    res.header("Content-Type", "text/html");
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/api/notes", function(req, res){
    fs.readFile("db/db.json", "utf8", function(err){
        
        console.log('im here')
        if (err) throw err;

        res.json(notes);
    });
});

app.post("/api/notes", function(req, res){
    console.log(req.body);
    notes.push(req.body); 
    console.log("I got here")
    fs.writeFile("db/db.json", JSON.stringify(notes), function(notes, err){
        console.log(err);
        res.json(notes);
    });
    console.log("wrote the notes to the db file");
    
   
});

// app.delete("/api/note", function(req, res){

// })

app.listen(PORT,() => console.log("Listening on port " + PORT));