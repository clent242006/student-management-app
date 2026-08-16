FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

# Create a dedicated persistent data directory
RUN mkdir -p /app/data && chown -R node:node /app

# Persist student data across container restarts/removals
VOLUME /app/data

# Run as non-root user
USER node

EXPOSE 3000

CMD ["npm", "start"]