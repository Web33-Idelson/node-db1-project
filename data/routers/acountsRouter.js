const express = require('express');

const db = require("../dbConfig.js");

const router = express.Router();

router.get('/', (req, res) => {
    db.select('*')
    .from('accounts')
    .then(accounts => {
        res.status(200).json({ data: accounts})
    })
    .catch(error => {
        res.status(500).json({ message: error.message })
    })
})

router.get('/:id', (req, res) => {
    const {id} = req.params;

    db('accounts')
    .where({id})
    .then(accounts => {
        if(accounts.length){
            res.json(accounts);
        } else {
            res.status(404).json({ message: 'Could not find accounts with given ID'})
        }
    })
    .catch(error => {
        res.status(500).json({ message: 'Failed to get accounts'})
    })
})

router.post('/', (req, res) => {
    const account = req.body;
    db("accounts")
    .insert(account)
    .returning('id')
    .then((ids) => {
        res.status(201).json({ inserted: ids })
    })
    .catch(error => {
        res.status(500).json({ message: error.message })
    })
})

router.put('/:id', (req, res) => {
    const changes = req.body;
    const accountID = req.params.id;

    db('accounts')
    .where({id: accountID})
    .update(changes)
    .then((count) => {
        if(count){
            res.status(200).json({ message: 'updated successfully'})
        } else {
            res.status(404).json({ message: 'not found'})
        }
    })
    .catch(error => {
        res.status(500).json({ message: error.message })
    })
})

router.delete('/:id', (req, res) => {
    const accountID = req.params.id;

    db('accounts')
    .where({id: accountID})
    .del()
    .then((count) => {
        if(count){
            res.status(200).json({ message: 'removed succesfully'})
        } else {
            res.status(404).json({ message: 'not found'})
        }
    })
    .catch(error => {
        res.status(500).json({ error: error.message })
    })
})

module.exports = router;