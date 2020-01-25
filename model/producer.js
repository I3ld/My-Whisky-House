const User = require('../model/user');
const Product = require('../model/product');
const db = require('../db/mysql');

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
        return db.execute(
            'insert into Producer (Name, Country, Founded_Date, Owner) values (?, ?, ?, ?)',
            [producer.name, producer.country, producer.dateOfStart, producer.owner]
          );
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
        return db.execute(
            'update Producer set Name = ?, Country = ?, Founded_Date = ?, Owner = ? where idProducer = ?',
            [producer.name, producer.country, producer.dateOfStart, producer.owner, ]
          );
    }
    //usuwanie obiektu po id
    static delete(id) {
        db.execute(
            'update Product set IdProducer = NULL where IdProducer = ?;',
            [id]
          );

        return db.execute(
            'delete from Producer where IdProducer = ?',
            [id]
          );
    }
    //pobieranie obiektu do widoku szczegółów
    //może być potrzebne pobranie dodatkowych danych
    //np. przez złączenia JOIN w relacyjnej bazie danych
    static details(id) {
        return db.execute('select * from Producer where IdProducer = ?',
      [id]
      );
    }
}

module.exports = Producer;