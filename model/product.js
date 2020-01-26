const Producer = require('../model/producer');
const db = require('../db/mysql');

class Product {
    //parametr id jest na końcu, bo jest opcjonalny
    constructor(name, value, capacity, price, rate, picturePath, note, description,  producer, id) {
        this.id = id;
        this.name = name;
        this.value = value;
        this.capacity = capacity;
        this.price = price;
        this.rate = rate;
        this.picturePath = picturePath;
        this.description = description;
        this.note = note;
        this.producer = producer;
    }

    //dodawanie obiektu do bazy
    static add(product) {
        return db.execute(
            'insert into Product (Name, Volume, Capacity, Price, Rate, Picture, Note, Description, IdProducer) values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [product.name, product.value, product.capacity, product.price, product.rate, product.picturePath, product.note, product.description, product.producer.IdProducer]
          );
    }
    //pobranie listy obiektów
    //metoda nie powinna pobierać nadmiarowych danych
    //(np. przez złączenia JOIN w relacyjnej bazie danych)
    //które nie będą wyświetlane na liście

    static list() {
        return db.execute('select * from Product');
    }

    //edycja obiektu
    static edit(product) {
        return db.execute(
            'update Product set Name = ?, Volume = ?, Capacity = ?, Price = ?, Rate = ?, Picture = ?, Note = ?, Description = ?, IdProducer = ? where IdProduct = ?',
            [product.name, product.value, product.capacity, product.price, product.rate, product.picturePath, product.note, product.description, product.producer.IdProducer, product.id]
          );
    }
    //usuwanie obiektu po id
    static delete(id) {
        db.execute(
            'delete from Post where IdProduct = ?',
            [id]
          );

        return db.execute(
            'delete from Product where IdProduct = ?',
            [id]
          );
    }

    //pobieranie obiektu do widoku szczegółów
    //może być potrzebne pobranie dodatkowych danych
    //np. przez złączenia JOIN w relacyjnej bazie danych
    static details(id) {
        return db.execute('SELECT Product.IdProduct, Product.Name, Product.Volume, Product.Capacity,  Product.Price, Product.Rate, Product.Note, Product.Description, Product.Picture, Producer.IdProducer as ProducerIdProducer, Producer.Name as ProducerName, Producer.Country as ProducerCountry, Producer.Founded_Date as ProducerFounded_Date, Producer.Owner as ProducerOwner FROM Product LEFT JOIN Producer ON Product.IdProducer=Producer.IdProducer where Product.IdProduct = ?;',
      [id]
      );
    }
}

module.exports = Product;