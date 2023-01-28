FROM node:18.13

WORKDIR /backend
COPY package*.json ./
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start:prod"]
