const categoryDB = require('../categories/category-model.js');
const habitsDB = require('../habits/habits-model.js');
const usersDB = require('../users/users-model.js');

module.exports = {
    validateCategory: function (req, res, next) {
        const categoryInfo = req.body;
        if (
            categoryInfo === undefined ||
            categoryInfo.category_name === undefined ||
            categoryInfo.user_id === undefined
        ) {
            return res.status(400).json({ errorMessage: "Please provide category name and user id." });
        } else {
            next();
        }
    },

    validateHabit: function (req, res, next) {
        const habitInfo = req.body;
        if (
            habitInfo === undefined ||
            habitInfo.habit_text === undefined ||
            habitInfo.user_id === undefined ||
            habitInfo.category_id === undefined
        ) {
            return res.status(400).json({ errorMessage: "Please provide habit text, user id, and category id." });
        } else {
            next();
        }
    },



    validateUser: function (req, res, next) {
        const userInfo = req.body;
        if (
            userInfo === undefined ||
            userInfo.username === undefined ||
            userInfo.password === undefined
        ) {
            return res.status(400).json({ errorMessage: "Please provide username and password." });
        } else {
            next();
        }
    },
}
