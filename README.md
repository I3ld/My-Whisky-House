# My-Whisky-House
Message board page - node js webb app about whisky. 

## Description
Moddeled on https://sklep-domwhisky.pl/ and https://swiat-whisky.sklep.pl/ by fan of this pages.  
App contains whisky with details and producers. Provides users authorization like guest who is able to only watching list of products,create new account and User who is able to all other actions like add new products, producers, posts dut to product with simple input validation.

## Requirements

For development, you will need Node.js and Docker.

## Docker
For databse, you will only need docker.

- #### Docker toolbox installation
 Just go on [official Docker website](https://docs.docker.com/toolbox/) and download the installer.
 
 - #### Set up databse
 Just run below commands in CLI docker toolbox to create image and container for mysql databse:
```
cd My-Whisky-House\db
docker build -t my-whisky-house-mysql-image .
docker run -p 3306:3306 --name my-whisky-house-mysql-db -d my-whisky-house-mysql-image
docker logs <hash>
docker exec -it my-whisky-house-mysql-db /bin/bash
mysql -uadmin -p123456
```
### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###

## Install and Run

    $ git clone https://github.com/I3ld/My-Whisky-House.git
    $ cd My-Whisky-House
    $ node app.js
    
Go to: http://localhost:3000/
 
## Visualisation
Screenshots of crucial funnctionality on page: 
- https://ibb.co/TLG00P1
- https://ibb.co/6PpLCgv
- https://ibb.co/hHDNXrV
- https://ibb.co/F86VJRW
- https://ibb.co/SwbwwPm
- https://ibb.co/GWY5vH5
- https://ibb.co/Bj9rv30
- https://ibb.co/kDyp3QZ
