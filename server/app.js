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
    var search = req.query.search ? JSON.parse(req.query.search) : {};

    db.listPhones(search, curPage, recordLimit).then(data => {
        res.send(data);
    });
});

app.get('/info', (req, res) => {
    var search = req.query.search ? JSON.parse(req.query.search) : {};

    db.countPhones(search).then(data => {
        res.send({
            count: data,
            pages: Math.ceil(data / recordLimit),
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

app.get('/facets/:field', (req, res) => {
    db.getFieldValues(req.params.field).then(data => res.send(data));
})

const server = app.listen(serverPort, function() {
    console.log(`Server is up and running on port ${serverPort}`);
});