const express = require('express');
const router = express.Router();

const Post = require('../model/post');
const Product = require('../model/product');
const Producer = require('../model/producer');
const authCheck = require('../middleware/authCheck');

router.get("/", (req, res, next) => {
    const productsList = Product.list();
    res.render('products/index', {
        productsList: productsList
    });
});

router.get("/showNewForm", authCheck, (req, res, next) => {
    const producersList = Producer.list();
    res.render('products/nowy', {
        pageTitle: "New produkt",
        formAction: "add",
        producersList: producersList,
        product: {}
    });
});

router.get("/showEditForm", authCheck, (req, res, next) => {
    const productList = Product.list();
    const producersList = Producer.list();
    var id = parseInt(req.query.product_id);
    const product = productList[id - 1];
    res.render('products/nowy', {
        pageTitle: "Edit product",
        formAction: "edit",
        producersList: producersList,
        product: product
    });
});

router.post("/add", authCheck, (req, res, next) => {
    var producerId = req.body.producent;
    var selectedProducer = Producer.list()[producerId - 1];
    const newProduct = new Product(req.body.name,
                                    req.body.moc,
                                    req.body.pojemnosc,
                                    req.body.cena,
                                    req.body.rate,
                                    req.body.zdjecie,
                                    req.body.notatka,
                                    req.body.opis,
                                    selectedProducer);
    Product.add(newProduct);
    res.redirect("/products");
});

router.post("/edit", authCheck, (req, res, next) => {
    var productId = parseInt(req.body.product_id);
    var producerId = req.body.producent;
    var selectedProducer = Producer.list()[producerId - 1];
    const editProduct = new Product(req.body.name,
                                    req.body.moc,
                                    req.body.pojemnosc,
                                    req.body.cena,
                                    req.body.rate,
                                    req.body.zdjecie,
                                    req.body.notatka,
                                    req.body.opis,
                                    selectedProducer,
                                    req.body.product_id);
    Product.edit(editProduct);
    res.redirect("/products/showProduct?product_id="+productId);
});

router.get("/showProductPosts", authCheck, (req, res, next) => {
    var id = parseInt(req.query.product_id);
    const product = Product.details(id);
    res.render('products/post', {
        pageTitle: "Show product posts",
        formAction: "productPosts",
        product: product
    });
});

router.get("/showDetails", authCheck, (req, res, next) => {
    var id = parseInt(req.query.product_id);
    const product = Product.details(id);
    res.render('products/details', {
        pageTitle: "Show product",
        formAction: "details",
        product: product
    });
});

router.get("/delete", authCheck, (req, res, next) => {
    var id = parseInt(req.query.product_id);
    Post.deleteProductPosts(id);
    Product.delete(id);
    res.redirect("/products");
});

module.exports.route = router;