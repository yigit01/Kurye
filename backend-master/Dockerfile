FROM node:18-bullseye

WORKDIR /app

COPY package*.json ./

# Install build dependencies and clean npm cache
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf node_modules \
    && npm cache clean --force \
    && npm install --legacy-peer-deps \
    && npm uninstall bcrypt \
    && npm install bcrypt \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY . .

RUN npm run build

EXPOSE 4000

CMD ["npm", "run", "start:prod"]
