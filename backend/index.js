const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/analyze', (req, res) => {
    const text = req.body.text;
    // Perform sentiment analysis or other processing here
    res.json({ sentiment: 'positive' });
});

const port = 3001;
app.listen(port, () => {
    console.log("Server running on port ${port}");
});
