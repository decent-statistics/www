FROM oven/bun:1.0.0 as base

FROM base AS development-dependencies-env
COPY . /app
WORKDIR /app
RUN bun install

FROM base AS production-dependencies-env
COPY ./package.json bun.lockb /app/
WORKDIR /app
RUN bun install --production

FROM base AS build-env
COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN bun run build

FROM base
COPY ./package.json bun.lockb /app/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
WORKDIR /app
CMD ["bun", "run", "start"]
