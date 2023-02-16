FROM node:19.6.0-alpine3.17

WORKDIR /backend
COPY package*.json ./
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
