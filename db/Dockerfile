FROM mysql:latest
ENV MYSQL_ROOT_PASSWORD 4321
ENV MYSQL_DATABASE my-whisky-house-db
ENV MYSQL_USER admin
ENV MYSQL_PASSWORD 123456

ADD setupDb.sql /docker-entrypoint-initdb.d

EXPOSE 3001