import express from 'express';

const app = express();

app.get('', (req, res) =>{
    res.send('it\'s working');
});

export default app;
