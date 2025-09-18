FROM node:22.16.0-alpine as builder

WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:22.16.0-alpine as runner

WORKDIR /app
COPY package*.json .
RUN npm install --production

COPY --from=builder /app/dist ./dist

ENV NODE_ENV production
ENV PORT 5000
ENV HOST 0.0.0.0
ENV DATABASE_URL postgresql://postgres:postgres@localhost:5432/postgres

EXPOSE 5000

CMD [ "npm", "start" ]
