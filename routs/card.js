const { Router } = require('express');
const Card = require('../models/card.js')
const router = Router();

router.post('/add', async (req, res) => {
    await Card.addToCard(req.body.id);
    res.redirect('/card');

});

router.get('/', async (req, res) => {
    const card = await Card.getAllCards();
    
    res.render('card', {
        title: 'Корзина',
        courses: card.courses,
        total: card.total
    })
});

router.delete('/remove/:id', async (req, res) => {
    const card = await Card.remove(req.params.id);
    
    res.json(card);
})

module.exports = router;