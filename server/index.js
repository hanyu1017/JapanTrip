const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const { pool, initDB } = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));
app.use(bodyParser.json({ limit: '10mb' })); // Increase limit for image uploads
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// ==================== ITINERARY ENDPOINTS ====================

// Get all days with items
app.get('/api/itinerary', async (req, res) => {
  try {
    const daysResult = await pool.query(
      'SELECT * FROM itinerary_days ORDER BY day ASC'
    );

    const days = await Promise.all(daysResult.rows.map(async (day) => {
      const itemsResult = await pool.query(
        'SELECT * FROM itinerary_items WHERE day_id = $1 ORDER BY time ASC, sort_order ASC',
        [day.id]
      );
      return {
        day: day.day,
        date: day.date,
        title: day.title,
        items: itemsResult.rows.map(item => ({
          id: item.id,
          time: item.time,
          type: item.type,
          title: item.title,
          location: item.location,
          desc: item.description,
          detail: item.detail,
          from: item.from_location,
          to: item.to_location,
          method: item.method,
          duration: item.duration,
          imageUrl: item.image_url
        }))
      };
    }));

    res.json(days);
  } catch (err) {
    console.error('Error fetching itinerary:', err);
    res.status(500).json({ error: 'Failed to fetch itinerary' });
  }
});

// Get single day
app.get('/api/itinerary/:day', async (req, res) => {
  try {
    const dayNum = parseInt(req.params.day);
    const dayResult = await pool.query(
      'SELECT * FROM itinerary_days WHERE day = $1',
      [dayNum]
    );

    if (dayResult.rows.length === 0) {
      return res.status(404).json({ error: 'Day not found' });
    }

    const day = dayResult.rows[0];
    const itemsResult = await pool.query(
      'SELECT * FROM itinerary_items WHERE day_id = $1 ORDER BY time ASC, sort_order ASC',
      [day.id]
    );

    res.json({
      day: day.day,
      date: day.date,
      title: day.title,
      items: itemsResult.rows.map(item => ({
        id: item.id,
        time: item.time,
        type: item.type,
        title: item.title,
        location: item.location,
        desc: item.description,
        detail: item.detail,
        from: item.from_location,
        to: item.to_location,
        method: item.method,
        duration: item.duration,
        imageUrl: item.image_url
      }))
    });
  } catch (err) {
    console.error('Error fetching day:', err);
    res.status(500).json({ error: 'Failed to fetch day' });
  }
});

// Add or update itinerary item
app.post('/api/itinerary/item', async (req, res) => {
  try {
    const { id, day, time, type, title, location, desc, detail, from, to, method, duration, imageUrl } = req.body;

    // Get day_id
    const dayResult = await pool.query(
      'SELECT id FROM itinerary_days WHERE day = $1',
      [day]
    );

    if (dayResult.rows.length === 0) {
      return res.status(404).json({ error: 'Day not found' });
    }

    const dayId = dayResult.rows[0].id;

    if (id) {
      // Update existing item
      await pool.query(
        `UPDATE itinerary_items
         SET time = $1, type = $2, title = $3, location = $4, description = $5,
             detail = $6, from_location = $7, to_location = $8, method = $9, duration = $10, image_url = $11
         WHERE id = $12`,
        [time, type, title, location, desc, detail, from, to, method, duration, imageUrl, id]
      );
      res.json({ message: 'Item updated successfully', id });
    } else {
      // Insert new item
      const newId = `item-${Date.now()}`;
      await pool.query(
        `INSERT INTO itinerary_items
         (id, day_id, time, type, title, location, description, detail, from_location, to_location, method, duration, image_url)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
        [newId, dayId, time, type, title, location, desc, detail, from, to, method, duration, imageUrl]
      );
      res.json({ message: 'Item created successfully', id: newId });
    }
  } catch (err) {
    console.error('Error saving item:', err);
    res.status(500).json({ error: 'Failed to save item' });
  }
});

// Delete itinerary item
app.delete('/api/itinerary/item/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM itinerary_items WHERE id = $1', [id]);
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    console.error('Error deleting item:', err);
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

// ==================== EXPENSE ENDPOINTS ====================

// Get all expenses
app.get('/api/expenses', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM expenses ORDER BY created_at DESC'
    );
    res.json(result.rows.map(row => ({
      id: row.id,
      payer: row.payer,
      amount: row.amount,
      desc: row.description,
      date: row.expense_date
    })));
  } catch (err) {
    console.error('Error fetching expenses:', err);
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
});

// Add expense
app.post('/api/expenses', async (req, res) => {
  try {
    const { payer, amount, desc, date } = req.body;
    const result = await pool.query(
      'INSERT INTO expenses (payer, amount, description, expense_date) VALUES ($1, $2, $3, $4) RETURNING id',
      [payer, amount, desc, date]
    );
    res.json({ message: 'Expense added successfully', id: result.rows[0].id });
  } catch (err) {
    console.error('Error adding expense:', err);
    res.status(500).json({ error: 'Failed to add expense' });
  }
});

// Delete expense
app.delete('/api/expenses/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM expenses WHERE id = $1', [id]);
    res.json({ message: 'Expense deleted successfully' });
  } catch (err) {
    console.error('Error deleting expense:', err);
    res.status(500).json({ error: 'Failed to delete expense' });
  }
});

// ==================== SETTINGS ENDPOINTS ====================

// Get setting
app.get('/api/settings/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const result = await pool.query(
      'SELECT value FROM settings WHERE key = $1',
      [key]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Setting not found' });
    }
    res.json({ key, value: result.rows[0].value });
  } catch (err) {
    console.error('Error fetching setting:', err);
    res.status(500).json({ error: 'Failed to fetch setting' });
  }
});

// Update setting
app.post('/api/settings', async (req, res) => {
  try {
    const { key, value } = req.body;
    await pool.query(
      `INSERT INTO settings (key, value) VALUES ($1, $2)
       ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = CURRENT_TIMESTAMP`,
      [key, value]
    );
    res.json({ message: 'Setting updated successfully' });
  } catch (err) {
    console.error('Error updating setting:', err);
    res.status(500).json({ error: 'Failed to update setting' });
  }
});

// ==================== STATIC FILES & SPA FALLBACK ====================

// Serve static files from the React app (production build)
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, '../client/dist');

  // Serve static files
  app.use(express.static(clientBuildPath));

  // SPA fallback: all other GET requests should return index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

// Initialize database and start server
const startServer = async () => {
  try {
    await initDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
      if (process.env.NODE_ENV === 'production') {
        console.log(`📁 Serving static files from: ${path.join(__dirname, '../client/dist')}`);
      }
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();
