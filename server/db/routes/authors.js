const express = require("express");
const router = express.Router();
const db = require("../models/index");

router.get("/", (req, res) => {

    db.Author.findAll()
    .then(authors => {
        res.status(200).json(authors);
    }).catch(err => res.status(500).send("bad"));
});

router.get("/:id", (req, res) => {

    db.Author.findById(req.params.id)
    .then(author => {
        if (!author) res.status(404).send();
        res.status(200).json(author);
    }).catch(err => res.status(500).send("bad"));
});

router.get("/:id/blogs", (req, res) => {
    
    db.Blog.findAll({where: {
        authorId: req.params.id
    }}).then(blog => {
        if (!blog) res.status(404).send();
        res.status(200).json(blog);
    }).catch(err => res.status(500).send("bad"));
});

router.post("/", (req, res) => {

    db.Author.create()
    .then(author => res.status(201).json(author))
    .catch(err => res.status(500).send("bad"));
});

router.put("/:id", (req, res) => {


    var keys = Object.keys(req.body);
    db.Author.findById(req.params.id)
    .then(author => { 
        keys.forEach(key => {
            author[key] = req.body[key];
        });
        author.save()
        .then(author1 => {
            if (!author1) res.status(404).send();
            res.status(204).json(author);
        }).catch(err => res.status(500).send("bad"));
    }).catch(err => res.status(500).send("bad"));
});

router.delete("/:id", (req, res) => {

    db.Author.findById(req.params.id)
    .then(author => {
        author.destroy()
        .then(author1 => {
            if (!author1) res.status(404).send();
            res.status(200).send();
        }).catch(err => res.status(500).send("bad"));
    }).catch(err => res.status(500).send("bad"));

});

module.exports = router;