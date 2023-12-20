# Development

FROM node:20-alpine as dev

WORKDIR /app

ENV NODE_ENV dev

COPY . .

RUN yarn --frozen-lockfile


# Production Build

FROM node:20-alpine as build

WORKDIR /app
RUN apk add --no-cache libc6-compat

ENV NODE_ENV production

# In order to run `yarn build` we need access to the Nest CLI, which is a dev dependency
COPY --from=dev /app/node_modules ./node_modules

COPY . .

RUN yarn build

RUN yarn --frozen-lockfile --production && yarn cache clean


# Production Server

FROM node:20-alpine as prod

WORKDIR /app
RUN apk add --no-cache libc6-compat

ENV NODE_ENV production

COPY --from=build /app/dist dist
COPY --from=build /app/node_modules node_modules

CMD ["node", "dist/main.js"]