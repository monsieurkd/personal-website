# syntax=docker/dockerfile:1
#
# Multi-stage build: each FROM is a disposable layer. We install deps and build
# in heavy stages, then copy ONLY the production output into a tiny final image.
# Result: a ~150MB image instead of ~1GB, and nothing irrelevant ships.
#
# This image is the "complete spec": OS (alpine) + runtime (Node 20) + your code
# + your dependencies, all pinned. Whatever runs here runs identically on your
# boss's machine, in CI, and in production, because it is the same sealed box.

# ---- Stage 1: install dependencies ----
FROM node:20-alpine AS deps
WORKDIR /app
# Copy only manifests first so this layer is cached unless deps change.
COPY package.json package-lock.json ./
RUN npm ci

# ---- Stage 2: build the app ----
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# output: "standalone" in next.config.mjs makes this emit .next/standalone
RUN npm run build

# ---- Stage 3: production runner (lean) ----
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Next.js standalone output needs these three pieces copied separately:
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
# server.js is the entry point produced by standalone output
CMD ["node", "server.js"]
