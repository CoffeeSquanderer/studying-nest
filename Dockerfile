# Build

FROM node:20-alpine as build

WORKDIR /app

COPY package*.json yarn.lock tsconfig.json tsconfig.build.json ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build


# Production Server

FROM node:20-alpine as prod

WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package*.json yarn.lock ./

ENV NODE_ENV production

COPY --from=build /app/dist dist

RUN yarn --frozen-lockfile --production && yarn cache clean

CMD ["node", "dist/main.js"]

# Possible improvements:
# - no yarn (?)
# - uglify/minify JS (?)