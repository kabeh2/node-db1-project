// *****
// Needed if there was no dbConfig file
// *****
// const knex = require('knex');
// const config = require('../../knexfile');
// const db = knex(config.development);

const db = require('../dbConfig');

module.exports = {
  add,
  find,
  findById,
  deleteId,
  updateId,
};

async function add(account) {
  const [id] = await db('accounts').insert(account);
  console.log(id);
  return id;
}

async function find() {
  // what goes inside is table name which is located in migration file
  return await db('accounts');
}

async function findById(id) {
  const [accountId] = await db('accounts').where({ id });
  return accountId;
}

async function deleteId(id) {
  return await db('accounts').where({ id }).del();
}

async function updateId(id, changes) {
  return await db('accounts').where({ id }).update(changes);
}
