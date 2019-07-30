const router = require('express').Router();
const Categories = require('./category-model.js');
const middleware = require('../middleware/middleware.js');


// get all
router.get('/', (req, res) => {
    Categories.find()
        .then(categories => {
            res.json(categories);
        })
        .catch(err => res.send(err));
})

// get by user id
router.get('/users/:id', (req, res) => {
    const { id } = req.params;

    Categories.findByUserId(id)
        .then(user_categories => {
            res.json(user_categories);
        })
        .catch(err => res.send(err));
})
// add category
router.post('/', middleware.validateCategory, (req, res) => {
    const categoryInfo = req.body;
    Categories.add(categoryInfo)
        .then(category => {
            res.status(201).json(category);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "The category could not be saved." });
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Categories.remove(id)
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json({ error: "The category could not be deleted." });
        })
})

module.exports = router;