
FROM nginx:alpine

#copy the configuration file
COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
#copy the build artifact
COPY build/www .