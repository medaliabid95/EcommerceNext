const Rating = require('../models/rating');
const User = require('../models/user.js');


// Find all ratings
const getAllRating = async (req, res) => {
    try {
      const ratings = await Rating.findAll();
      res.status(200).json(ratings);
    } catch (error) {
      console.error('Error while finding all ratings:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const getOneWithUser = async (req, res) => {
    try {
      const { UserId } = req.params;
      const ratings = await Rating.findAll({
        where: { UserId },
        include: [User],
      });
  
      if (ratings.length > 0) {
        res.status(200).json(ratings);
      } else {
        res.status(404).json({ error: 'No ratings found for the given UserId' });
      }
    } catch (error) {
      console.error('Error retrieving ratings:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  // Create a new rating
  const AddRating = async (req, res) => {
    try {
      const { rating, review } = req.body;
      const { UserId , productId } = req.params;
      const newRating = await Rating.create({ rating, review,UserId,productId });
      res.status(201).json(newRating);
    } catch (error) {
      console.error('Error while creating a rating:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  // Update a rating
  const updateRating = async (req, res) => {
    try {
      const { id } = req.params;
      const { rating, review } = req.body;
  
      const existingRating = await Rating.findByPk(id);
      if (!existingRating) {
        return res.status(404).json({ error: 'Rating not found' });
      }
  
      await existingRating.update({ rating, review });
  
      res.status(200).json(existingRating);
    } catch (error) {
      console.error('Error while updating a rating:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  // Delete a rating
  const deleteRating =  (req, res) => {
    const ratingId = req.params.id;

  Rating.destroy({
    where: {
      id: ratingId,
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
    getAllRating,
    AddRating,
    updateRating,
    deleteRating,
    getOneWithUser
  };