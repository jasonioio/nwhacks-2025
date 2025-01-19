const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const app = express();


app.use(cors());
app.use(express.json());

app.post('/analyze', (req, res) => {
    const text = req.body.text;
    const pythonProcess = spawn('python', ['backend/sentiment_analyser.py', text]);

    let pythonOutput = '';
    pythonProcess.stdout.on('data', (data) => {
        pythonOutput += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Error from Python: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        if (code !== 0) {
            res.status(500).json({ error: 'Python script failed' });
        } else {
            res.json({ sentiment: pythonOutput.trim() });
            console.log(`Python script finished with code ${code}`);
            console.log(`Sentiment: ${pythonOutput}`);
        }
    });
});

const port = 3001;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
