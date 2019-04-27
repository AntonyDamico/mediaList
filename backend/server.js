import express from 'express';
import mysql from 'mysql';
import dotenv from 'dotenv';

import {homeRouter} from './routes/index';

const app = express();

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect(err => {
    if (err) throw err;
});
global.connection = connection;


app.use(express.json());
app.use('/', homeRouter);

// app.get('', (req, res) =>{
//     res.send('it\'s working');
// });


app.listen(3000, () =>{
    console.log('listening in port 3000')
});

