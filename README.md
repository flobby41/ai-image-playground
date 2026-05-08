# AI Image Playground

A virtual try‑on experience where a user uploads a single photo and the app generates personalized product images (shoes, cap, pants, hoodie) using **Google Gemini 2.5 Flash Image** (`gemini-2.5-flash-image`) as a multimodal model.

The project is a small, focused playground showing how to integrate AI image generation into a real product flow: drag‑and‑drop upload, format conversion, multimodal prompting, and rendering of generated images.

## Tech Stack

- **Next.js 14** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** with custom design tokens
- **shadcn/ui** + **Radix UI** for the UI primitives
- **Vercel AI SDK** (`ai`) for the unified inference API
- **`@ai-sdk/google`** to call Google Gemini directly
- **Google Gemini 2.5 Flash Image** as the multimodal model (default id: `gemini-2.5-flash-image`)
- **Vercel Analytics** for usage metrics

## How It Works

1. The user drops a photo (drag‑and‑drop or file picker).
2. The frontend (`app/page.tsx`) iterates over the product catalog and, for each product, calls the backend.
3. The backend route (`app/api/generate-model-image/route.ts`) receives the user photo + product image as `FormData`, normalizes the image format, and calls Gemini through `@ai-sdk/google`.
4. Gemini returns a generated image, which is sent back as a base64 data URL.
5. The frontend swaps the original product photos for the personalized ones in the gallery.

A second, more generic route (`app/api/generate-image/route.ts`) takes two images + a free‑form prompt and follows the same pipeline.

## Local Setup

### 1. Install dependencies

```bash
pnpm install
# or: npm install
```

### 2. Get a Google Gemini API key

- Go to [Google AI Studio](https://aistudio.google.com/app/apikey) and create an API key.
- Make sure your account can use the **image** model (default: `gemini-2.5-flash-image`). You can override it with `GEMINI_IMAGE_MODEL` if Google renames a model.

### 3. Configure environment variables

Create a `.env.local` file at the project root:

```bash
GOOGLE_GENERATIVE_AI_API_KEY=your_google_gemini_api_key
# Optional: override the default image model (default: gemini-2.5-flash-image)
# GEMINI_IMAGE_MODEL=gemini-2.5-flash-image
```

> `.env.local` is gitignored. Never commit your API key.

### 4. Run the dev server

```bash
pnpm dev
# or: npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and drop a photo onto the upload zone.

You should see logs like:

```
[v0] Google API key available: true
[v0] === Starting POST request ===
...
POST /api/generate-model-image 200
```

## Project Structure

```
app/
  api/
    generate-image/        # generic 2 images + prompt -> image
    generate-model-image/  # try-on: user photo + product -> image
  page.tsx                 # storefront UI (drag & drop, gallery)
  layout.tsx
components/                # shadcn/ui components + ImageWithLoading
lib/                       # utilities
public/                    # product images and assets
```

## Notes on Costs

`gemini-2.5-flash-image` is a paid image generation model. Each request consumes a small amount of credit on your Google account. For demos:

- Limit the number of generations during testing.
- Consider adding a soft quota in the API routes if you expose the demo publicly.

## Deployment

The app is built to deploy on Vercel:

1. Push the repo to GitHub.
2. Import the project in Vercel.
3. Add `GOOGLE_GENERATIVE_AI_API_KEY` in **Project Settings → Environment Variables**.
4. Deploy.

## License

Personal project, no specific license attached. Use at your own risk.
