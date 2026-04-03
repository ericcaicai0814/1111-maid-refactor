# 07 — Deployment View

> **狀態**：✅ 已確認

---

## Dockerfile

Multi-stage build，`node:22-alpine`，`output: 'standalone'`。

```dockerfile
# --- Build stage ---
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

# --- Production stage ---
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
```

**設計重點**：
- Build stage 有完整 `node_modules`（含 devDeps），production stage 只有 runtime 必要檔案
- `output: 'standalone'` 只打包必要的 `node_modules`，最終 image 約 80–120MB（vs 完整 `node_modules` 的 500MB+）
- Alpine 基於 musl libc，base image 約 50MB（vs Debian 的 350MB+）

## Nginx 配置

```nginx
location /foreign-domestic-helper-under-12/ {
    proxy_pass http://maid-app:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
}
```

> Nginx 同時提供 SSL termination、gzip/brotli 壓縮、靜態資源快取。安全 Headers 見 [08-crosscutting.md](./08-crosscutting.md)。

## 環境對照表

| 環境 | Runner | DB | 用途 |
|------|--------|----|------|
| development | 本地 `npm run dev` | 本地 PostgreSQL | 開發 |
| staging | `frontend-docker-staging` (#39) | `maid_staging` | 測試驗收 |
| production | `frontend-docker-production` (#40) | `maid_production` | 正式上線 |

## Container

| 項目 | 值 |
|------|-----|
| Container 名稱 | `maid-app` |
| Port | 3000 |
| Base image | `node:22-alpine` |
| Next.js output | `standalone` |
| basePath | `/foreign-domestic-helper-under-12` |

## CI Pipeline 流程

```
npm install → prisma generate → npm run build → docker build → deploy
```

沿用 ewill-web 的 frontend Docker runners（staging #39、production #40）。
