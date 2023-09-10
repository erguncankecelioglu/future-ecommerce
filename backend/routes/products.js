const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

router.post('/add', async (req, res) => {
    const {name, description, price, stock} = req.body;

    const product = new Product({
        name,
        description,
        price,
        stock,
    });

    await product.save();
    res.json({msg: 'Product added!'});
});

// Other product routes (get, delete, update) can go here

module.exports = router;
