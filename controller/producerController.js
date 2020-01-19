const express = require('express');
const router = express.Router();

const Producer = require('../model/producer');

router.get("/", (req, res, next) => {
    Producer.list()
      .then( ([producersList, metadata]) => {
        res.render('producers/producerList', {
            pageTitle: "All producers",
            producersList: producersList
        });
      })
      .catch(err => {
        console.log(err);
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
    var id = parseInt(req.query.producer_id);
    Producer.details(id)
      .then( ([producer, metadata]) => {
        res.render('producers/producerForm', {
            pageTitle: "Edit producer",
            formAction: "edit",
            producer: producer[0]
        });
      })
      .catch(err => {
        console.log(err);
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
