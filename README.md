# SUNU YARAMA — Frontend

Next.js 15 + TypeScript + Tailwind + next-intl (FR + Wolof) store for [sunuyaram.shop](https://sunuyaram.shop).

## Local development

```bash
# 1. Copy env
cp .env.example .env.local
# Edit .env.local — set NEXT_PUBLIC_API_URL=http://localhost:8000 for dev

# 2. Install deps
npm install

# 3. Start dev server
npm run dev
# Open http://localhost:3000/fr
```

## Docker build

```bash
docker build \
  --build-arg NEXT_PUBLIC_API_URL=https://api.namabeauty.shop \
  --build-arg NEXT_PUBLIC_SITE_URL=https://sunuyaram.shop \
  -t sunuyaram-frontend .

docker run -p 3000:3000 sunuyaram-frontend
```

## Key pages

| Route | Description |
|-------|-------------|
| `/fr` | Home |
| `/fr/collection` | Product collection |
| `/fr/products/nuit-calm` | NuitCalm PDP |
| `/fr/products/energie-vit` | ÉnergieVit PDP |
| `/fr/products/confort-digest` | ConfortDigest PDP |
| `/fr/about` | About |
| `/fr/contact` | Contact |
| `/fr/merci?order=SY-XXXXXXXX` | Thank you page |
| `/fr/legal/livraison` | Legal pages |

Wolof routes use `/wo` prefix.

## EasyPanel env variables

```
NEXT_PUBLIC_SITE_URL=https://sunuyaram.shop
NEXT_PUBLIC_API_URL=https://api.namabeauty.shop
NEXT_PUBLIC_META_PIXEL_ID=<your id>
NEXT_PUBLIC_TIKTOK_PIXEL_ID=<your id>
NEXT_PUBLIC_SNAP_PIXEL_ID=<your id>
```

## Test order flow

1. Go to `/fr/products/nuit-calm`
2. Select offer (default = 2 pièces / 950 FCFA)
3. Click "Ajouter et voir panier" → cart drawer opens
4. Click "Commander · Paiement à la livraison"
5. Fill name + phone `0550000000` (whitelist) + accept terms
6. If < 3 items, upsell modal shows (15s countdown)
7. Accept/decline → order POSTed to backend
8. Redirected to `/fr/merci?order=SY-...`
