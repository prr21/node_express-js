const path = require('path');
const fs = require('fs');
const uuid = require('uuid/v4');

const dataFile = path.join(__dirname, '..', 'data', 'courses.json');

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

    // Сохранить новый курс в data файл
    async save(){
        const courses = await Cours.getAllData();
        courses.push(this.toJSON());

        return new Promise((resolve, reject) => {
            fs.writeFile( dataFile, JSON.stringify(courses),
                (err) => {
                    if (err) {
                        reject(err);
    
                    } else resolve();
                }
            )
        });
    }

    // Получить все курсы из data файла
    static getAllData(){
        return new Promise((resolve, reject) => {

            fs.readFile( dataFile, 'utf-8',
                (err, data) => {
                    if (err) {
                        reject(err)

                    } else resolve( JSON.parse(data) );
                }
            )
            
        })
    }

    // Получить курс по id
    static async getById(id){
        const courses = await Cours.getAllData();

        return courses.find(c => c.id === id);
    }

    // Сохранить редактирование курса
    static async update(cours){
        const courses = await Cours.getAllData();

        const idx = courses.findIndex(c => c.id === cours.id);
        courses[idx] = cours;
        
        return new Promise((resolve, reject) => {
            fs.writeFile( data, JSON.stringify(courses),
                (err) => {
                    if (err) {
                        reject(err);
    
                    } else resolve();
                }
            )
        });
    }
}

module.exports = Cours;