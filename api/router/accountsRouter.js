const express = require('express');
const Accounts = require('../../data/models/dbHelpers');
const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const response = await Accounts.add(req.body);

    if (!response)
      return res
        .status(404)
        .json({ error: 'No account info provided to add.' });

    // INSERT INTO accounts (name, budget) VALUES (body.name, body.budget);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/:id', async (req, res, next) => {
  const { id } = req.params;
  const changes = req.body;

  // Validate update queries
  const allowedUpdates = ['name', 'budget'];
  const updates = Object.keys(req.body);

  const validUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!validUpdate) return res.status(404).json({ error: 'Invalid update.' });

  try {
    const response = await Accounts.updateId(id, changes);

    if (!response)
      return res.status(404).json({ error: 'User does not exist!' });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: 'Error updating user on the server.' });
  }
});

router.get('/', async (req, res, next) => {
  try {
    const response = await Accounts.find();
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const response = await Accounts.findById(req.params.id);

    if (!response)
      return res.status(404).json({ error: 'Account does not exist!' });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving account from server.' });
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const response = await Accounts.deleteId(req.params.id);

    if (!response)
      return res.status(404).json({ error: 'Account does not exist!' });

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Issue deleting account on server.' });
  }
});

module.exports = router;
