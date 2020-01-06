const express = require('express');
const router = express.Router();

const Post = require('../model/post');
const Product = require('../model/product');
const User = require('../model/user');

router.get("/showPosts", (req, res, next) => {
    const postsList = Post.listUserPosts(req.session.loggedUser.id);
    res.render('posts/allPosts', {
        pageTitle: "All posts",
        postsList: postsList
    });
});

router.get("/showProductPosts", (req, res, next) => {
    const postsList = Post.list();
    var producPoststList = [];
    var id = parseInt(req.query.product_id);
    var product = Product.list()[id-1];

    for (var i = 0; i < postsList.length; i++) {
        if(postsList[i].product.id == id){
            producPoststList.push(postsList[i]);
        }
    }

    res.render('posts/productPosts', {
        pageTitle: "Product posts",
        formAction: "add",
        product: product,
        postsList: producPoststList
    });
});

router.get("/showEditForm", (req, res, next) => {
    const postsList = Post.list();
    var id = parseInt(req.query.post_id);
    const post = postsList[id - 1];
    res.render('posts/postForm', {
        pageTitle: "Edit post",
        formAction: "edit",
        post: post
    });
});

router.post("/edit", (req, res, next) => {
    Post.edit(req.body.post_id, req.body.text);
    res.redirect("/posts/showPosts");
});

router.post("/add", (req, res, next) => {
    var id = parseInt(req.body.product_id);
    var text = req.body.inputPost;
    var user = User.list()[req.session.loggedUser.id - 1];
    var product =  Product.list()[id-1];
    var post = new Post(text,user,product);
    Post.add(post);
    res.redirect("/posts/showProductPosts?product_id="+id);
});

router.get("/delete", (req, res, next) => {
    var id = parseInt(req.query.post_id);
    const postsList = Post.list();
    if(req.session.loggedUser.id == postsList[id-1].user.id){
        Post.delete(id);
    }
    res.redirect("/posts/showPosts");
});

module.exports.route = router;
