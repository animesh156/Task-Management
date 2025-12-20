FROM node:20-alpine

WORKDIR /app

# Install deps first
COPY package*.json ./
COPY prisma ./prisma

RUN npm install

# Copy source
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build TypeScript
RUN npm run build

EXPOSE 5367

CMD ["npm", "run", "start"]
