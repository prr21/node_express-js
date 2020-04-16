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

router.get('/:id/edit', async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/courses')
    }
    const cours = await Cours.getById(req.params.id);
    
    res.render('cours-edit', {
        title: `Редактирование ${cours.title}`,
        cours
    })
})

router.post('/edit', async (req, res) => {
    await Cours.update(req.body);

    res.redirect('/courses');
})

module.exports = router;