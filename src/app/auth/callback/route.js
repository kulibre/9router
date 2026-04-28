import { NextResponse } from "next/server";

function getPublicOrigin(request) {
  const envBaseUrl = process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL;
  if (envBaseUrl && !envBaseUrl.includes("localhost")) {
    return envBaseUrl.replace(/\/$/, "");
  }

  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = forwardedHost || request.headers.get("host");
  const proto = request.headers.get("x-forwarded-proto") || "https";

  if (host) {
    return `${proto}://${host}`;
  }

  return new URL(request.url).origin;
}

export async function GET(request) {
  const origin = getPublicOrigin(request);
  return NextResponse.redirect(`${origin}/callback?${new URL(request.url).searchParams.toString()}`);
}
