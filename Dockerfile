FROM node:latest
WORKDIR /app
RUN npm install
COPY package*.json ./
COPY . .
EXPOSE 80
CMD ["npm", "start"]
