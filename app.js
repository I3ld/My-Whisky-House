const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');

const app = express();
const port = 3000;

app.get('/', function(req, res){
   res.redirect("../products");
});

// parsuje dane typu application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//ustawienia sesji
app.use(session({
  //hasło do szyfrowania cookie będącym identyfikatorem sesji
  secret: 'A very very secret password',
  resave: false,
  saveUninitialized: true,
  cookie: {
    //długość sesji w ms
    maxAge: 20 * 60 * 1000 // (20 min)
  }
  //wskazane jest ustawienie magazynu sesji (store) na środowisku produkcyjnym
  //(np baza danych mognodb)
  //domyślny magazyn sesji w pamięci raczej nie będzie zbyt
  //dobrze działał przy większym obiążeniu...
  }));

//Ustawienie mechanizmu komunikatów na stronie, wyświetlanych po przekierowaniu
//z kontrolera na inny widok. Komunikaty są krótkotrwale przetrzymywane w sesji
//użytkownika. Należy ustawić to PO konfiguracji sesji
app.use(flash());

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static('public'));

//domyślnie nie ma dostępu do obiektu sesji w widokach szablonów stron
//poniższa funkcja ustawia zmienne z sesji tak, aby były dostępne w widoku
//ważne aby ustawić PRZED kontrolerami
const pageParamsHelper =  (req, res, next) => {
  res.locals.isUserLoggedIn = req.session.isUserLoggedIn;
  res.locals.loggedUser = req.session.loggedUser;
  next();
};
app.use(pageParamsHelper);

//funkcja sprawdzająca, czy użytkownik jest zalogowany
//bez niej byłoby możliwe wykonanie niedozwolonej akcji przez niezalogowanego użytkownika
//np. wejście na listę użytkowników przez wpisanie odpowiedniego adresu url w przeglądarce
const authCheck = require('./middleware/authCheck');

const productController = require('./controller/productController');
app.use('/products', productController.route);

const postController = require('./controller/postController');
app.use('/posts', authCheck, postController.route);

const userController = require('./controller/userController');
app.use('/users', userController.route);

//kontroler do logowania i wylogowywania użytkowników
const authController = require('./controller/authController');
app.use('/auth', authController.route);

const producerController = require('./controller/producerController');
app.use('/producers', authCheck, producerController.route);

app.listen(port, () => {
    console.log(`->Log: App is listening at port ${port}!`);
});
