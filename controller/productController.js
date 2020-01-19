const express = require('express');
const router = express.Router();

const Post = require('../model/post');
const Product = require('../model/product');
const Producer = require('../model/producer');
const authCheck = require('../middleware/authCheck');

router.get("/", (req, res, next) => {
  Product.list()
    .then(([productsList, metadata]) => {
      res.render('products/index', {
        productsList: productsList
      });
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/showNewForm", authCheck, (req, res, next) => {
  Producer.list()
    .then(([producersList, metadata]) => {
      res.render('products/nowy', {
        pageTitle: "New produkt",
        formAction: "add",
        producersList: producersList,
        product: {}
      });
    })
    .catch(err => {
      console.log(err);
    });

});

router.get("/showEditForm", authCheck, (req, res, next) => {
  var product;
  var id = parseInt(req.query.product_id);

  Product.details(id)
    .then(([productData, metadata]) => {
      product = productData[0];
    })
    .catch(err => {
      console.log(err);
    });

  Producer.list()
    .then(([producersList, metadata]) => {
      res.render('products/nowy', {
        pageTitle: "Edit product",
        formAction: "edit",
        producersList: producersList,
        product: product
      });
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/add", authCheck, (req, res, next) => {
  var producerId = req.body.producent;

  Producer.details(producerId)
    .then(([producerData, metadata]) => {
      const newProduct = new Product(req.body.name,
        req.body.moc,
        req.body.pojemnosc,
        req.body.cena,
        req.body.rate,
        req.body.zdjecie,
        req.body.notatka,
        req.body.opis,
        producerData[0]);

      Product.add(newProduct);
      res.redirect("/products");
    })
    .catch(err => {
      console.log(err);
    });

  
});

router.post("/edit", authCheck, (req, res, next) => {
  var productId = parseInt(req.body.product_id);
  var producerId = req.body.producent;

  Producer.details(producerId)
    .then(([producerData, metadata]) => {

      const editProduct = new Product(req.body.name,
        req.body.moc,
        req.body.pojemnosc,
        req.body.cena,
        req.body.rate,
        req.body.zdjecie,
        req.body.notatka,
        req.body.opis,
        producerData[0],
        productId);
      Product.edit(editProduct);
      res.redirect("/products/showDetails?product_id=" + productId);
    })
    .catch(err => {
      console.log(err);
    });
});


router.get("/showDetails", authCheck, (req, res, next) => {
  var id = parseInt(req.query.product_id);

  Product.details(id)
    .then(([product, metadata]) => {
      res.render('products/details', {
        pageTitle: "Show product",
        formAction: "details",
        product: product[0]
      });
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/delete", authCheck, (req, res, next) => {
  var id = parseInt(req.query.product_id);

  Product.delete(id)
    .then(([product, metadata]) => {
      res.redirect("/products");
    })
    .catch(err => {
      console.log(err);
    });

});

module.exports.route = router;