FROM node:16.7-alpine

WORKDIR /app

# RUN npm install --global pm2

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# FROM nginx:alpine
# COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 4000
CMD [ "npm", "run", "start" ]