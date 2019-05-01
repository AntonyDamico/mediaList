import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import dotenv from 'dotenv';
import MovieDb from 'moviedb';
import * as Promise from 'bluebird';
import Knex from 'knex';

import {homeRouter, movieDbRoutes, listRoutes, favoriteRoutes} from './routes/index';

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
Promise.promisifyAll(connection);
global.connection = connection;


const knex = Knex({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
});
global.knex = knex;


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/', homeRouter);
app.use('/api', movieDbRoutes, favoriteRoutes);
app.use('/api/list', listRoutes);


app.listen(3000, () => {
    console.log('listening in port 3000')
});

