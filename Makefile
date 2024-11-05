.env:
	cp apps/express/.env.example apps/express/.env
	cp apps/hono/.env.example apps/hono/.env
	cp apps/openapi_hono/.env.example apps/openapi_hono/.env

deps:
	make .env
	rm -rf node_modules && rm -rf pnpm-lock.yaml && pnpm install

# Format
fmt:	
	pnpm fmt

# Hono
hrun:
	pnpm -F @apps/hono dev

# OpenAPIHono
ohrun:
	pnpm -F @apps/openapi_hono dev

# Express
erun:
	pnpm -F @apps/express dev

# Prisma
migrate:
	rm -rf packages/prisma/dev.db
	pnpm -F @packages/prisma migrate

# Zod Prisma
generate:
	pnpm -F @packages/prisma generate

# Test
test:
	pnpm -F @packages/domain test

coverage:
	pnpm -F @packages/domain coverage