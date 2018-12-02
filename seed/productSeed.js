var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopping', {useNewUrlParser: true } );

var products = [

    new Product({
        imagePath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyvtzuZJI-PLHtoLs1uZenayAJQ184jDF95ELGpLgznv5fGl8iJg',
        title: 'Mens Casual Wear',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet nostrum nesciunt, quidem doloremque numquam temporibus ut optio ipsam! Reprehenderit autem impedit dolore eos doloribus sapiente illo, perferendis assumenda reiciendis, et?',
        price: 10
    }),

    new Product({
        imagePath: 'https://image.shutterstock.com/image-photo/men-mens-shoes-street-city-260nw-411963730.jpg',
        title: 'Mens Casual and Formal footwear',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet nostrum nesciunt, quidem doloremque numquam temporibus ut optio ipsam! Reprehenderit autem impedit dolore eos doloribus sapiente illo, perferendis assumenda reiciendis, et?',
        price: 20
    }),

    new Product({
        imagePath: 'https://ae01.alicdn.com/kf/HTB1IFrdKpXXXXbKXXXXq6xXFXXXp/2015-Autumn-blazer-male-slim-thickening-male-thin-outerwear-blazer-single-fashion.jpg',
        title: 'Mens Blazer',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet nostrum nesciunt, quidem doloremque numquam temporibus ut optio ipsam! Reprehenderit autem impedit dolore eos doloribus sapiente illo, perferendis assumenda reiciendis, et?',
        price: 30
    }),

    new Product({
        imagePath: 'https://oldnavy.gap.com/webcontent/0015/780/282/cn15780282.jpg',
        title: 'Women Business Casual Dress',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet nostrum nesciunt, quidem doloremque numquam temporibus ut optio ipsam! Reprehenderit autem impedit dolore eos doloribus sapiente illo, perferendis assumenda reiciendis, et?',
        price: 10
    }),

    new Product({
        imagePath: 'https://pmcfootwearnews.files.wordpress.com/2017/07/shoes-of-prey.jpg?w=700&h=437&crop=1',
        title: 'Women Dress',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet nostrum nesciunt, quidem doloremque numquam temporibus ut optio ipsam! Reprehenderit autem impedit dolore eos doloribus sapiente illo, perferendis assumenda reiciendis, et?',
        price: 40
    }),
    new Product({
        imagePath: 'https://ae01.alicdn.com/kf/HTB15y.fJFXXXXXwXFXXq6xXFXXXp/2018-New-Fashion-Spring-Women-Blazer-Short-Design-Turn-Down-Collar-Slim-Blazer-Grey-Short-Jacket.jpg_640x640.jpg',
        title: 'Women Blazer',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet nostrum nesciunt, quidem doloremque numquam temporibus ut optio ipsam! Reprehenderit autem impedit dolore eos doloribus sapiente illo, perferendis assumenda reiciendis, et?',
        price: 50
    })

];

var done = 0;

for(var i = 0; i < products.length; i++){
    products[i].save(function(err, result){
        done++;
        if(done === products.length){
            mongoose.disconnect();
        }
    });
}