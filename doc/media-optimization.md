# Media optimization — commands to run

These need Firebase/GCP auth, so they are not run by the build. Together they
are the single largest performance win available to this site.

## The problem

Measured with `curl -sI` against the live Firebase Storage objects:

| Asset | Size | Cache-Control |
|---|---|---|
| `marketing/hero/v1/hero_video_1080p.mp4` | **15.7 MB** | `private, max-age=0` |
| `marketing/hero/v1/hero_thumbnail.png` | 355 KB | `private, max-age=0` |
| `marketing/how-it-works/v2/how it works animation.mp4` | 4.77 MB | `private, max-age=0` |
| `marketing/how-it-works/v2/howitworkthumbnail.png` | 243 KB | `private, max-age=0` |

`max-age=0` means **every visitor re-downloads all ~21 MB on every page view**.
The site code now loads videos poster-first (`preload="none"`, no autoplay), so
nothing is fetched until a visitor presses play — but the files are still far
larger than they need to be, and still uncacheable.

## 1. Fix the cache headers (biggest win, no re-encode needed)

Release media is immutable — the URL contains a version segment — so it should
cache for a year:

```bash
gcloud storage objects update \
  "gs://planformer-3408e.firebasestorage.app/marketing/**" \
  --cache-control="public, max-age=31536000, immutable"
```

Do this first. It costs nothing and removes the repeat-visit download entirely.

## 2. Re-encode the videos

Target under 2 MB for the hero. The current file is 1080p at a bitrate far
above what a UI screencast needs.

```bash
ffmpeg -i hero_video_1080p.mp4 -vf "scale=1600:-2" -c:v libx264 -crf 28 -preset slow -profile:v high -pix_fmt yuv420p -movflags +faststart -an hero_v2.mp4
```

`-movflags +faststart` moves the index to the front so playback can begin
before the file finishes downloading. `-an` drops the audio track — the hero
loop is muted anyway. Add a WebM variant, which is typically 30% smaller again:

```bash
ffmpeg -i hero_video_1080p.mp4 -vf "scale=1600:-2" -c:v libvpx-vp9 -crf 36 -b:v 0 -an hero_v2.webm
```

Same treatment for `how it works animation.mp4`.

After uploading, add the WebM as a first `<source>` in
`src/components/sections/PosterVideo.tsx` — browsers pick the first one they
support:

```tsx
<source src={videoWebmUrl} type="video/webm" />
<source src={videoUrl} type="video/mp4" />
```

## 3. Re-encode the posters

The posters are full-size PNGs of screen content. They now go through
`next/image` (so they are resized and served as WebP/AVIF), but shrinking the
originals still helps:

```bash
ffmpeg -i hero_thumbnail.png -vf "scale=1600:-2" -q:v 80 hero_thumbnail.webp
```

## Verifying

```bash
curl -sI "<object url>" | grep -iE "content-length|cache-control"
```

Expect `cache-control: public, max-age=31536000, immutable` and a
content-length under ~2,000,000.
