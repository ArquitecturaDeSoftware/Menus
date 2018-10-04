FROM node:8

WORKDIR /menu

COPY package.json .
RUN npm install

COPY . .

ENV PORT 3000
EXPOSE  $PORT

ENV DB_HOST 192.168.99.101
ENV DB_USER root
ENV DB_PASSWORD 1234
ENV DB_NAME almuerzos
ENV DB_PORT 3306

CMD db-migrate db:create almuerzos --config src/config/create-db.json
CMD db-migrate up --config src/config/db-migrate.json -e prod

CMD node src/index.js
