FROM node:8

WORKDIR /menu

COPY package.json .

RUN npm install -g db-migrate
RUN npm install

COPY . .

ENV PORT 3000
EXPOSE  $PORT

ENV DB_HOST 192.168.99.101
ENV DB_USER root
ENV DB_PASSWORD 1234
ENV DB_NAME lunch
ENV DB_PORT 3306

CMD node src/index.js

//COPY entrypoint.sh /entrypoint.sh
//RUN chmod +x /entrypoint.sh
