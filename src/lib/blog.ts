import "server-only";

import jwt from "jsonwebtoken";

export type BlogImage = {
  url: string;
  alt: string;
  caption?: string;
  width?: number | null;
  height?: number | null;
};

export type BlogSeo = {
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
};

export type BlogAuthor = {
  uid?: string;
  email?: string;
  name?: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  status: string;
  excerpt: string;
  contentHtml: string;
  plainText: string;
  readTimeMinutes: number;
  coverImage: BlogImage;
  author: BlogAuthor;
  tagLabels: string[];
  categoryLabels: string[];
  seo: BlogSeo;
  publishAt: Date | null;
  firstPublishedAt: Date | null;
  createdAt: Date | null;
  updatedAt: Date | null;
};

export type BlogListResult = {
  posts: BlogPost[];
  page: number;
  hasNextPage: boolean;
  query: string;
};

type FirestoreValue =
  | { stringValue: string }
  | { integerValue: string }
  | { doubleValue: number }
  | { booleanValue: boolean }
  | { nullValue: null }
  | { timestampValue: string }
  | { arrayValue: { values?: FirestoreValue[] } }
  | { mapValue: { fields?: Record<string, FirestoreValue> } };

type FirestoreDocument = {
  name: string;
  fields?: Record<string, FirestoreValue>;
};

const PAGE_SIZE = 9;
const METADATA_TOKEN_URL =
  "http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token";

function projectId() {
  const value = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.trim();
  if (!value) {
    throw new Error("NEXT_PUBLIC_FIREBASE_PROJECT_ID is not configured.");
  }
  return value;
}

function firestoreBaseUrl() {
  return `https://firestore.googleapis.com/v1/projects/${projectId()}/databases/(default)/documents`;
}

function normalizeSlug(value: string) {
  return value
    .trim()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .toLowerCase()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function tokenize(value: string) {
  return value
    .trim()
    .toLowerCase()
    .split(/[^a-z0-9]+/i)
    .map((part) => part.trim())
    .filter(Boolean);
}

function isPublic(post: BlogPost, now = new Date()) {
  return (
    post.status === "published" &&
    !!post.publishAt &&
    post.publishAt.getTime() <= now.getTime()
  );
}

function toDate(value: unknown): Date | null {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof value === "number") {
    return new Date(value);
  }
  if (typeof value === "string") {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }
  return null;
}

function parseFirestoreValue(value: FirestoreValue | undefined): unknown {
  if (!value) return null;
  if ("stringValue" in value) return value.stringValue;
  if ("integerValue" in value) return Number(value.integerValue);
  if ("doubleValue" in value) return value.doubleValue;
  if ("booleanValue" in value) return value.booleanValue;
  if ("nullValue" in value) return null;
  if ("timestampValue" in value) return value.timestampValue;
  if ("arrayValue" in value) {
    return (value.arrayValue.values ?? []).map((entry) =>
      parseFirestoreValue(entry)
    );
  }
  if ("mapValue" in value) {
    const parsed: Record<string, unknown> = {};
    for (const [key, entry] of Object.entries(value.mapValue.fields ?? {})) {
      parsed[key] = parseFirestoreValue(entry);
    }
    return parsed;
  }
  return null;
}

function parseDocument(doc: FirestoreDocument | null): Record<string, unknown> | null {
  if (!doc?.fields) return null;
  const parsed: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(doc.fields)) {
    parsed[key] = parseFirestoreValue(value);
  }
  return parsed;
}

function documentId(name: string) {
  const parts = name.split("/");
  return parts[parts.length - 1] ?? "";
}

async function getAccessToken() {
  const response = await fetch(METADATA_TOKEN_URL, {
    headers: {
      "Metadata-Flavor": "Google",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch metadata token: ${response.status}`);
  }

  const data = (await response.json()) as { access_token?: string };
  if (!data.access_token) {
    throw new Error("Metadata server did not return an access token.");
  }
  return data.access_token;
}

async function firestoreGet<T>(path: string, search = ""): Promise<T> {
  const token = await getAccessToken();
  const url = `${firestoreBaseUrl()}/${path}${search}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (response.status === 404) {
    throw new Error("NOT_FOUND");
  }
  if (!response.ok) {
    throw new Error(`Firestore request failed: ${response.status}`);
  }
  return (await response.json()) as T;
}

async function listPostDocuments(): Promise<FirestoreDocument[]> {
  const response = await firestoreGet<{ documents?: FirestoreDocument[] }>(
    "blogs/root/posts",
    "?pageSize=100"
  );
  return response.documents ?? [];
}

async function getDocument(path: string): Promise<FirestoreDocument | null> {
  try {
    return await firestoreGet<FirestoreDocument>(path);
  } catch (error) {
    if (error instanceof Error && error.message === "NOT_FOUND") {
      return null;
    }
    throw error;
  }
}

function toBlogPost(id: string, data: Record<string, unknown> | null): BlogPost | null {
  if (!data) return null;

  const coverImage = (data.coverImage ?? {}) as Record<string, unknown>;
  const author = (data.author ?? {}) as Record<string, unknown>;
  const seo = (data.seo ?? {}) as Record<string, unknown>;

  return {
    id,
    title: String(data.title ?? ""),
    slug: String(data.slug ?? ""),
    status: String(data.status ?? "draft"),
    excerpt: String(data.excerpt ?? ""),
    contentHtml: String(data.contentHtml ?? ""),
    plainText: String(data.plainText ?? ""),
    readTimeMinutes: Number(data.readTimeMinutes ?? 1) || 1,
    coverImage: {
      url: String(coverImage.url ?? ""),
      alt: String(coverImage.alt ?? ""),
      caption: String(coverImage.caption ?? ""),
      width: typeof coverImage.width === "number" ? coverImage.width : null,
      height: typeof coverImage.height === "number" ? coverImage.height : null,
    },
    author: {
      uid: typeof author.uid === "string" ? author.uid : undefined,
      email: typeof author.email === "string" ? author.email : undefined,
      name: typeof author.name === "string" ? author.name : undefined,
    },
    tagLabels: Array.isArray(data.tagLabels) ? data.tagLabels.map(String) : [],
    categoryLabels: Array.isArray(data.categoryLabels)
      ? data.categoryLabels.map(String)
      : [],
    seo: {
      metaTitle: String(seo.metaTitle ?? data.title ?? ""),
      metaDescription: String(seo.metaDescription ?? data.excerpt ?? ""),
      ogTitle: String(seo.ogTitle ?? data.title ?? ""),
      ogDescription: String(seo.ogDescription ?? data.excerpt ?? ""),
      ogImage: String(seo.ogImage ?? coverImage.url ?? ""),
    },
    publishAt: toDate(data.publishAt),
    firstPublishedAt: toDate(data.firstPublishedAt),
    createdAt: toDate(data.createdAt),
    updatedAt: toDate(data.updatedAt),
  };
}

function formatSearchQuery(value?: string) {
  return (value ?? "").trim();
}

export function formatBlogDate(date: Date | null) {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export async function getPublishedBlogList(
  query = "",
  page = 1
): Promise<BlogListResult> {
  try {
    const safeQuery = formatSearchQuery(query);
    const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
    const searchTokens = tokenize(safeQuery);
    const now = new Date();

    const posts = (await listPostDocuments())
      .map((doc) => toBlogPost(documentId(doc.name), parseDocument(doc)))
      .filter((post): post is BlogPost => post !== null)
      .filter((post) => isPublic(post, now))
      .sort(
        (left, right) =>
          (right.publishAt?.getTime() ?? 0) - (left.publishAt?.getTime() ?? 0)
      );

    const filteredPosts =
      searchTokens.length === 0
        ? posts
        : posts.filter((post) => {
            const haystack = [
              post.title,
              post.slug,
              post.excerpt,
              post.plainText,
              ...post.tagLabels,
              ...post.categoryLabels,
            ]
              .join(" ")
              .toLowerCase();
            return searchTokens.every((token) => haystack.includes(token));
          });

    const start = (safePage - 1) * PAGE_SIZE;
    const pagePosts = filteredPosts.slice(start, start + PAGE_SIZE);

    return {
      posts: pagePosts,
      page: safePage,
      hasNextPage: start + PAGE_SIZE < filteredPosts.length,
      query: safeQuery,
    };
  } catch (error) {
    console.error("[blog] getPublishedBlogList failed", error);
    throw error;
  }
}

export async function getPublishedBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  try {
    const slugKey = normalizeSlug(slug);
    if (!slugKey) return null;

    const slugDoc = await getDocument(`blogs/root/slugs/${slugKey}`);
    const slugData = parseDocument(slugDoc);
    const postId = String(slugData?.postId ?? "");
    if (!postId) return null;

    const postDoc = await getDocument(`blogs/root/posts/${postId}`);
    const post = toBlogPost(postId, parseDocument(postDoc));
    if (!post || !isPublic(post)) {
      return null;
    }
    return post;
  } catch (error) {
    console.error("[blog] getPublishedBlogPostBySlug failed", { slug, error });
    throw error;
  }
}

export async function getPreviewBlogPostFromToken(
  token: string
): Promise<BlogPost | null> {
  try {
    const secret = process.env.BLOG_PREVIEW_SECRET;
    if (!secret) {
      throw new Error("BLOG_PREVIEW_SECRET is not configured.");
    }

    const decoded = jwt.verify(token, secret) as {
      type?: string;
      postId?: string;
    };

    if (decoded.type !== "blog_preview" || !decoded.postId) {
      return null;
    }

    const postDoc = await getDocument(`blogs/root/posts/${decoded.postId}`);
    return toBlogPost(decoded.postId, parseDocument(postDoc));
  } catch (error) {
    console.error("[blog] getPreviewBlogPostFromToken failed", error);
    throw error;
  }
}
