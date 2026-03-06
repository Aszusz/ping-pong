FROM node:20-alpine

RUN corepack enable pnpm

WORKDIR /app

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY packages/db/package.json packages/db/
COPY apps/api/package.json apps/api/

RUN pnpm install --frozen-lockfile

COPY packages/db/ packages/db/
COPY apps/api/ apps/api/
COPY tsconfig.base.json ./

CMD ["pnpm", "--filter", "@ping-pong/api", "run", "dev"]
