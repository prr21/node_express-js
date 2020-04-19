const { Router } = require('express');
const Card = require('../models/card.js')
const router = Router();

router.post('/', async (req, res) => {
    await Card.addToCard(req.body.id);
    
    const card = await Card.getAllCards();

    res.render('card', {
        title: 'Корзина',
        card
    })
});

module.exports = router;