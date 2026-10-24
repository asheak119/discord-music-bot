FROM node:20

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (ffmpeg-static is already in package.json!)
RUN npm install

# Copy source code
COPY . .

# Run the bot
CMD ["node", "index.js"]
