const express = require('express');
const router = express.Router();
const path = require('path');
const DiscountService = require(path.join(__dirname, '..', 'services', 'discountService'));

// GET 
router.get('/discount_calc', async (req, res) => {
  try {
    const input = {
      user_id: parseInt(req.query.user_id),
      flight_id: parseInt(req.query.flight_id),
      payment_mode: req.query.payment_mode,
      is_student: req.query.is_student === 'true',
      price: parseFloat(req.query.price)
    };
    
    if (!input.user_id || !input.flight_id || !input.price) {
      return res.json({ 
        message: 'Please provide all required parameters:',
        example: '/api/discount_calc?user_id=1&flight_id=456&payment_mode=HDFC&is_student=true&price=1000'
      });
    }

    const result = await DiscountService.calculateDiscount(input);
    res.json(result);
  } catch (error) {
    console.error('Error calculating discount:', error);
    res.status(error.message.includes('Invalid input') ? 400 : 500)
      .json({ error: error.message || 'Internal server error' });
  }
});

// POST 
router.post('/discount_calc', async (req, res) => {
  try {
    const { user_id, flight_id, payment_mode, is_student, price } = req.body;
    if (!user_id || !flight_id || !price) {
      return res.status(400).json({ 
        error: 'Missing required fields: user_id, flight_id, and price are required' 
      });
    }

    const result = await DiscountService.calculateDiscount(req.body);
    res.json(result);
  } catch (error) {
    console.error('Error calculating discount:', error);
    res.status(error.message.includes('Invalid input') ? 400 : 500)
      .json({ error: error.message || 'Internal server error' });
  }
});

module.exports = router; 