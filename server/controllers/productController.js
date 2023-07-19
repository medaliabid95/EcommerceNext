const Product = require('../models/product.js');
const User = require('../models/user.js');

const cloudinary = require("../database/cloudConfig.js")

// Get all products

const getAllProducts = (req, res) => {
  Product.findAll({
    include: [User], 
  })
    .then((products) => {
      res.json(products);
    })
    .catch((error) => {
      console.error('Error retrieving products:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
};
const getOne = async (req, res) => {
  try {
    const { UserId } = req.params;
    const products = await Product.findAll({
      where: { UserId },
      include: [User],
    });

    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ error: 'No products found for the given UserId' });
    }
  } catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Create a new product
const createProduct = async (req, res) => {
    const { name, description, price, stock, imageUrl } = req.body;
    const { UserId } = req.params;

    try {
      const uploadResult = await cloudinary.uploader.upload(imageUrl, {
        folder: "ecomphone"
      });
  
      const newProduct = await Product.create({
        name: name,
        description: description,
        price: price,
        stock: stock,
        imageUrl: uploadResult.secure_url,
        UserId: UserId,
      });
  
      res.json(newProduct);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
    console.log(imageUrl);
  };



// Update a product
const updateProduct = (req, res) => {
  const productId = req.params.id;
  const { name, description, price, stock, imageUrl,userId } = req.body;

  Product.update(
    {
      name: name,
      description: description,
      price: price,
      stock: stock,
      imageUrl: imageUrl,
      userId: userId
    },
    {
      where: {
        id: productId,
      },
    }
  )
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('Error updating product:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
};

// Delete a product
const deleteProduct = (req, res) => {
  const productId = req.params.id;

  Product.destroy({
    where: {
      id: productId,
    },
  })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('Error deleting product:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getOne
};

