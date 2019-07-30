const db = require('../data/dbConfig.js');

module.exports = {
    add,
    find,
    findById,
    findByUserId,
    remove
};

function find() {
    return db('categories');
}

async function add(category) {
    const [id] = await db('categories').insert(category)
    return findById(id);
}

function findById(id) {
    return db('categories')
        .where({ id })
        .first();
}

function findByUserId(user_id) {
    return db('categories')
        .where('user_id', user_id);
}

function remove(id) {
    return db('categories')
    .where('id', id)
    .del();
}