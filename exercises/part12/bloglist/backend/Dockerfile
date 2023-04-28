FROM node:16

WORKDIR /backend

COPY --chown=node:node . .

RUN npm ci --only=production

USER node

CMD npm start
