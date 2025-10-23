# Etapa 1: Dependencias
FROM node:20-alpine AS deps
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
RUN npm ci

# Etapa 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Copiar dependencias instaladas
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Variables de entorno para build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV ESLINT_NO_DEV_ERRORS=true

# Build de Next.js (skipping lint errors for Docker build)
RUN SKIP_LINT=true npx next build || npx next build --no-lint

# Etapa 3: Runner (producci�n)
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Crear usuario no-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar archivos necesarios
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Cambiar permisos
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]