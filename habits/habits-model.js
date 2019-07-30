const db = require('../data/dbConfig.js');

module.exports = {
    add,
    find,
    findById,
    findByUserId,
    remove
};

function find() {
    return db('habits');
}

async function add(habit) {
    const [id] = await db('habits').insert(habit)
    return findById(id);
}

function findById(id) {
    return db('habits')
        .where({ id })
        .first();
}

function findByUserId(user_id) {
    return db('habits')
        .where('user_id', user_id)
        ;
}

function remove(id) {
    return db('habits')
    .where('id', id)
    .del();
}