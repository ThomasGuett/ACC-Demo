# Build Stage
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# provide webhook url during build as --build-arg (see start-demo-app.sh)
ARG CAMUNDA_WEBHOOK
ENV REACT_APP_CAMUNDA_WEBHOOK $CAMUNDA_WEBHOOK
RUN npm run build -href ./

# Production Stage
FROM nginx:stable-alpine AS production
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]