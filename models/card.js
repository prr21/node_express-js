const Cours = require('./courses');
const path = require('path');
const fs = require('fs');

const dataFile = path.join(__dirname, '..', 'data', 'card.json');

class Card {
    static async addToCard(id){
        const card = await Card.getAllCards();
        
        const idx = card.courses.findIndex(c => c.id === id);
        let candidate = card.courses[idx];

        // Если курса нет в корзине, то добавляем его
        if (!candidate){
            candidate = await Cours.getById(id);
            candidate.count = 1;
            card.courses.push(candidate);
            
        } else candidate.count++

        card.total += +candidate.price;

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

    static async remove(id){
        const card = await Card.getAllCards();
        const cours = card.courses.find(c => c.id === id);

        if (cours.count == 1) {
            // Убрать элемент с корзины
            card.courses = card.courses.filter(c => c.id !== id);
            console.log(card)

        } else cours.count--

        card.total -= +cours.price;

        return new Promise((resolve, reject) => {
            fs.writeFile(dataFile, JSON.stringify(card),
                (err)=> {
                    if (err){
                        reject(err);

                    } else resolve(card)
                })
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