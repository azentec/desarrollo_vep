# stage1 as builder
FROM node:14.15.3 as nodebuilder
EXPOSE 80

RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN npm install
RUN npm install -g @angular/cli@11.0.5
COPY . /usr/src/app
RUN ng build --prod --aot=true

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=nodebuilder /usr/src/app/dist/. /usr/share/nginx/html
ENTRYPOINT ["nginx", "-g", "daemon off;"]