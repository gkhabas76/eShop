const express = require('express');
const router = express.Router();

var Shopping = require('../models/shopping');

var passport = require('passport');

var Product = require('../models/product');
var Order = require('../models/order');

/* GET home page. */
router.get('/', function(req, res, next) {
    var successMsg = req.flash('success')[0];
    Product.find(function(err, docs){
        var productChunks = [];
        var chunkSize = 3;
        for (var i = 0; i < docs.length; i += chunkSize) {
            productChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('index', { title: 'Shopping Cart', products: productChunks, successMsg: successMsg, noMessage: !successMsg });
    });

});

router.get('/shop/:id', function(req, res, next){
    var productId = req.params.id;
    var shopping = new Shopping(req.session.shopping ? req.session.shopping : {});

    Product.findById(productId, function(err, product){
        if (err){
            return res.redirect('/');
        }
        shopping.add(product, product.id);
        req.session.shopping = shopping;
        console.log(req.session.shopping);
        res.redirect('/');
    });
});


/* GET Shopping List */
router.get('/shoppingList', function(req, res, next){
   if(!req.session.shopping){
       return res.render('shoppingList', {products:null});
   }
   var shopping = new Shopping(req.session.shopping);
   res.render('shoppingList', {products:shopping.shoppingArr(), totalPrice:shopping.totalPrice});
});

/* Creating the Buy route */
router.get('/buy', userInside, function(req, res, next){
    if(!req.session.shopping){
        res.redirect('/shoppingList', {products:null});
    }
    var shopping = new Shopping(req.session.shopping);
    var errMsg = req.flash('error')[0];
    res.render('buy', {total: shopping.totalPrice, csrfToken: req.csrfToken(), errMsg: errMsg, noError: !errMsg});
});

/* Using Stripe for payment */
router.post('/buy', userInside, function(req, res, next){
    if(!req.session.shopping){
        return res.redirect('/shoppingList', {products:null});
    }
    var shopping = new Shopping(req.session.shopping);

    var stripe = require("stripe")("sk_test_2oiX3qGHeqycWqqrfk6Br9Yg");

    stripe.charges.create({
        amount: shopping.totalPrice*100,
        currency: "usd",
        source: req.body.stripeToken, // obtained with Stripe.js
        description: "Charge"
    }, function(err, charge) {
        if(err){
            req.flash('error', err.message);
            return res.redirect('/buy');
        }
         var order = new Order({
             user: req.user,
             shopping: shopping,
             address: req.body.address,
             name: req.body.name,
             paymentId: charge.id
         });
        order.save(function(err, result){
            req.flash('success', 'Your products have been sent to shipping');
            req.session.shopping = null;
            res.redirect('/');
        });

    });
});

module.exports = router;

function userInside(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.session.prevUrl = req.url;
    res.redirect('/user/login');
}