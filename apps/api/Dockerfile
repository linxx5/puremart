FROM node:22-alpine
WORKDIR /app
COPY apps/api/package.json ./
RUN npm install --omit=dev
COPY apps/api/dist ./dist
EXPOSE 3001
CMD ["node", "dist/main.js"]
