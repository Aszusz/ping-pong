FROM node:20-alpine AS build
ENV CI=true
RUN corepack enable pnpm
WORKDIR /app
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY packages/db/package.json packages/db/
COPY apps/api/package.json apps/api/
RUN pnpm install --frozen-lockfile
COPY packages/db/ packages/db/
COPY apps/api/ apps/api/
COPY tsconfig.base.json ./
RUN pnpm --filter @ping-pong/api run build

FROM node:20-alpine
ENV CI=true
RUN corepack enable pnpm
WORKDIR /app
COPY --from=build /app ./
RUN pnpm install --frozen-lockfile --prod
EXPOSE 3000
CMD ["node", "apps/api/dist/index.js"]
