FROM node:18.13

WORKDIR /backend
COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
EXPOSE 3000
