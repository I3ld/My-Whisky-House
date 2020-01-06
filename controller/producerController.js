const express = require('express');
const router = express.Router();

const Producer = require('../model/producer');

router.get("/", (req, res, next) => {
    const producersList = Producer.list();
    res.render('producers/producerList', {
        pageTitle: "All producers",
        producersList: producersList
    });
});

router.get("/showNewForm", (req, res, next) => {
    res.render('producers/producerForm', {
        pageTitle: "New producer",
        formAction: "add",
        producer: {}
    });
});

router.get("/showEditForm", (req, res, next) => {
    const producerList = Producer.list();
    var id = parseInt(req.query.producer_id);
    const producer = producerList[id - 1];
    res.render('producers/producerForm', {
        pageTitle: "Edit producer",
        formAction: "edit",
        producer: producer
    });
});

router.post("/add", (req, res, next) => {
    const newProducer = new Producer(req.body.name, req.body.country, req.body.dateOfStart, req.body.owner);
    Producer.add(newProducer);
    res.redirect("/producers");
});

router.post("/edit", (req, res, next) => {
    const editProducer = new Producer(req.body.name, req.body.country, req.body.dateOfStart, req.body.owner, req.body.producer_id);
    Producer.edit(editProducer);
    res.redirect("/producers");
});

router.get("/delete", (req, res, next) => {
    var id = parseInt(req.query.producer_id);
    Producer.delete(id);
    res.redirect("/producers");
});

module.exports.route = router;
