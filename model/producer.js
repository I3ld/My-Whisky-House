const User = require('../model/user');
const Product = require('../model/product');
const db = require('../db/mysql');
const validator = require('../public/js/backendValidator');

class Producer {
    //parametr id jest na końcu, bo jest opcjonalny
    constructor(name, country, dateOfStart, owner, id) {
        this.id = id;
        this.name = name;
        this.country = country;
        this.dateOfStart = dateOfStart;
        this.owner = owner;
    }

    //dodawanie obiektu do bazy
    static add(producer) {
        if (validator.isValid(producer.name) &&
            validator.isValid(producer.country) &&
            validator.isDateValid(producer.dateOfStart) &&
            validator.isValid(producer.owner)
        ) {
            return db.execute(
                'insert into Producer (Name, Country, Founded_Date, Owner) values (?, ?, ?, ?)',
                [producer.name, producer.country, producer.dateOfStart, producer.owner]
            );
        }
    }

    //pobranie listy obiektów
    //metoda nie powinna pobierać nadmiarowych danych
    //(np. przez złączenia JOIN w relacyjnej bazie danych)
    //które nie będą wyświetlane na liście
    static list() {
        return db.execute('select * from Producer');
    }

    //edycja obiektu
    static edit(producer) {
        if (validator.isValid(producer.name) &&
            validator.isValid(producer.country) &&
            validator.isDateValid(producer.dateOfStart) &&
            validator.isValid(producer.owner) &&
            validator.isValidId(producer.id)
        ) {
            return db.execute(
                'update Producer set Name = ?, Country = ?, Founded_Date = ?, Owner = ? where IdProducer = ?',
                [producer.name, producer.country, producer.dateOfStart, producer.owner, producer.id]
            );
        }
    }

    //usuwanie obiektu po id
    static delete(id) {
        if (validator.isValidId(id)) {
            db.execute(
                'update Product set IdProducer = NULL where IdProducer = ?;',
                [id]
            );

            return db.execute(
                'delete from Producer where IdProducer = ?;',
                [id]
            );
        }
    }

    //pobieranie obiektu do widoku szczegółów
    //może być potrzebne pobranie dodatkowych danych
    //np. przez złączenia JOIN w relacyjnej bazie danych
    static details(id) {
        if (validator.isValidId(id)) {
            return db.execute('select * from Producer where IdProducer = ?',
                [id]
            );
        }
    }
}

module.exports = Producer;