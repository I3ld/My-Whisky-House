const User = require('../model/user');
const Product = require('../model/product');
const db = require('../db/mysql');

//licznik id
let nextId = 1;
//ekstensja klasy (wszystkie obiekty)
const postExtent = [];

class Post {
    //parametr id jest na końcu, bo jest opcjonalny
    constructor(text, user, product, id) {
        this.id = id;
        this.text = text;
        this.user = user;
        this.product = product;
    }

    //dodawanie obiektu do bazy
    static add(text,userId,productId) {
        return db.execute(
            'insert into Post (Text, IdProduct, IdUser) values (?, ?, ?)',
            [text, productId, userId]
          );
    }

    //pobranie listy obiektów
    //metoda nie powinna pobierać nadmiarowych danych
    //(np. przez złączenia JOIN w relacyjnej bazie danych)
    //które nie będą wyświetlane na liście
    static list() {
        return db.execute('select * from Post');
    }

    static listUserPosts(idUser) {
        return db.execute('SELECT Post.IdPost, Post.Text, Users.Picture as UserPicture, Users.IdUser as UserId, Users.FirstName as UserFirstName, Users.LastName as UserLastName, Product.Name as ProductName, Product.Volume as ProductVolume, Product.Capacity as ProductCapacity, Product.Price as ProductPrice FROM Post INNER JOIN Users ON Users.IdUser=Post.IdUser INNER JOIN Product ON Product.IdProduct=Post.IdProduct where Users.IdUser = ?;',
        [idUser]);
    }

    static listProductPosts(idProduct) {
        return db.execute('select Post.IdPost, Post.Text, Users.FirstName as UserFirstName, Users.LastName as UserLastname, Users.Picture UserPicture, Users.DateOfBirth as UserDateOfBirth from Post LEFT JOIN Users ON Users.IdUser=Post.IdUser where IdProduct = ?;',
        [idProduct]);
    }

    //edycja obiektu
    static edit(id,text) {
        return db.execute(
            'update Post set Text = ? where IdPost = ?',
            [text, id]
          );
    }

    //usuwanie obiektu po id
    static delete(id,userId) {
        return db.execute(
            'delete from Post where IdPost = ? and IdUser = ?',
            [id,userId]
          );
    }

    //pobieranie obiektu do widoku szczegółów
    //może być potrzebne pobranie dodatkowych danych
    //np. przez złączenia JOIN w relacyjnej bazie danych
    static details(id) {
        return db.execute('SELECT Post.IdPost, Post.Text, Users.IdUser as UserId, Users.Picture as UserPicture,  Users.FirstName as UserFirstName, Users.LastName as UserLastName, Product.IdProduct as ProductId, Product.Name as ProductName, Product.Volume as ProductVolume, Product.Capacity as ProductCapacity, Product.Price as ProductPrice FROM Post INNER JOIN Users ON Users.IdUser=Post.IdUser  INNER JOIN Product ON Product.IdProduct=Post.IdProduct where Post.IdPost = ?;',
      [id]);
    }

    //metoda resetuje stan bazy i dodaje rekordy testowe
    //przydatna do testów
    static initData() {
        //usuwamy zawartość tablicy
        postExtent.splice(0, Post.length);
        //resetujemy licznik id
        nextId = 1;
        Post.add(new Post('Polecam dobre !',User.list()[0], Product.list()[1]));
        Post.add(new Post('Polecam dobrev2 !',User.list()[0], Product.list()[0]));
        Post.add(new Post('Polecam dobrev3 !',User.list()[0], Product.list()[0]));
        Post.add(new Post('Polecam dobre ! dla 2',User.list()[1], Product.list()[1]));
        Post.add(new Post('Polecam dobre ! dla 3',User.list()[2], Product.list()[2]));
    }
}

//Post.initData();

module.exports = Post;