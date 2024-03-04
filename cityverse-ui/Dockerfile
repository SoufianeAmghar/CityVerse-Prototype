FROM node:14.18.0-alpine AS build
ENV GENERATE_SOURCEMAP=false
WORKDIR /app
# add the node_modules folder to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# copy package.json file to /app directory for installation prep
COPY package.json package-lock.json ./
RUN npm install
RUN yarn config set "strict-ssl" false -g
COPY . .
# build the app
RUN react-scripts  build
# STAGE 2 - build the final image using a nginx web server
# distribution and copy the react build files
FROM nginx:stable-alpine  
RUN apk --no-cache add gettext
COPY nginx.conf /etc/nginx/nginx.conf.template

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html

CMD /bin/sh -c "export DOLLAR=\"$\" && envsubst < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && cat /etc/nginx/nginx.conf && cat /var/log/nginx/error.log && nginx -g 'daemon off;'"

# Expose the listening port
EXPOSE 80
EXPOSE 443



