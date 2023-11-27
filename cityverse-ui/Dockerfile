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
FROM nginx:1.21.6-alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80