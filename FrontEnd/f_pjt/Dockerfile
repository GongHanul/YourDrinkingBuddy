FROM node:19.6.0-alpine3.17 as builder

WORKDIR /frontend
COPY package*.json ./
COPY package-lock.json ./
RUN npm ci
RUN npm install react-scripts@latest -g

COPY . .
RUN npm run build

FROM nginx:1.23.3

RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

COPY --from=builder /frontend/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]