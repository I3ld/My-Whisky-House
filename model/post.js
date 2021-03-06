const User = require('../model/user');
const Product = require('../model/product');
const db = require('../db/mysql');
const validator = require('../public/js/backendValidator');

class Post {
    //parametr id jest na końcu, bo jest opcjonalny
    constructor(text, user, product, id) {
        this.id = id;
        this.text = text;
        this.user = user;
        this.product = product;
    }

    //dodawanie obiektu do bazy
    static add(text, userId, productId) {
        var date = new Date();
        var currentDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0,19);
        if (validator.isValid(text) && validator.isValidId(userId) && validator.isValidId(productId)) {
            return db.execute(
                'insert into Post (Text, Added_Date, IdProduct, IdUser) values (?, ?, ?, ?)',
                [text, currentDate, productId, userId]
            );
        }
    }

    //pobranie listy obiektów
    //metoda nie powinna pobierać nadmiarowych danych
    //(np. przez złączenia JOIN w relacyjnej bazie danych)
    //które nie będą wyświetlane na liście
    static list() {
        return db.execute('select * from Post');
    }

    static listUserPosts(idUser) {
        if (validator.isValidId(idUser)) {
            return db.execute('SELECT Post.IdPost, Post.Text, Post.Added_Date, Users.Picture as UserPicture, Users.IdUser as UserId, Users.FirstName as UserFirstName, Users.LastName as UserLastName, Product.Name as ProductName, Product.Volume as ProductVolume, Product.Capacity as ProductCapacity, Product.Price as ProductPrice FROM Post INNER JOIN Users ON Users.IdUser=Post.IdUser INNER JOIN Product ON Product.IdProduct=Post.IdProduct where Users.IdUser = ?;',
                [idUser]);
        }
    }

    static listProductPosts(idProduct) {
        if (validator.isValidId(idProduct)) {
            return db.execute('select Post.IdPost, Post.Text, Post.Added_Date, Users.FirstName as UserFirstName, Users.LastName as UserLastname, Users.Picture UserPicture, Users.DateOfBirth as UserDateOfBirth from Post LEFT JOIN Users ON Users.IdUser=Post.IdUser where IdProduct = ?;',
                [idProduct]);
        }
    }

    //edycja obiektu
    static edit(id, text) {
        var date = new Date();
        var currentDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0,19);
        if (validator.isValidId(id) && validator.isValid(text)) {
            return db.execute(
                'update Post set Text = ?, Added_Date = ? where IdPost = ?',
                [text, currentDate, id]
            );
        }
    }

    //usuwanie obiektu po id
    static delete(id, userId) {
        if (validator.isValidId(id) && validator.isValidId(userId)) {
            return db.execute(
                'delete from Post where IdPost = ? and IdUser = ?',
                [id, userId]
            );
        }
    }

    //pobieranie obiektu do widoku szczegółów
    //może być potrzebne pobranie dodatkowych danych
    //np. przez złączenia JOIN w relacyjnej bazie danych
    static details(id) {
        if (validator.isValidId(id)) {
            return db.execute('SELECT Post.IdPost, Post.Text, Post.Added_Date, Users.IdUser as UserId, Users.Picture as UserPicture,  Users.FirstName as UserFirstName, Users.LastName as UserLastName, Product.IdProduct as ProductId, Product.Name as ProductName, Product.Volume as ProductVolume, Product.Capacity as ProductCapacity, Product.Price as ProductPrice FROM Post INNER JOIN Users ON Users.IdUser=Post.IdUser  INNER JOIN Product ON Product.IdProduct=Post.IdProduct where Post.IdPost = ?;',
                [id]);
        }
    }
}

module.exports = Post;