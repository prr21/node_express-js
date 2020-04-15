const { Router } = require('express');
const Cours = require('../models/courses');
const router = Router();

router.get('/', (req, res) => {
    res.render('add', {
        title: "Добавление",
        isAdd: true
    })
})

router.post('/', async (req, res) => {
    const { title, price, img } = req.body;

    const cours = new Cours(title, price, img);
    await cours.save();

    res.redirect('/courses');
})


module.exports = router;