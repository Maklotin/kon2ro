import { createCookie } from "@remix-run/node";

// Hentet fra remix firebase auth fra incertase.io: https://invertase.io/blog/remix-firebase-auth

export const session = createCookie("session", {
  secrets: ["kon2rosecret"],
  expires: new Date(Date.now() + 60 * 60 * 24 * 7),
  path: "/",
});
