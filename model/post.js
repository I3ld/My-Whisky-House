const User = require('../model/user');
const Product = require('../model/product');

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
    static add(post) {
        post.id = nextId;
        postExtent.push(post);
        nextId++;
        return post;
    }

    //pobranie listy obiektów
    //metoda nie powinna pobierać nadmiarowych danych
    //(np. przez złączenia JOIN w relacyjnej bazie danych)
    //które nie będą wyświetlane na liście
    static list() {
        return postExtent;
    }

    static listUserPosts(idUser) {
        var posts = [];
        for (var i = 0; i < postExtent.length; i++) {
            if(postExtent[i].user.id == idUser){
                posts.push(postExtent[i]);
            }
        }
        return posts;
    }

    //edycja obiektu
    static edit(id,text) {
        const post = postExtent[id - 1];
        post.text = text;
    }

    //usuwanie obiektu po id
    static delete(id) {
        var index = parseInt(id)-1;
        postExtent.splice(index, 1);
        nextId--;
        //po usunieciu trzebaobioznnoyc idwkazymprodukcie inext id
        for (var i = 0; i < postExtent.length; i++) {
            postExtent[i].id = i+1;
        }
    }

    static deleteProductPosts(productId) {
        var toDelete = [];
        for (var i = 0; i < postExtent.length; i++) {
            if(postExtent[i].product.id == productId){
                toDelete.push(postExtent[i].id);
            }
        }

        for(var i = 0; i < toDelete.length; i++){
            postExtent.splice((toDelete[i]-1), 1);
            nextId--;
        }

        for (var i = 0; i < postExtent.length; i++) {
                postExtent[i].id = i+1;
        }
    }

    //pobieranie obiektu do widoku szczegółów
    //może być potrzebne pobranie dodatkowych danych
    //np. przez złączenia JOIN w relacyjnej bazie danych
    static details(id) {
        const post = postExtent[id - 1];
        return post;
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

Post.initData();

module.exports = Post;