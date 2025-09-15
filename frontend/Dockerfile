# Stage 1: Build React app
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci || npm install
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:1.27-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# Default Nginx conf serves /usr/share/nginx/html on port 80
EXPOSE 80
