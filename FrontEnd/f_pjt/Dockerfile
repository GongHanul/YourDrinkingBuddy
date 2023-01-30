FROM node:alpine

WORKDIR /frontend
COPY package*.json ./
RUN npm install
RUN npm install react-scripts@latest -g

COPY . .
RUN npm run build

FROM nginx:latest

RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

COPY ./build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]