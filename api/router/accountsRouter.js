const express = require('express');
const db = require('../../data/dbConfig');
const router = express.Router();

router.post('/', async (req, res, next) => {
  const body = req.body;

  try {
    const response = await db('accounts');

    // INSERT INTO accounts (name, budget) VALUES (body.name, body.budget);
  } catch (error) {}
});

router.get('/', async (req, res, next) => {
  try {
    const response = await db('accounts');
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
});

module.exports = router;
