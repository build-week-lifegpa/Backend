const moment = require('moment');

const router = require('express').Router();
const Habits = require('./habits-model.js');
const middleware = require('../middleware/middleware.js');
const restrictedMiddleware = require('../auth/restricted-middleware.js');

// get all habits
router.get('/', (req, res) => {
    Habits.find()
        .then(habits => {
            res.json(habits);
        })
        .catch(err => res.send(err));
})

// get habits by user id
router.get('/users/:id', async (req, res) => {


    try {
        const { id } = req.params;
        const habits = await Habits.findByUserId(id)
        console.log("habits", habits);
        let habitIDs = []
        habits.forEach(function (habit) {
            habitIDs.push(habit.habit_id);
        })

        // console.log(habitIDs);
        const distinctHabitIDs = [...new Set(habitIDs)];
        console.log(distinctHabitIDs);

        habitsToReturn = [];

        for (i = 0; i < distinctHabitIDs.length; i++) {
            let tempHabits = []
            habits.forEach(function (habit) {
                if (habit.habit_id === distinctHabitIDs[i]) {
                     tempHabits.push(habit);
                }

                let tempMoment = 0;

                for (j = 0; j < tempHabits.length; j++) {
                    let currentMoment = tempHabits[j].momentjs;
                    if (currentMoment > tempMoment) {
                        habitsToReturn[i] = tempHabits[j];
                    }
                }
            })
        }

        // console.log("habits to return", habitsToReturn);

        for (i = 0; i < habitsToReturn.length; i++) {
            const currentDate = moment().format();
            
            let loggedDate = moment.unix(habitsToReturn[i].momentjs);
            
            loggedDate = moment(loggedDate).format();
            // console.log(currentDate, loggedDate);
            // console.log(moment(currentDate).isSame(moment(loggedDate), 'day'));
            if (moment(currentDate).isSame(moment(loggedDate), 'day')) {
                habitsToReturn[i] = {...habitsToReturn[i], completed_boolean: 1 };
            } else {
                habitsToReturn[i] = {...habitsToReturn[i], completed_boolean: 0 };
            }
        }

        // console.log(habitsToReturn);

        res.status(200).json(habitsToReturn);

    } catch (error) {
        // console.log(error);
        res.status(500).json(error)
    }

    // Habits.findByUserId(id)
    //     .then(habits => {
    //         console.log(habits);
    //         const currentDate = moment().format('X')
    //         res.status(200).json(habits);
    //     })
    //     .catch(err => res.send(err));
})

router.get('/users/:id/grades', restrictedMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const habits = await Habits.findByUserId(id);
        let habitIDs = []
        habits.forEach(function (habit) {
            habitIDs.push(habit.habit_id)
        })

        const distinctHabitIDs = [...new Set(habitIDs)];

        console.log(habits);
        console.log(distinctHabitIDs);
        console.log(habits.length, distinctHabitIDs.length);
        const thirtyDayGrade = (habits.length / distinctHabitIDs.length)/30;
        res.status(200).json({ thirtyDayGrade });
    } catch (error) {
        res.status(500).json(error);
    }

    
})

// get habit dates
router.get('/dates/:id', (req, res) => {
    const { id } = req.params;
    Habits.findHabitDates(id)
        .then(habits => {
            res.status(200).json(habits);
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

    Habits.addHabitDate(id)
        .then(response => {
            res.status(201).json(response);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "The habit date could not be saved." });
        })
})

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