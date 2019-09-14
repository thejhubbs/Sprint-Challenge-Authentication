const db = require('../database/dbConfig.js');

module.exports = {
  find,
  findById,
  findByUsername,
  add,
  update,
  remove
};



// - `find()`:
//   - Calling find returns a promise that resolves to an array of all users in the database.
//   - No steps are included.
function find() {
  return db('users');
}

// - `findById(id)`:
//   - Expects a user `id` as its only parameter.
//   - Resolve to a single user object.
//   - On an invalid `id`, resolves to `null`.
function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

function findByUsername(username) {
  return db('users')
    .where({ username })
    .first();
}

// - `add(user)`:
//   - Expects a user object.
//   - Inserts user into the database.
//   - Resolves to the newly inserted user, including `id`.
function add(user) {
  return db('users')
    .insert(user)
    .then(ids => {
      return "Success.";
    });
}

// - `update(changes, id)`:
//   - Expects a changes object and an `id`.
//   - Updates the user with the given id.
//   - Resolves to the newly updated user object.
function update(changes, id) {
  return db('users')
    .where({ id })
    .update(changes);
}

// - `remove(id)`:
//   - Removes the user object with the provided id.
//   - Resolves to the removed user
//   - Resolves to `null` on an invalid id.
//   - (Hint: Only worry about removing the `user`. The database is configured to automatically remove all associated steps.)
function remove(id) {
  return db('users')
    .where('id', id)
    .del();
}
