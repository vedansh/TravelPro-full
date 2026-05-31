FROM node:22-alpine
WORKDIR /app
COPY server/package*.json ./
RUN npm ci --omit=dev
COPY server/index.js .
EXPOSE 8002
CMD ["node", "index.js"]
