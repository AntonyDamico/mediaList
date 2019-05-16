import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import dotenv from 'dotenv';
import MovieDb from 'moviedb';
import Knex from 'knex';
import path from 'path';
import session from 'express-session';

import {
    homeRouter, movieDbRoutes, listRoutes, favoriteRoutes,
    ratingRoutes, mediaRoutes, authRoutes
} from './backend/routes';

const app = express();

const mdb = MovieDb('eee69ce6312e1412776d537fb8aad84f');
global.mdb = mdb;

dotenv.config();

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

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
console.log(__dirname);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/', homeRouter);
app.use('/media', mediaRoutes);
app.use('/api', movieDbRoutes, favoriteRoutes, ratingRoutes);
app.use('/api/list', listRoutes);


app.listen(3000, () => {
    console.log('listening in port 3000')
});

