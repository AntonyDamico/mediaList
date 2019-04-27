import express from 'express';
import mysql from 'mysql';
import dotenv from 'dotenv';
import MovieDb from 'moviedb';

import {homeRouter} from './routes/index';

const app = express();

const mdb = MovieDb('eee69ce6312e1412776d537fb8aad84f');
global.mdb = mdb;

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


app.listen(3000, () =>{
    console.log('listening in port 3000')
});

