require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/api/:date?', (req, res) => {
    const { date } = req.params;

    // No date provided, return current timestamp
    if (!date) {
        const now = new Date();
        return res.json({
            unix: now.getTime(),
            utc: now.toUTCString(),
        });
    }

    // Handle both UNIX timestamp and ISO date formats
    const parsed = /^\d+$/.test(date) ? new Date(Number(date)) : new Date(date);

    if (isNaN(parsed.valueOf())) {
        return res.status(400).json({ error: 'Invalid Date' });
    }

    return res.json({
        unix: parsed.getTime(),
        utc: parsed.toUTCString(),
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
