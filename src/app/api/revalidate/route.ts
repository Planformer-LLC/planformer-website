import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const secret = process.env.BLOG_REVALIDATE_SECRET;
  const provided = request.headers.get("x-revalidate-secret");
  if (!secret || provided !== secret) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const payload = (await request.json().catch(() => ({}))) as {
    tags?: string[];
    paths?: string[];
  };

  for (const tag of payload.tags ?? []) {
    if (tag) {
      revalidateTag(tag, "max");
    }
  }

  for (const path of payload.paths ?? []) {
    if (path) {
      revalidatePath(path);
    }
  }

  return NextResponse.json({ ok: true });
}
