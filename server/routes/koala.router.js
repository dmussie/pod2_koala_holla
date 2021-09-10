const { application } = require('express');
const express = require('express');
const koalaRouter = express.Router();

const pool = require('../modules/pool');

// DB CONNECTION


// GET
koalaRouter.get('/', (req, res) => {
    const queryText = 'SELECT * FROM "koalas" ORDER BY "name";';
    pool.query(queryText).then(result => {
        res.send(result.rows);
    }).catch(error => {
        console.log('error getting koalas', error);
        res.sendStatus(500);
    });
});

// POST
koalaRouter.post('/', (req, res) => {
    const newKoala = req.body;
    console.log('in koala POST', newKoala);
    const queryText = `
                        INSERT INTO "koalas"
                        ("name", "gender", "age", "ready_to_transfer", "notes")
                        VALUES
                        ($1, $2, $3, $4, $5);
    `; // Passing req.body values through pg
    // anticipating receiving an object from the client POST req
    pool.query(queryText, [
        newKoala.name,
        newKoala.gender,
        newKoala.age,
        newKoala.ready_to_transfer,
        newKoala.notes
    ]).then((result) => { // sending success back to client
        console.log('POST new koala success!');
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error in POST', error);
        res.sendStatus(500);
    });
});

// PUT


// DELETE

module.exports = koalaRouter;