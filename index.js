import express from 'express';
import path from 'path';
import { parseByAddress, parseByQueue } from './parser.js';

const app = express();
const PORT = 3000;
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/search_by_address', async (req, res) => {
    try {
        const data = await parseByAddress(req.query.address ?? '');
        res.json(data);
    } catch {
        res.status(500).json({ error: 'API error' });
    }
});

app.get('/search_by_queue', async (req, res) => {
    try {
        const data = await parseByQueue(req.query.queue);
        res.json(data);
    } catch {
        res.status(500).json({ error: 'API error' });
    }
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
