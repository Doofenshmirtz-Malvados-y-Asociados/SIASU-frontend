# Build
FROM node:18 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Prod
FROM nginx:alpine
COPY --from=build /app/dist/siasu-angular-app/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

# Expose the NGINX port
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
