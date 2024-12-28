const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory database
let wasteData = [];

// Routes
app.get('/api/waste', (req, res) => {
  res.json(wasteData);
});

app.post('/api/waste', (req, res) => {
  const { location, amount, description } = req.body;

  if (!location || !amount) {
    return res.status(400).json({ error: 'Location and amount are required' });
  }

  const newWaste = {
    id: wasteData.length + 1,
    location,
    amount,
    description,
  };

  wasteData.push(newWaste);
  res.status(201).json(newWaste);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
