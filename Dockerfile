#FROM node:15 as builder
FROM node:15

# Create app directory
WORKDIR /var/www/app

COPY package.json ./
COPY package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build
RUN npm run generate

ENV HOST '0.0.0.0'

CMD [ "npm", "start" ]


#FROM node:15-alpine
#
#WORKDIR /var/www/app
#
#ADD package.json ./
#ADD nuxt.config.js ./
#COPY --from=builder /var/www/app/node_modules /var/www/app/node_modules
#COPY --from=builder /var/www/app/.nuxt /var/www/app/.nuxt
#COPY --from=builder /var/www/app/dist /var/www/app/dist
#COPY --from=builder /var/www/app/static /var/www/app/static
#COPY --from=builder /var/www/app/store /var/www/app/store
#COPY --from=builder /var/www/app/tsconfig.json /var/www/app/tsconfig.json
#
#ENV HOST '0.0.0.0'
#
#CMD [ "npm", "start" ]

