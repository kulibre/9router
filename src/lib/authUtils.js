import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "9router-default-secret-change-me"
);

export async function getServerUser(request = null) {
  const cookieStore = await cookies();
  const token = request
    ? request.cookies.get("auth_token")?.value
    : cookieStore.get("auth_token")?.value;

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, SECRET);
    if (payload && payload.userId) {
      return {
        userId: payload.userId,
        email: payload.email,
        authenticated: true
      };
    }
  } catch {
    // invalid token
  }

  return null;
}

export async function mintAppJwt(userId, email, request = null) {
  const forceSecureCookie = process.env.AUTH_COOKIE_SECURE === "true";
  const isHttpsRequest = request ? request.headers.get("x-forwarded-proto") === "https" : false;
  const useSecureCookie = forceSecureCookie || isHttpsRequest;

  const token = await new SignJWT({ authenticated: true, userId, email })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .sign(SECRET);

  const cookieStore = await cookies();
  cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: useSecureCookie,
    sameSite: "lax",
    path: "/",
  });

  return token;
}
