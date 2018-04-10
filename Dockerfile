FROM node:alpine

RUN apk update && apk add imagemagick ffmpeg ttf-liberation
RUN npm install pm2@latest -g

WORKDIR /bot

ADD package.json .
RUN npm install

ADD . /bot

CMD pm2 start --interpreter ./node_modules/.bin/babel-node . && pm2 logs