const router = require('express').Router();
const Product = require('../models/Product'); 

router.get('/', async (req, res) => {
  try {
    const products = await Product.find({}, 'name price description productURL'); 
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/bulk', async (req, res) => {
  try {
      const { productIds } = req.body;
      if (!productIds || !Array.isArray(productIds)) {
          return res.status(400).json({ message: 'Invalid product IDs' });
      }

      // Fetch products by their IDs
      const products = await Product.find({ _id: { $in: productIds } });

      res.status(200).json(products);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching products' });
  }
});


module.exports = router;
