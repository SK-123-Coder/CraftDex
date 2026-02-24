# ---------- Stage 1: Build Client ----------
FROM node:20-alpine AS client-builder

WORKDIR /app/client

COPY client/package*.json ./
RUN npm install

COPY client .
RUN npm run build


# ---------- Stage 2: Run Server ----------
FROM node:20-alpine

WORKDIR /app

COPY server/package*.json ./
RUN npm install

COPY server .

# copy React build output
COPY --from=client-builder /app/client/dist ./dist

EXPOSE 3000

CMD ["npm", "start"]