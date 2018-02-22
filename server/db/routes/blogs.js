
const express = require("express");
const router = express.Router();
const db = require("../models/index");

router.get("/", (req, res) => {

    db.Blog.findAll()
    .then(blogs => {
        res.status(200).json(blogs);
    }).catch(err => res.status(500).send("bad"));
});

router.get("/featured", (req, res) => {

    db.Blog.findAll({where: {featured: true}})
    .then(blogs => {
        res.status(200).send(blogs);
    }).catch(err => res.status(500).send("bad"));
});

router.get("/:id", (req, res) => {

    db.Blog.findById(req.params.id)
    .then(blog => {
        if(!blog) res.status(404).send();
        res.status(200).json(blog);
    }).catch(err => res.status(500).send("bad"));
});

router.post("/", (req, res) => {

    var newBlog = req.body;
    newBlog.authorId = req.query.authorId;
    db.Blog.create(newBlog)
    .then(blog => {
        res.status(201).json(blog)})
    .catch(err => res.status(500).send("bad"));
});

router.put("/:id", (req, res) => {

    db.Blog.update(req.body, {where: {id: req.params.id}})
    .then(blog => res.status(204).json(blog))
    .catch(err => res.status(500).send("bad"));

});

router.delete("/:id", (req, res) => {

    db.Blog.findById(req.params.id)
    .then(blog => {
        blog.destroy()
        .then(blog1 => res.status(200).json(blog1))
        .catch(err => res.status(500).send("bad"));
    });
});

module.exports = router;