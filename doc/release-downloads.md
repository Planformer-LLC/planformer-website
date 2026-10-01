# Release download links — read before publishing a new build

## The trap

A newly uploaded file in Firebase Storage is **not publicly readable**. Two
different URL forms exist and they fail differently:

| Form | Works when |
|---|---|
| `firebasestorage.googleapis.com/v0/b/<bucket>/o/<path>?alt=media&token=<uuid>` | The object has `firebaseStorageDownloadTokens` metadata |
| `storage.googleapis.com/<bucket>/<path>` | The object has an `allUsers: READER` ACL |

Using the first form **without** a `token` gives every visitor:

```json
{ "error": { "code": 403, "message": "Permission denied." } }
```

This is exactly what happened to the macOS download. Every DMG under
`releases/macos/download/` — `0.0.8+15`, `0.0.9+16` and `0.0.12+19` — was
linked with a tokenless `firebasestorage` URL and **none of them were ever
downloadable**. The button returned raw JSON to Mac visitors for months, and
several release commits updated the version in a link that had never worked.

## The convention

Use the **direct GCS URL** and make the object public, matching the Windows
installer, which has always worked this way.

After uploading a new build:

```bash
# 1. make it publicly readable
gcloud storage objects update \
  "gs://planformer-3408e.firebasestorage.app/releases/macos/download/<version>/Planformer.dmg" \
  --add-acl-grant=entity=AllUsers,role=READER

# 2. release binaries are immutable — cache them for a year
gcloud storage objects update \
  "gs://planformer-3408e.firebasestorage.app/releases/macos/download/<version>/Planformer.dmg" \
  --cache-control="public, max-age=31536000, immutable"
```

Then update the single `href` in
[`src/data/siteData.ts`](../src/data/siteData.ts) (`platforms[].href`) and
`MACOS_DMG_URL` in
[`src/app/download/page.tsx`](../src/app/download/page.tsx).

**Note the `+` in a version path must be percent-encoded as `%2B`** in the URL,
or the request 404s.

## Always verify before shipping

A 200 with the right content-type and size is the only proof:

```bash
curl -sI "<url>" | grep -iE "^HTTP|content-length|content-type"
```

Expect `HTTP/2 200`, `application/x-apple-diskimage`, and a length in the tens
of megabytes. A 403 means step 1 was skipped.

## Current state

| Platform | Link | Status |
|---|---|---|
| macOS | `storage.googleapis.com/.../0.0.12%2B19/Planformer.dmg` | 200, public |
| Windows | `storage.googleapis.com/.../planformer.appinstaller` | 200, public |
| iOS / iPad | App Store | 200 |
| Android | Play Store | 200 |

Older macOS builds (`0.0.8+15`, `0.0.9+16`) are still private. Nothing links to
them, so they were left alone — make them public only if you need them.
