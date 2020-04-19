const Cours = require('./courses');
const path = require('path');
const fs = require('fs');

const dataFile = path.join(__dirname, '..', 'data', 'card.json');

class Card {
    static async addToCard(id){
        const card = await Card.getAllCards();
        
        const haveInCard = card.courses.find(c => c.id === id);
        const cours = await Cours.getById(id);

        card.total += +cours.price;

        // Если курса нет в корзине, то добавляем его
        if (!haveInCard){
            card.courses.push(cours);
        }

        return new Promise((resolve, reject) => {
            fs.writeFile( dataFile, JSON.stringify(card),
                (err) => {
                    if (err){
                        reject(err);

                    } else resolve();
                }
            )
        })

    }

    static getAllCards(){
        return new Promise((resolve, reject) => {

            fs.readFile( dataFile, 'utf-8',
                (err, data) => {
                    if(err){
                        reject(err);

                    }   else resolve( JSON.parse(data) )
                }
            )

        })
    }
}

module.exports = Card;