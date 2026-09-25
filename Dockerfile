FROM node:18-slim

WORKDIR /app

# sharp needs these for its prebuilt binaries on slim images
RUN apt-get update && apt-get install -y --no-install-recommends libvips-dev && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

RUN mkdir -p uploads/reports logs

EXPOSE 5000
CMD ["node", "server.js"]
