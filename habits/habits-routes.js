const moment = require('moment');

const router = require('express').Router();
const Habits = require('./habits-model.js');
const middleware = require('../middleware/middleware.js');


// get all habits
router.get('/', (req, res) => {
    Habits.find()
        .then(habits => {
            res.json(habits);
        })
        .catch(err => res.send(err));
})

// get habits by user id
router.get('/users/:id', (req, res) => {
    const { id } = req.params;

    Habits.findByUserId(id)
        .then(user_habits => {
            res.json(user_habits);
        })
        .catch(err => res.send(err));
})
// add habit
router.post('/', validateHabit, (req, res) => {
    const habitInfo = req.body;
    // console.log(habitInfo)
    Habits.add(habitInfo)
        .then(habit => {
            res.status(201).json(habit);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "The habit could not be saved." });
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Habits.remove(id)
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json({ error: "The habit could not be deleted." });
        })
})

// complete habit for today only using habit ID
router.post('/date/:id', (req, res) => {
    const id = req.params.id;
    // console.log(id);
    // console.log(moment.now());
    // res.status(200).json({ message: "post habit date called correctly" });
    Habits.addHabitDate(id)
        .then(response => {
            res.status(201).json(response);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "The habit date could not be saved." });
        })
})

// moved to stretch
// async function checkIfHabitDoneToday(req, res, next) {
//     next();
// }
// id is habit id
// async function checkIfHabitNotDoneToday(req, res, next) {
// 
// }

// un-complete habit for today only, takes Habit ID
// router.delete('/date/:id', (req, res) => {
//     const { id } = req.params;

// })


function validateHabit(req, res, next) {
    const habitInfo = req.body;
    if (
        habitInfo.habit_text === undefined ||
        habitInfo.category_id === undefined ||
        habitInfo.user_id === undefined
    ) {
        return res.status(400).json({ errorMessage: "Please provide habit_text, user_id, and category_id." });
    } else {
        next();
    }
}

module.exports = router;