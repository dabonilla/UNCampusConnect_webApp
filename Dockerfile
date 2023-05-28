FROM node:16
WORKDIR /app
COPY . .
RUN npm install --production
ENV API_GATEWAY_URL=127.0.0.1
ENV API_GATEWAY_PORT=5000
RUN npm run build

CMD ["npm", "run","start"]
