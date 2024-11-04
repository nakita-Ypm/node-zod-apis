deps:
	rm -rf node_modules && rm -rf pnpm-lock.yaml && pnpm install

fmt:	
	pnpm fmt

hrun:
	pnpm -F @apps/hono dev

ohrun:
	pnpm -F @apps/openapi_hono dev

erun:
	pnpm -F @apps/express dev

migrate:
	pnpm -F @packages/prisma migrate