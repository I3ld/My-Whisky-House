const User = require('../model/user');
const Product = require('../model/product');

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
        producer.id = nextId;
        producerExtent.push(producer);
        nextId++;
        return producer;
    }
    //pobranie listy obiektów
    //metoda nie powinna pobierać nadmiarowych danych
    //(np. przez złączenia JOIN w relacyjnej bazie danych)
    //które nie będą wyświetlane na liście
    static list() {
        return producerExtent;
    }
    //edycja obiektu
    static edit(producer) {
        var id = parseInt(producer.id);
        producerExtent[id-1] = producer;
    }
    //usuwanie obiektu po id
    static delete(id) {
        var index = parseInt(id-1);
        producerExtent.splice(index, 1);
        nextId--;

        //po usunieciu trzebaobioznnoyc idwkazymprodukcie inext id
        for (var i = 0; i < producerExtent.length; i++) {
            producerExtent[i].id = i+1;
        }
    }
    //pobieranie obiektu do widoku szczegółów
    //może być potrzebne pobranie dodatkowych danych
    //np. przez złączenia JOIN w relacyjnej bazie danych
    static details(id) {
        const producer = producerExtent[id - 1];
        return producer;
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

Producer.initData();

module.exports = Producer;