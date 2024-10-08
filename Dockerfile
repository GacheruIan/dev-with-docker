FROM node:20-alpine

ENV  MONGO_INITDB_ROOT_USERNAME=admin \
     MONGO_INITDB_ROOT_PASSWORD=password

WORKDIR /home/app

COPY ./myapp .

RUN npm install

CMD ["node", "server.js"]  