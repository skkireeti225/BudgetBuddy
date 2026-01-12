const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend build in production (Hostinger)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

// Connect to MongoDB if provided; otherwise use an in-memory store
let useInMemory = false;
let Item;
const inMemoryItems = [];

if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => {
      console.log('Mongo connection error:', err);
      console.log('Falling back to in-memory store');
      useInMemory = true;
    });

  // Simple Schema (only if using mongoose)
  const ItemSchema = new mongoose.Schema({ name: String });
  Item = mongoose.model('Item', ItemSchema);
} else {
  console.log('No MONGO_URI provided — using in-memory store');
  useInMemory = true;
}

// Routes
app.get('/items', async (req, res) => {
  if (useInMemory) {
    return res.json(inMemoryItems);
  }

  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

app.post('/items', async (req, res) => {
  if (useInMemory) {
    const newItem = { _id: Date.now().toString(), ...req.body };
    inMemoryItems.push(newItem);
    return res.json(newItem);
  }

  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.json(newItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create item' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));