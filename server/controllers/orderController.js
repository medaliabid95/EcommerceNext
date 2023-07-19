const Order = require('../models/order.js');
const User = require('../models/user.js');

// Get all orders
const getAllOrders = (req, res) => {
  Order.findAll({
    include: [User], 
  })
    .then((orders) => {
      res.json(orders);
    })
    .catch((error) => {
      console.error('Error retrieving orders:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
};

const getOne = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findByPk(orderId, {
      include: [User],
    });

    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ error: 'order not found' });
    }
  } catch (error) {
    console.error('Error retrieving order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


// add a new order
const createOrder = (req, res) => {
  const { orderDate, totalAmount, shippingAddress, paymentStatus } = req.body;
  const { UserId } = req.params;

  Order.create({
    orderDate: orderDate,
    totalAmount: totalAmount,
    shippingAddress: shippingAddress,
    paymentStatus: paymentStatus,
    UserId: UserId,
  })
    .then((order) => {
      res.json(order);
    })
    .catch((error) => {
      console.error('Error creating order:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
};


// Update an order
const updateOrder = (req, res) => {
  const orderId = req.params.id;
  const { orderDate, totalAmount, shippingAddress, paymentStatus, UserId } = req.body;

  Order.update(
    {
      orderDate: orderDate,
      totalAmount: totalAmount,
      shippingAddress: shippingAddress,
      paymentStatus: paymentStatus,
      UserId: UserId,
    },
    {
      where: {
        id: orderId,
      },
    }
  )
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('Error updating order:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
};

// Delete an order
const deleteOrder = (req, res) => {
  const orderId = req.params.id;

  Order.destroy({
    where: {
      id: orderId,
    },
  })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('Error deleting order:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
};

module.exports = {
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  getOne
};
