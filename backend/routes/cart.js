const express = require('express');
const User = require('../models/User');
const Product = require('../models/Product');

const router = express.Router();

router.post('/add-to-cart/:userId', async (req, res) => {
    const {userId} = req.params;
    const {productId} = req.body;

    const user = await User.findById(userId);
    const product = await Product.findById(productId);

    if (!user || !product) return res.status(404).json({msg: 'User or product not found'});

    user.cart.push({product: productId});
    await user.save();

    res.json({msg: 'Added to cart!'});
});

router.post('/checkout/:userId', async (req, res) => {
    const {userId} = req.params;

    const user = await User.findById(userId).populate('cart.product');

    if (!user) return res.status(404).json({msg: 'User not found'});

    // Do checkout logic here (e.g., inventory checks, payment processing)
    user.cart = [];
    await user.save();

    res.json({msg: 'Checkout successful!'});
});

module.exports = router;
