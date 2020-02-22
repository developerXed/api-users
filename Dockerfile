FROM node:10
WORKDIR /api-users
COPY package.json /api-users
RUN npm install
COPY . /api-users
CMD npm start
EXPOSE 3000

