FROM node:14-alpine

RUN apk --no-cache add yarn git 

RUN yarn global add @angular/cli