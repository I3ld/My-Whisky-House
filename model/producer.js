const User = require('../model/user');
const Product = require('../model/product');
const db = require('../db/mysql');

//licznik id
let nextId = 1;
//ekstensja klasy (wszystkie obiekty)
const producerExtent = [];

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
    //metoda resetuje stan bazy i dodaje rekordy testowe
    //przydatna do testów
    static initData() {
        //usuwamy zawartość tablicy
        producerExtent.splice(0, Producer.length);
        //resetujemy licznik id
        nextId = 1;
        Producer.add(new Producer('Destylarnia Strathisla', 'Wielka Brytania','22-01-1786','John Collins'));
        Producer.add(new Producer('Pernod Ricard SA', ' Francja','08-11-1975','Pernod Anise'));
    }
}

//Producer.initData();

module.exports = Producer;