const path = require('path');
const fs = require('fs');
const uuid = require('uuid/v4');

class Cours {
    constructor(title, price, img){
        this.title = title,
        this.price = price,
        this.img = img,
        this.id = uuid()
    }

    toJSON(){
        return {
            title: this.title,
            price: this.price,
            img: this.img,
            id: this.id
        }
    }

    async save(){
        const courses = await Cours.getAllData();
        courses.push(this.toJSON());

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courses),
    
                (err) => {
                    if (err) {
                        reject(err);
    
                    } else resolve();
                }
            )
        })

    }

    static getAllData(){
        return new Promise((resolve, reject) => {

            fs.readFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                'utf-8',

                (err, data) => {
                    if (err) {
                        reject(err)

                    } else resolve( JSON.parse(data) );
                }
            )
            
        })
    }

    static async getById(id){
        const courses = await Cours.getAllData();

        return courses.find(c => c.id === id);
    }
}

module.exports = Cours;