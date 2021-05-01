### STAGE 1: Build ###
FROM node:14-alpine AS build
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn run build:ssr

### STAGE 2: Run ###
FROM node:14-alpine
RUN apk --no-cache add curl
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist/cacombos ./dist/cacombos

EXPOSE 4000

USER node

CMD ["node", "dist/cacombos/server/main.js"]

HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost:4000/health_check || exit 1