<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1ToBdZ0020OdGZF62PTdmIaz_OQaFdUJG

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Run locally

```sh
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

## Production build

```sh
npm run build     # outputs static files to dist/
npm run preview   # serves dist/ locally to check the build
```

Deploy the `dist/` folder to any static host (Vercel, Netlify, Cloudflare Pages, Render static site).

Optional environment variable: `GEMINI_API_KEY` (not used by the current code). See `.env.example`.

