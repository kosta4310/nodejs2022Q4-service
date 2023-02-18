FROM node:18-alpine
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
ENV PORT=4000
VOLUME [ "/src" ]
EXPOSE $Port
CMD [ "npm", "run", "start:dev" ]