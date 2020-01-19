const Producer = require('../model/producer');
const db = require('../db/mysql');

//licznik id
let nextId = 1;
//ekstensja klasy (wszystkie obiekty)
const productExtent = [];

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
            'update Product set Name = ?, Volume = ?, Capacity = ?, Price = ?, Rate = ?, Picture = ?, Note = ?, Description = ? where IdProduct = ?',
            [product.name, product.value, product.capacity, product.price, product.rate, product.picturePath, product.note, product.description, product.id]
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
    //metoda resetuje stan bazy i dodaje rekordy testowe
    //przydatna do testów
    static initData() {
        //usuwamy zawartość tablicy
        productExtent.splice(0, Product.length);
        //resetujemy licznik id
        nextId = 1;
        Product.add(new Product('Chivas Reagl Ultis',
                                '40',
                                '0,7',
                                '545,65',
                                '8',
                                'https://www.weinquelle.com/fotos/s17227.png',
                                'Chivas Regal Ultis to pierwszy blended malt w historii marki Chivas, powstały z połączenia pięciu single maltów z regionu Speyside: Tormore, Longmorn, Strathisla, Allt ABhainne i Braeval.',
                                'W zapachu i smaku whisky jest świeża, ale posiada także kontrastującą ciepłą nutę korzenną. Można wyczuć aromaty kwiatowe i owocową słodycz.Chivas Regal Ultis to mieszanka, która opiera się na wiedzy i doświadczeniu jej twórców, dlatego zachwyca koneserów whisky na całym świecie.'));

        Product.add(new Product('BALLANTINES THE MILTONDUFF 15YO WHISKY SINGLE MALT', '40', '0,5','207,00','7','https://sklep-domwhisky.pl/pol_pl_Ballantines-The-Miltonduff-15-letni-40-0-7l-14560_1.jpg',
                                'Single Malt z destylarni Miltonduff jest podstawą blendów Ballantine’s, dostarczającą im ciepła i mocy',

                                'Kwiatowe aromaty z subtelną nutą cynamonu otwierają niezwykle łagodną whisky o delikatnym posmaku lukrecji i długim, rozgrzewającym finiszu.',Producer.list()[1]));

        Product.add(new Product('BALLANTINES BRASIL Z NUTĄ LIMONKI WHISKY', '35', '0,7','59,99','4','http://xenna.com.pl/wp-content/uploads/2014/07/Ballantines-Brasil-682x1024.jpg',
                                'Samba, karnawał w Rio i tradycyjny smak – to wszystko jest na wyciągniecie ręki dzięki zupełnie nowemu Ballantine’s Brasil z dodatkiem limonki. Ta słoneczna nowość dostępna jest już w Propagandzie.'
                                ,'Radość życia, pasja i optymizm kojarzy nam się z Ameryką Południową. Tam również narodziła się nieznana dotąd w Europie tradycja łączenia alkoholu ze smakiem dojrzewających w południowym słońcu limonek. To niezwykłe połączenie stało się inspiracją do stworzenia zupełnie nowego smaku.Radość życia, pasja i optymizm kojarzy nam się z Ameryką Południową. Tam również narodziła się nieznana dotąd w Europie tradycja łączenia alkoholu ze smakiem dojrzewających w południowym słońcu limonek. To niezwykłe połączenie stało się inspiracją do stworzenia zupełnie nowego smaku.Radość życia, pasja i optymizm kojarzy nam się z Ameryką Południową. Tam również narodziła się nieznana dotąd w Europie tradycja łączenia alkoholu ze smakiem dojrzewających w południowym słońcu limonek. To niezwykłe połączenie stało się inspiracją do stworzenia zupełnie nowego smaku.Radość życia, pasja i optymizm kojarzy nam się z Ameryką Południową. Tam również narodziła się nieznana dotąd w Europie tradycja łączenia alkoholu ze smakiem dojrzewających w południowym słońcu limonek. To niezwykłe połączenie stało się inspiracją do stworzenia zupełnie nowego smaku.Radość życia, pasja i optymizm kojarzy nam się z Ameryką Południową. Tam również narodziła się nieznana dotąd w Europie tradycja łączenia alkoholu ze smakiem dojrzewających w południowym słońcu limonek. To niezwykłe połączenie stało się inspiracją do stworzenia zupełnie nowego smaku.Radość życia, pasja i optymizm kojarzy nam się z Ameryką Południową. Tam również narodziła się nieznana dotąd w Europie tradycja łączenia alkoholu ze smakiem dojrzewających w południowym słońcu limonek. To niezwykłe połączenie stało się inspiracją do stworzenia zupełnie nowego smaku.',Producer.list()[0]));

        Product.add(new Product('HIGHLAND PARK VIKING SCARS 10 YO', '35', '0,7','10,499','9','https://winnicalidla.pl/media/catalog/product/h/i/highland_park_10_yo.png','Highland Park jest jedyną destylarnią gdzie wciąż wiele prac wykonuje się ręcznie przestrzegając pięciu pierwotnych reguł produkcji szkockiej whisky.','Jej smak przepełniają dojrzałe owoce cytrusowe, wanilia i pieprzne przyprawy uzupełnione lekko dymnym aromatem torfu kwiatowego.',Producer.list()[1]));
    }
}

//Product.initData();

module.exports = Product;