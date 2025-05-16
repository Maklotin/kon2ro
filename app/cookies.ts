import { createCookie } from "@remix-run/node";

// Hentet fra remix firebase auth fra incertase.io: https://invertase.io/blog/remix-firebase-auth

export const session = createCookie("firebase_session", {
  secrets: ["kon2rosecret"],
  // 7 dager
  maxAge: 60 * 60 * 24 * 7,
  path: "/",
  httpOnly: true, 
  sameSite: "lax", 
});
