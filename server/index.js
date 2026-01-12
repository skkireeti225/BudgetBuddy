const express = require('express');
const fs = require('fs').promises;
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

// Use a simple file-backed JSON store so Hostinger doesn't need MongoDB
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'items.json');

async function ensureDataFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(DATA_FILE);
    } catch (e) {
      await fs.writeFile(DATA_FILE, '[]', 'utf8');
    }
  } catch (err) {
    console.error('Failed to ensure data file:', err);
  }
}

async function readItems() {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    console.error('readItems error:', err);
    return [];
  }
}

async function writeItems(items) {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2), 'utf8');
  } catch (err) {
    console.error('writeItems error:', err);
  }
}

ensureDataFile();

// Routes
app.get('/items', async (req, res) => {
  const items = await readItems();
  res.json(items);
});

app.post('/items', async (req, res) => {
  const items = await readItems();
  const newItem = { id: Date.now().toString(), ...req.body };
  items.push(newItem);
  await writeItems(items);
  res.json(newItem);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));