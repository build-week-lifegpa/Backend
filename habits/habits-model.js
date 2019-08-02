const db = require('../data/dbConfig.js');
const moment = require('moment');

module.exports = {
    add,
    find,
    findById,
    findByUserId,
    remove,
    findHabitDates,
    addHabitDate,
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
        .leftJoin('habit_dates', 'habits.id', 'habit_dates.habit_id')
        .where('user_id', user_id)
}

function remove(id) {
    return db('habits')
        .where('id', id)
        .del();
}

function findHabitDates(id) {
    return db('habit_dates')
        .where('habit_id', id);
}

// addDate takes Habit ID to add entry if no other momentjs with same date
async function addHabitDate(id) {
    // console.log("in addHabitDate");
    const currentDate = moment().format()
    // console.log("current date moment", currentDate);
    // console.log(typeof 'currentDate');
    const newHabitDate = { habit_id: id, momentjs: currentDate }
    return await db('habit_dates').insert(newHabitDate);
}
