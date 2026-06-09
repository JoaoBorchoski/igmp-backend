FROM node:20-bookworm-slim

# System Chromium for Puppeteer (avoids the bundled download at install time)
ENV PUPPETEER_SKIP_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium \
    NODE_ENV=production \
    TZ=America/Sao_Paulo

RUN apt-get update && apt-get install -y --no-install-recommends \
      chromium \
      fonts-liberation \
      ca-certificates \
      tzdata \
      dumb-init \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/app

# Install ALL deps (incl. dev) — needed for the TypeScript build and ts-node start.
# NODE_ENV=production would otherwise make npm skip devDependencies.
COPY package.json package-lock.json ./
RUN npm ci --include=dev

COPY . .
RUN npm run build

EXPOSE 3333

# Apply pending migrations, then start the server. A failed migration aborts
# the boot (non-zero exit) so a broken deploy is never promoted.
ENTRYPOINT ["dumb-init", "--"]
CMD ["sh", "-c", "node ./node_modules/typeorm/cli.js migration:run && npm start"]
