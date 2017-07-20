import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { serverPort } from '../etc/config.json';
import { recordLimit } from '../etc/config.json';

import * as db from './utils/DataBaseUtils';

// Initialization of express application
const app = express();

// Set up connection of database
db.setUpConnection();

// Using bodyParser middleware
app.use(bodyParser.json());

// Allow requests from any origin
app.use(cors({ origin: '*' }));

// RESTful api handlers
app.get('/phones', (req, res) => {
    var curPage = req.query.page ? req.query.page : 1;

    db.listPhones(curPage, recordLimit).then(data => {
        res.send(data);
    });
});

app.get('/info', (req, res) => {
    db.countPhones().then(data => {
        res.send({
            count: data,
            pages: data / recordLimit,
            recordLimit: recordLimit
        });
    });
});

app.get('/phones/:id', (req, res) => {
    db.getPhone(req.params.id).then(data => res.send(data));
});

app.post('/phones', (req, res) => {
    db.createPhone(req.body).then(data => res.send(data));
});

app.delete('/phones/:id', (req, res) => {
    db.deletePhone(req.params.id).then(data => res.send(data));
});

const server = app.listen(serverPort, function() {
    console.log(`Server is up and running on port ${serverPort}`);
});