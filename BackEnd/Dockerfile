FROM node:alpine

WORKDIR /backend
COPY package*.json ./
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
