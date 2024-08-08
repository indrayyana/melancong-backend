FROM node:18.17.1
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 7777
CMD [ "npm", "run", "start"]