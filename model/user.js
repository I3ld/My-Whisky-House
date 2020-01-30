const bcrypt = require('bcryptjs');
const db = require('../db/mysql');
const validator = require('../public/js/backendValidator');

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
      if (validator.isValid(user.firstName)&&
          validator.isValid(user.lastName)&&
          validator.isPasswordValid(user.password)&&
          validator.isEmailValid(user.email)&&
          validator.isPicturePathValid(user.picturePath)   
      ) {
      User.hashPassword(user.password).then( (result) => {
        return db.execute(
          'insert into Users (FirstName, LastName, Password, Email, Picture) values (?, ?, ?, ?, ?)',
          [user.firstName, user.lastName, result, user.email, user.picturePath]
        );
      }).catch(err => {
        console.log(err);
      });
    }
    }

    //pobranie listy obiektów
    //metoda nie powinna pobierać nadmiarowych danych
    //(np. przez złączenia JOIN w relacyjnej bazie danych)
    //które nie będą wyświetlane na liście
    static list() {
      return db.execute('select COUNT(Post.IdPost) as PostsCount, Users.IdUser ,Users.FirstName, Users.LastName, Users.Email, Users.Picture from Users left join Post on Users.IdUser = Post.IdUser group by Users.IdUser, Users.FirstName, Users.LastName, Users.Email, Users.Picture order by Users.IdUser;');
    }

    //edycja obiektu
    static edit(user) {
      if (validator.isValid(user.firstName)&&
          validator.isValid(user.lastName)&&
          validator.isPasswordValid(user.password)&&
          validator.isValid(user.email)&&
          validator.isPicturePathValid(user.picturePath)  &&
          validator.isValidId(user.id) 
      ) {
        User.hashPassword(user.password).then( (result) => {
          return db.execute(
            'update Users set FirstName = ?, LastName = ?, Password = ?, Email = ?, Picture = ? where IdUser = ?',
            [user.firstName, user.lastName, result, user.email, user.picturePath, user.id]
          );
        }).catch(err => {
          console.log(err);
        });
      }
    }

    //usuwanie obiektu po id
    static delete(id) {
      if (validator.isValidId(id)){
        db.execute(
          'delete from Post where IdUser = ?',
          [id]
        );

      return db.execute(
        'delete from Users where IdUser = ?',
        [id]
      );
      }
    }
    //pobieranie obiektu do widoku szczegółów
    //może być potrzebne pobranie dodatkowych danych
    //np. przez złączenia JOIN w relacyjnej bazie danych
    static details(id) {
      if (validator.isValidId(id)){
      return db.execute('select COUNT(Post.IdPost) as PostsCount, Users.IdUser ,Users.FirstName, Users.LastName, Users.Email, Users.Picture from Users left join Post on Users.IdUser = Post.IdUser where Users.IdUser = ? group by Users.IdUser, Users.FirstName, Users.LastName, Users.Email, Users.Picture order by Users.IdUser;',
      [id]
      );
      }
    }
    
    static findByEmail(email) {
      if (validator.isValid(email)){
      return db.execute('select * from Users where Email = ?',
      [email]
      );
      }
    }

    static hashPassword(plainPassword) {
      //wołanie asynchroniczne
      //zwraca promesę, a nie wynik bezpośrednio
      return bcrypt.hash(plainPassword, 12);
    }

    static comparePassword(plainPassword,hashPassword) {
      //wołanie asynchroniczne
      //zwraca promesę, a nie wynik bezpośrednio
      bcrypt.co
      return bcrypt.compare(plainPassword, hashPassword);
    }
}

module.exports = User;
