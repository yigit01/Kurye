# Stage 1: Build stage
FROM node:20-bullseye AS builder

WORKDIR /app

# Önce paket dosyalarını kopyala
COPY package*.json ./

# Build dependencies'ini kur
RUN apt-get update && \
    apt-get install -y python3 make g++

# Dependencies'leri kur ve cache'i temizle
RUN npm install --legacy-peer-deps --include=dev && \
    npm cache clean --force

# Tüm kaynak kodunu kopyala
COPY . .

# Production build oluştur
RUN npm run build

# Stage 2: Production image
FROM node:20-bullseye-slim

WORKDIR /app

# Sadece production dependencies'leri kopyala
COPY package*.json ./
RUN npm install --legacy-peer-deps --omit=dev && \
    npm cache clean --force

COPY --from=builder /app/dist ./dist

# Port ve çalıştırma komutu
EXPOSE 4000

# Node.js uygulamasını production modunda çalıştır
ENV NODE_ENV=production
CMD ["node", "dist/main"]
