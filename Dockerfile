FROM node:21.4.0

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

COPY entrypoint.sh ./
RUN chmod +x entrypoint.sh

EXPOSE 3005

ENTRYPOINT ["./entrypoint.sh"]