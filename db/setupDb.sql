CREATE TABLE Post (
    IdPost integer NOT NULL AUTO_INCREMENT,
    Text varchar(600) NOT NULL,
    IdProduct integer NOT NULL,
    IdUser integer NOT NULL,
    CONSTRAINT Post_pk PRIMARY KEY (IdPost)
);

CREATE TABLE Producer (
    IdProducer integer NOT NULL AUTO_INCREMENT,
    Name varchar(45) NOT NULL,
    Country varchar(30) NOT NULL,
    Founded_Date date NOT NULL,
    Owner varchar(60) NOT NULL,
    CONSTRAINT Producer_pk PRIMARY KEY (IdProducer)
);

CREATE TABLE Product (
    IdProduct integer NOT NULL AUTO_INCREMENT,
    Name varchar(70) NOT NULL,
    Volume varchar(10) NOT NULL,
    Capacity numeric(3,1) NOT NULL,
    Price numeric(9,2) NOT NULL,
    Rate integer NOT NULL,
    Note varchar(350) NOT NULL,
    Description varchar(3000) NOT NULL,
    Picture varchar(200) NOT NULL,
    IdProducer integer NULL,
    CONSTRAINT Product_pk PRIMARY KEY (IdProduct)
);

CREATE TABLE Users (
    IdUser integer NOT NULL AUTO_INCREMENT,
    FirstName varchar(45) NOT NULL,
    LastName varchar(55) NOT NULL,
    Password varchar(80) NOT NULL,
    Email varchar(80) NOT NULL,
    DateOfBirth date NULL,
    Picture varchar(200) NOT NULL,
    CONSTRAINT Users_pk PRIMARY KEY (IdUser)
);

ALTER TABLE Post ADD CONSTRAINT Post_Product FOREIGN KEY Post_Product (IdProduct)
    REFERENCES Product (IdProduct);

ALTER TABLE Post ADD CONSTRAINT Post_Users FOREIGN KEY Post_Users (IdUser)
    REFERENCES Users (IdUser);

ALTER TABLE Product ADD CONSTRAINT Product_Producer FOREIGN KEY Product_Producer (IdProducer)
    REFERENCES Producer (IdProducer);

INSERT INTO Users (Email, FirstName, LastName, Password, DateOfBirth, Picture)
VALUES ('test@gmail.com','Jan', 'Kowalski', '$2a$12$62YB3JPAGwNHaG.Sg.7GX.KQabHMIyXjk/dQpF4JZEQy0vMymRmx6' ,'1999-02-14', 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Stanis%C5%82aw_Piotrowicz_Kancelaria_Senatu_2005.JPG');

INSERT INTO Users (Email, FirstName, LastName, Password, DateOfBirth, Picture)
VALUES ('ann3432@gmail.com','Anna', 'Wiśniewska','$2a$12$62YB3JPAGwNHaG.Sg.7GX.KQabHMIyXjk/dQpF4JZEQy0vMymRmx6','1984-05-22','http://jan.kowalski.mycv.pl/users/k/kowalski4/35_kowalski4.jpg');

INSERT INTO Users (Email, FirstName, LastName, Password, DateOfBirth, Picture)
VALUES ('endriu.12@wp.pl','Andrzej', 'Nowak','$2a$12$62YB3JPAGwNHaG.Sg.7GX.KQabHMIyXjk/dQpF4JZEQy0vMymRmx6','1992-12-04','https://i1.rgstatic.net/ii/profile.image/356210420273152-1461938590529_Q512/Jan_Kowalski59.jpg');

INSERT INTO Producer (Name, Country, Founded_Date, Owner)
VALUES ('Destylarnia Strathisla', 'Wielka Brytania','1786-01-22','John Collins');

INSERT INTO Producer (Name, Country, Founded_Date, Owner)
VALUES ('Pernod Ricard SA', ' Francja','1975-11-08','Pernod Anise');

INSERT INTO Product (Name, Volume, Capacity, Price, Rate, Picture, Note, Description, IdProducer)
VALUES ('Chivas Reagl Ultis',
                        '40',
                        '0.7',
                        '545.65',
                        '8',
                        'https://www.weinquelle.com/fotos/s17227.png',
                        'Chivas Regal Ultis to pierwszy blended malt w historii marki Chivas, powstały z połączenia pięciu single maltów z regionu Speyside: Tormore, Longmorn, Strathisla, Allt ABhainne i Braeval.',
                        'W zapachu i smaku whisky jest świeża, ale posiada także kontrastującą ciepłą nutę korzenną. Można wyczuć aromaty kwiatowe i owocową słodycz.Chivas Regal Ultis to mieszanka, która opiera się na wiedzy i doświadczeniu jej twórców, dlatego zachwyca koneserów whisky na całym świecie.',NULL);

INSERT INTO Product (Name, Volume, Capacity, Price, Rate, Picture, Note, Description, IdProducer)
VALUES ('BALLANTINES THE MILTONDUFF 15YO WHISKY SINGLE MALT', '40', '0.5','207.00','7','https://sklep-domwhisky.pl/pol_pl_Ballantines-The-Miltonduff-15-letni-40-0-7l-14560_1.jpg',
                                'Single Malt z destylarni Miltonduff jest podstawą blendów Ballantine’s, dostarczającą im ciepła i mocy',
                                'Kwiatowe aromaty z subtelną nutą cynamonu otwierają niezwykle łagodną whisky o delikatnym posmaku lukrecji i długim, rozgrzewającym finiszu.',2);

INSERT INTO Product (Name, Volume, Capacity, Price, Rate, Picture, Note, Description, IdProducer)
VALUES ('BALLANTINES BRASIL Z NUTĄ LIMONKI WHISKY', '35', '0.7','59.99','4','http://xenna.com.pl/wp-content/uploads/2014/07/Ballantines-Brasil-682x1024.jpg',
                                'Samba, karnawał w Rio i tradycyjny smak – to wszystko jest na wyciągniecie ręki dzięki zupełnie nowemu Ballantine’s Brasil z dodatkiem limonki. Ta słoneczna nowość dostępna jest już w Propagandzie.',
                                'Radość życia, pasja i optymizm kojarzy nam się z Ameryką Południową. Tam również narodziła się nieznana dotąd w Europie tradycja łączenia alkoholu ze smakiem dojrzewających w południowym słońcu limonek. To niezwykłe połączenie stało się inspiracją do stworzenia zupełnie nowego smaku.Radość życia, pasja i optymizm kojarzy nam się z Ameryką Południową. Tam również narodziła się nieznana dotąd w Europie tradycja łączenia alkoholu ze smakiem dojrzewających w południowym słońcu limonek. To niezwykłe połączenie stało się inspiracją do stworzenia zupełnie nowego smaku.Radość życia, pasja i optymizm kojarzy nam się z Ameryką Południową. Tam również narodziła się nieznana dotąd w Europie tradycja łączenia alkoholu ze smakiem dojrzewających w południowym słońcu limonek. To niezwykłe połączenie stało się inspiracją do stworzenia zupełnie nowego smaku.Radość życia, pasja i optymizm kojarzy nam się z Ameryką Południową. Tam również narodziła się nieznana dotąd w Europie tradycja łączenia alkoholu ze smakiem dojrzewających w południowym słońcu limonek. To niezwykłe połączenie stało się inspiracją do stworzenia zupełnie nowego smaku.Radość życia, pasja i optymizm kojarzy nam się z Ameryką Południową. Tam również narodziła się nieznana dotąd w Europie tradycja łączenia alkoholu ze smakiem dojrzewających w południowym słońcu limonek. To niezwykłe połączenie stało się inspiracją do stworzenia zupełnie nowego smaku.Radość życia, pasja i optymizm kojarzy nam się z Ameryką Południową. Tam również narodziła się nieznana dotąd w Europie tradycja łączenia alkoholu ze smakiem dojrzewających w południowym słońcu limonek. To niezwykłe połączenie stało się inspiracją do stworzenia zupełnie nowego smaku.',1);

                                INSERT INTO Product (Name, Volume, Capacity, Price, Rate, Picture, Note, Description, IdProducer)
VALUES ('HIGHLAND PARK VIKING SCARS 10 YO', '35', '0.7','10.499','9','https://winnicalidla.pl/media/catalog/product/h/i/highland_park_10_yo.png','Highland Park jest jedyną destylarnią gdzie wciąż wiele prac wykonuje się ręcznie przestrzegając pięciu pierwotnych reguł produkcji szkockiej whisky.','Jej smak przepełniają dojrzałe owoce cytrusowe, wanilia i pieprzne przyprawy uzupełnione lekko dymnym aromatem torfu kwiatowego.',1);

INSERT INTO Post (Text, IdProduct, IdUser)
VALUES ('Polecam dobre !',1, 2);

INSERT INTO Post (Text, IdProduct, IdUser)
VALUES ('Polecam dobrev2 !',1, 1);

INSERT INTO Post (Text, IdProduct, IdUser)
VALUES ('Polecam dobrev3 !',1, 1);

INSERT INTO Post (Text, IdProduct, IdUser)
VALUES ('Polecam dobre ! dla 2',2, 2);

INSERT INTO Post (Text, IdProduct, IdUser)
VALUES ('Polecam dobre ! dla 3',3, 3);







