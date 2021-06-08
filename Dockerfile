FROM node:12

#ENV PORT 3000

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source
COPY . /usr/src/app
RUN npm install

EXPOSE 8080

RUN npm run build

CMD [ "npm", "start" ]