FROM node:10-alpine
LABEL maintainer "Ian Harris <iankerriganharris@gmail.com>"

# create app directory
RUN mkdir /app
WORKDIR /app

# install node modules
COPY package.json /app
COPY package-lock.json /app
RUN npm install

# copy local code
COPY . /app

# start dev server
CMD ["npm", "run", "start"]