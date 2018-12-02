const express = require('express');
const router = express.Router();

var Order = require('../models/order');
var Shopping = require('../models/shopping');
var passport = require('passport');

/* This routing is used to identify whether the user is logged in or not */
router.get('/profile', userInside,function(req, res, next){
    Order.find({user: req.user}, function (err, orders){ //Here 'user' field is taken from the User model
        if(err){
            return res.write('Sorry! Error Occured');
        }
        var shopping;
        orders.forEach(function(order){
            shopping = new Shopping(order.shopping);
            order.items = shopping.shoppingArr();
        });
        res.render('user/profile',{orders: orders});
    });
});

router.get('/logout', userInside, function(req, res, next){
    req.logout();
    res.redirect('/');
});

router.use('/', userOutside, function(req, res, next){
   next();
});

/* GET Signup page. */
router.get('/signup', function(req, res, next){
    var messages = req.flash('error');
    res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/signup', passport.authenticate('local.signup', {
    failureRedirect: '/user/signup',
    failureFlash: true
}), function(req, res, next){
    if(req.session.prevUrl){
        var prevUrl = req.session.prevUrl;
        req.session.prevUrl = null;
        res.redirect(prevUrl);

    }
    else{
        res.redirect('/user/profile');
    }
});



/* GET Signup page */
router.get('/login', function(req, res, next){
    var messages = req.flash('error');
    res.render('user/login', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/login', passport.authenticate('local.signin', {
    failureRedirect: '/user/login',
    failureFlash: true
}), function(req, res, next){
    if(req.session.prevUrl){
        var prevUrl = req.session.prevUrl;
        req.session.prevUrl = null;
        res.redirect(prevUrl);
    }
    else{
        res.redirect('/user/profile');
    }
});


module.exports = router;

//Creating Protecting Middleware.

function userInside(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

function userOutside(req, res, next){
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}
