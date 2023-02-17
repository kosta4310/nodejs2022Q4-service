FROM node18:18-alpine
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
ENV PORT=4000
EXPOSE $Port
CMD [ "npm", "run", "start:dev" ]