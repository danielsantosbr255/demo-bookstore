FROM node:22.16.0-alpine AS base
WORKDIR /app

COPY package*.json ./

# -------------------------------------- #

FROM base AS dev
RUN npm install
COPY . .

ENV PORT=5173
ENV NODE_ENV=development

EXPOSE ${PORT}
CMD [ "npm", "run", "dev" ]