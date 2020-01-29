const express = require('express');
const router = express.Router();

const Post = require('../model/post');
const Product = require('../model/product');
const User = require('../model/user');

router.get("/showPosts", (req, res, next) => {
    Post.listUserPosts(req.session.loggedUser.id)
        .then(([postsList, metadata]) => {
            res.render('posts/allPosts', {
                pageTitle: "All posts",
                formAction: "listPosts",
                postsList: postsList
            });
        })
        .catch(err => {
            console.log(err);
        });
});

router.get("/showProductPosts", (req, res, next) => {
    var id = parseInt(req.query.product_id);

    Product.details(id)
        .then(([product, metadata]) => {

            Post.listProductPosts(id)
                .then(([postsList, metadata]) => {
                    res.render('posts/productPosts', {
                        pageTitle: "Product posts",
                        formAction: "add",
                        product: product[0],
                        postsList: postsList
                    });
                })
                .catch(err => {
                    console.log(err);
                });

        })
        .catch(err => {
            console.log(err);
        });
});

router.get("/showEditForm", (req, res, next) => {
    var id = parseInt(req.query.post_id);

    Post.details(id)
        .then(([post, metadata]) => {
            res.render('posts/postForm', {
                pageTitle: "Edit post",
                formAction: "edit",
                post: post[0]
            });
        })
        .catch(err => {
            console.log(err);
        });
});

router.post("/edit", (req, res, next) => {
    Post.edit(req.body.post_id, req.body.text);
    res.redirect("/posts/showPosts");
});

router.post("/add", (req, res, next) => {
    var id = parseInt(req.body.product_id);
    var text = req.body.inputPost;

    User.details(req.session.loggedUser.id)
        .then(([userData, metadata]) => {

            Product.details(id)
                .then(([productData, metadata]) => {
                    Post.add(text, userData[0].IdUser, productData[0].IdProduct);
                    res.redirect("/posts/showProductPosts?product_id=" + id);
                })
                .catch(err => {
                    console.log(err);
                });

        })
        .catch(err => {
            console.log(err);
        });
});

router.get("/delete", (req, res, next) => {
    var id = parseInt(req.query.post_id);
    Post.delete(id, req.session.loggedUser.id).then(() => {
            res.redirect("/posts/showPosts");
        })
        .catch(err => {
            console.log(err);
        });
});

module.exports.route = router;