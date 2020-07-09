

var Cart = require('../models/cart');
const meme = require('../models/meme');
const { delete: _delete } = require("../routes");


function auth (req, res, next) {
    if (!req.isAuthenticated()) {
      req.flash('danger', 'You need to login first.');
      return res.redirect('/login');
    }
    next();
  }



module.exports = router => {
  router.get('/add-to-cart/:id',   function(req, res, next){
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});     
    meme.findById(productId, function(err, meme){
        if(err){
          req.flash('Error', 'Meme was not added to the cart');
            return res.redirect('/memes');
        }
        cart.add(meme, productId);
        req.session.cart = cart;
        req.flash('success', 'Meme Was added to the cart successfully');
        console.log(req.session.cart);
        res.redirect('/memes');
    })
});

 router.get('/deleteItem/:id',  function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.deleteItem(productId);
  req.session.cart = cart;
  req.flash('success', 'Meme Was Deleted Successfully');
  res.redirect('/cart/')
 });


router.get('/cart',  function(req, res, next){
    if(!req.session.cart){
      return res.render('cart/cart', {products: null});
    }
    var cart = new Cart(req.session.cart);
    res.render('cart/cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});

});
};



    
  
    
  
  

