const express = require('express');
const { createClient } = require('redis');
const path = require('path');

const app = express();
const port = 3000;

const redisHost = process.env.REDIS_HOST || 'localhost';
const client = createClient({
    url: `redis://${redisHost}:6379`
});

client.on('error', (err) => console.log('Redis Client Error', err));

async function startServer() {
    try {
        await client.connect();
        console.log('Połączono z Redisem');
    } catch (e) {
        console.log('Brak Redisa - tryb offline');
    }

    app.use(express.static(path.join(__dirname, 'public')));

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });

    app.get('/api/visits', async (req, res) => {
        try {
            const visits = await client.incr('visits');
            res.json({ visits: visits });
        } catch (e) {
            res.json({ visits: 'N/A' });
        }
    });

    app.listen(port, () => {
        console.log(`Aplikacja działa na porcie ${port}`);
    });
}

startServer();