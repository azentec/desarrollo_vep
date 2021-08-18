FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY ./. /usr/share/nginx/html
COPY ./nginx.conf /etc/nginxnx/conf.d/default.conf
ENTRYPOINT ["nginx", "-g", "daemon off;"]