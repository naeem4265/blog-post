# Use Node.js 18 Alpine
FROM node:18-alpine

# Create app user (non-root)
RUN addgroup -S app && adduser -S -G app app
WORKDIR /app

# Install dependencies efficiently
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev || npm install --production

# Add source
COPY server.js ./server.js
COPY routes ./routes

# Expose port 5000
EXPOSE 5000

# Add health check
HEALTHCHECK --interval=10s --timeout=3s --retries=6 CMD wget -qO- http://localhost:5000/health >/dev/null || exit 1

USER app
CMD ["node", "server.js"]
