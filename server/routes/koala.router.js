const { Router } = require('express');
const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION


// GET
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "koalas" ORDER BY "name";';
    pool.query(queryText).then(result => {
        res.send(result.rows);
    }).catch(error => {
        console.log('error getting koalas', error);
        res.sendStatus(500);
    });
});

// POST


// PUT


// DELETE

module.exports = koalaRouter;