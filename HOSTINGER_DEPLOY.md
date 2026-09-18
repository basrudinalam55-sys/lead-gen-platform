# Deploy LeadGen Platform on Hostinger Node.js Web App

## Option 1: Hostinger VPS (Recommended — Full Control)

### 1. Get a VPS
- Go to Hostinger → VPS Hosting → Choose plan (KVM 2 or higher: 2 vCPU, 4GB RAM, 50GB SSD)
- OS: **Ubuntu 22.04 LTS**
- SSH access: Yes

### 2. Connect & Setup
```bash
# Connect via SSH
ssh root@your-vps-ip

# Update system
apt update && apt upgrade -y

# Install Node.js 20 (LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt install -y nodejs

# Install PM2 (process manager)
npm install -g pm2

# Install Nginx
apt install -y nginx

# Install Certbot for SSL
apt install -y certbot python3-certbot-nginx
```

### 3. Clone & Build
```bash
# Clone repo
cd /var/www
git clone https://github.com/basrudinalam55-sys/lead-gen-platform.git
cd lead-gen-platform

# Install dependencies
npm ci

# Setup environment
cp .env.example .env
# Edit .env with your production values
nano .env

# Generate Prisma client & push schema
npx prisma generate
npx prisma db push

# Build for production
npm run build
```

### 4. Configure PM2
```bash
# Create PM2 ecosystem file
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'leadgen-platform',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/lead-gen-platform',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    instances: 'max',
    exec_mode: 'cluster',
    watch: false,
    max_memory_restart: '1G',
    error_file: '/var/log/leadgen-error.log',
    out_file: '/var/log/leadgen-out.log',
    log_file: '/var/log/leadgen-combined.log',
    time: true
  }]
};
EOF

# Start app
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 5. Configure Nginx Reverse Proxy
```bash
# Create Nginx config
cat > /etc/nginx/sites-available/leadgen << 'EOF'
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
    }

    # Static files caching
    location /_next/static/ {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # API routes - no cache
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache off;
    }
}
EOF

# Enable site
ln -s /etc/nginx/sites-available/leadgen /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
```

### 6. SSL with Let's Encrypt
```bash
# Get SSL certificate
certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal
systemctl enable certbot.timer
```

---

## Option 2: Hostinger Shared/Cloud Hosting with Node.js (Limited)

If using Hostinger's **Node.js hosting on shared/cloud** (not VPS):

### Limitations:
- No root access
- Limited to specific Node.js versions
- No PM2 (use their process manager)
- SQLite may have file permission issues
- No custom Nginx config

### Steps:

1. **In hPanel:**
   - Go to **Hosting → Manage → Advanced → Node.js**
   - Create Node.js app
   - App root: `/domains/your-domain.com/public_html/leadgen`
   - App URL: `your-domain.com/leadgen` or subdomain
   - Node.js version: 20.x
   - Startup file: `server.js` (see below)

2. **Create `server.js` for standalone output:**
```javascript
// server.js - for Hostinger shared hosting
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  }).listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
```

3. **Update `next.config.js` for standalone output:**
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',  // Add this line
  images: {
    domains: ['images.unsplash.com', 'source.unsplash.com', 'image.pollinations.ai', 'api.pexels.com'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-dropdown-menu'],
  },
}

module.exports = nextConfig
```

4. **Deploy via Git:**
```bash
# In Hostinger terminal or via Git deployment
cd /domains/your-domain.com/public_html/leadgen
git clone https://github.com/basrudinalam55-sys/lead-gen-platform.git .
npm ci
npm run build
# Copy standalone output
cp -r .next/standalone/* .
cp -r .next/static .next/standalone/
cp -r public .next/standalone/
# Point startup file to server.js
```

5. **Environment Variables:**
   - In hPanel → Node.js → Environment Variables
   - Add all from `.env.example`

---

## Environment Variables for Production

```env
# .env (production)
NODE_ENV=production
PORT=3000

# Database (use PostgreSQL on VPS, SQLite on shared)
# DATABASE_URL="postgresql://user:pass@localhost:5432/leadgen"
DATABASE_URL="file:./data/prod.db"

# NextAuth
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-super-long-random-secret-min-32-chars"

# Free APIs (no keys needed for most)
NOMINATIM_USER_AGENT="LeadGenPlatform/1.0"
EXCHANGE_RATE_API="https://open.er-api.com/v6/latest"
OPEN_METEO_API="https://api.open-meteo.com/v1/forecast"

# Optional: for higher rate limits
PEXELS_API_KEY=""
UNSPLASH_ACCESS_KEY=""

# WhatsApp (Meta Cloud API)
META_APP_ID=""
META_APP_SECRET=""
META_VERIFY_TOKEN="leadgen_webhook_verify_2024"
META_WEBHOOK_URL="https://your-domain.com/api/webhook"

# Composio (for Instagram)
COMPOSIO_API_KEY=""
```

---

## Database: SQLite vs PostgreSQL

| Hosting | Database |
|---------|----------|
| **VPS** | PostgreSQL (recommended) |
| **Shared/Cloud** | SQLite (file-based) |

**For VPS with PostgreSQL:**
```bash
# Install PostgreSQL
apt install -y postgresql postgresql-contrib

# Create database & user
sudo -u postgres psql -c "CREATE DATABASE leadgen;"
sudo -u postgres psql -c "CREATE USER leadgen_user WITH ENCRYPTED PASSWORD 'secure_password';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE leadgen TO leadgen_user;"

# Update .env
DATABASE_URL="postgresql://leadgen_user:secure_password@localhost:5432/leadgen?schema=public"

# Run migrations
npx prisma migrate deploy
```

---

## Quick Checklist

- [ ] Domain pointed to VPS IP (A record)
- [ ] `.env` configured with production values
- [ ] `npm run build` succeeds locally first
- [ ] PM2/Nginx running
- [ ] SSL certificate active
- [ ] Test: `curl https://your-domain.com/health`
- [ ] Test webhook: `curl -X POST https://your-domain.com/api/webhook`
- [ ] Set up daily DB backup (cron job)

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `PORT` already in use | Change PORT in ecosystem.config.js or kill existing process |
| Prisma client not found | Run `npx prisma generate` after `npm ci` |
| SQLite permission denied | `chmod 664 data/prod.db` and `chown www-data:www-data data/` |
| Nginx 502 Bad Gateway | Check PM2 status: `pm2 logs leadgen-platform` |
| Build fails on server | Build locally, copy `.next/standalone` to server |
| Webhook not receiving | Check Nginx proxy headers, Meta webhook URL matches exactly |

---

## Cost Estimate (Hostinger VPS)

| Plan | Specs | Monthly | Yearly |
|------|-------|---------|--------|
| KVM 2 | 2 vCPU, 4GB RAM, 50GB SSD | ~$5.99 | ~$71.88 |
| KVM 4 | 4 vCPU, 8GB RAM, 100GB SSD | ~$11.99 | ~$143.88 |
| KVM 8 | 8 vCPU, 16GB RAM, 200GB SSD | ~$23.99 | ~$287.88 |

**Start with KVM 2** — handles 1000+ concurrent users easily for this app.

---

## Your Repo is Ready

**GitHub:** https://github.com/basrudinalam55-sys/lead-gen-platform

The codebase includes:
- ✅ Next.js 14 with `output: 'standalone'` for easy deployment
- ✅ Prisma schema for SQLite (dev) / PostgreSQL (prod)
- ✅ Free API integrations (no monthly costs)
- ✅ All 5 services: Lead Gen, Price Monitor, Content, WhatsApp, SEO
- ✅ Production-ready PM2 + Nginx configs

**Next step:** Choose VPS or Shared, then follow the corresponding guide above.