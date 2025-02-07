const express = require('express');
const discountRoutes = require('./routes/discountRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Add CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Routes
app.use('/api', discountRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 






// curl -X POST http://localhost:3001/api/discount_calc \
// -H "Content-Type: application/json" \
// -d '{
//   "user_id": 1,
//   "flight_id": 456,
//   "payment_mode": "HDFC",
//   "is_student": true,
//   "price": 1000
// }'
