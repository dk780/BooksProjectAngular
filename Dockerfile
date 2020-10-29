FROM node:12.7-alpine as build-step
WORKDIR /Books
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build --prod

FROM nginx:1.17.1-alpine as prod-stage
COPY --from=build-step /Books/dist/Books /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx","-g","daemon off;"]