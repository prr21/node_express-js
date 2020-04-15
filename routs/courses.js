const { Router } = require('express');
const router = Router();
const Cours = require('../models/courses');

router.get('/', async (req, res) => {
    const courses = await Cours.getAllData();

    res.render('courses', {
        title: "Курсы",
        isCourses: true,
        courses
    })
})

router.get('/:id', async (req, res) => {
    const cours = await Cours.getById(req.params.id);
    
    res.render('cours', {
        layout: 'empty',
        title: `Курс по ${cours.title}`,
        cours
    })
})

module.exports = router;