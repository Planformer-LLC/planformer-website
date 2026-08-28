# Marketing media — what was done, and what is left

## Status: done

### Cache headers — fixed
All `marketing/**` objects now serve `public, max-age=31536000, immutable`.
Previously they served `private, max-age=0`, meaning every visitor
re-downloaded every asset on every page view. This was the single largest win
and it required no re-encode.

### Re-encoded assets
Originals are left in place untouched; the new files sit at new version paths.

| Asset | Before | After | Path |
|---|---|---|---|
| Hero video | 15.7 MB | **11.2 MB** | `marketing/hero/v2/hero_video_1080p.mp4` |
| Hero poster | 347 KB PNG | **109 KB WebP** | `marketing/hero/v2/hero_thumbnail.webp` |
| How It Works video | 4.77 MB | **3.3 MB** | `marketing/how-it-works/v3/how-it-works.mp4` |
| How It Works poster | 238 KB PNG | **23 KB WebP** | `marketing/how-it-works/v3/how-it-works_thumbnail.webp` |

Commands used:

```bash
# video — native resolution, CRF 24. Verified frame-by-frame against the
# original: plan linework and small UI text stay crisp.
ffmpeg -i src.mp4 -c:v libx264 -crf 24 -preset slow -profile:v high \
  -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 64k out.mp4

# poster
cwebp -q 82 -m 6 poster.png -o poster.webp

# upload with cache headers and a Firebase download token
gcloud storage cp out.mp4 "gs://planformer-3408e.firebasestorage.app/<path>" \
  --cache-control="public, max-age=31536000, immutable" \
  --content-type="video/mp4" \
  --custom-metadata="firebaseStorageDownloadTokens=$(uuidgen | tr 'A-Z' 'a-z')"
```

## Things that did NOT work — don't retry these

**VP9 / WebM is worse here.** `libvpx-vp9 -crf 32` produced a **12 MB** file
versus 11 MB for x264 CRF 24 at equivalent quality. No WebM source is shipped.

**Downscaling ruins it.** `-vf scale=1440 -crf 30` gets the hero to 5.7 MB, but
a 1:1 crop comparison shows small plan text ("WASHER", "SHOWER W/ TUB") and the
amber prompt pill going visibly mushy. For a product sold on plan precision
that is the wrong trade. Native resolution at CRF 24 is the floor.

## What is left

**The hero video is 4 minutes 22 seconds long.** That is the real problem, and
it is an editorial one, not an encoding one. The source is already only
348 kbps for 1920x1016 — there is very little fat left to cut. 11 MB is close
to the floor for that duration at usable quality.

The site now loads it poster-first (`preload="none"`, no autoplay), so nothing
is fetched until a visitor presses play, and the immutable cache means they
pay once ever. But a 4.5-minute demo is a big ask for a hero.

Worth considering: cut a **10-20 second silent loop** of the most striking part
of the takeoff (tracing a room, quantities updating) for the hero, and move the
full 4.5-minute walkthrough to its own section or the download page. That would
take the hero's play-cost from 11 MB to roughly 1 MB.

**Orphaned storage.** `marketing/how-it-works/v1/` holds a 15.7 MB video and a
355 KB poster that no current code references — it was superseded by v2 (and
now v3). Deleting it would reclaim ~16 MB. Left in place; deletion needs a
human decision.
