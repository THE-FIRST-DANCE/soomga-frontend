# Builder stage
FROM node:18-alpine AS builder

ENV VITE_APP_SERVE_MODE='exhibition'

WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# Production stage
FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/dist /var/www/html
COPY --from=builder /app/dist /etc/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]