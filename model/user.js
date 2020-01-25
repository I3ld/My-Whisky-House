const bcrypt = require('bcryptjs');
const db = require('../db/mysql');

//licznik id
let nextId = 1;
//ekstensja klasy (wszystkie obiekty)
const userExtent = [];

class User {
    //parametr id jest na końcu, bo jest opcjonalny
    constructor(email, firstName, lastName, picturePath, password, id) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.picturePath = picturePath;
    }

    //dodawanie obiektu do bazy
    static add(user) {

      return db.execute(
        'insert into Users (FirstName, LastName, Password, Email, Picture) values (?, ?, ?, ?, ?)',
        [user.firstName, user.lastName, user.password, user.email, user.picturePath]
      );
    }

    //pobranie listy obiektów
    //metoda nie powinna pobierać nadmiarowych danych
    //(np. przez złączenia JOIN w relacyjnej bazie danych)
    //które nie będą wyświetlane na liście
    static list() {
      return db.execute('select * from Users');
    }
    //edycja obiektu
    static edit(user) {
      return db.execute(
        'update Users set FirstName = ?, LastName = ?, Password = ?, Email = ?, Picture = ? where IdUser = ?',
        [user.firstName, user.lastName, user.password, user.email, user.picturePath, user.id]
      );
    }

    //usuwanie obiektu po id
    static delete(id) {
      return db.execute(
        'delete from Users where IdUser = ?',
        [id]
      );
    }
    //pobieranie obiektu do widoku szczegółów
    //może być potrzebne pobranie dodatkowych danych
    //np. przez złączenia JOIN w relacyjnej bazie danych
    static details(id) {
      return db.execute('select * from Users where IdUser = ?',
      [id]
      );
    }
    
    static findByEmail(email) {
      return db.execute('select * from Users where Email = ?',
      [email]
      );
    }

    static hashPassword(plainPassword) {
      //wołanie asynchroniczne
      //zwraca promesę, a nie wynik bezpośrednio
      return bcrypt.hash(plainPassword, 12);
    }

    static comparePassword(plainPassword,userId) {
      //wołanie asynchroniczne
      //zwraca promesę, a nie wynik bezpośrednio
      var flag;
      db.execute('select Password from Users where IdUser = ?',
      [userId]).then( ([data, metadata]) => { 
        var rows = JSON.parse(JSON.stringify(data[0]));
        flag = bcrypt.compare(plainPassword, rows.Password);
      })
      .catch(err => {
        console.log(err);
      });
      return true;
    }
}

module.exports = User;
