import { App, initializeApp, getApps, cert, getApp } from "firebase-admin/app";
import { Auth, getAuth } from "firebase-admin/auth";

// Hentet fra remix firebase auth fra incertase.io: https://invertase.io/blog/remix-firebase-auth

const serviceAccount = {
  type: import.meta.env.VITE_APP_SAK_TYPE,
  project_id: import.meta.env.VITE_APP_SAK_PROJECT_ID,
  private_key_id: import.meta.env.VITE_APP_SAK_PRIVATE_KEY_ID,
  private_key: import.meta.env.VITE_APP_SAK_PRIVATE_KEY,
  client_email: import.meta.env.VITE_APP_SAK_CLIENT_EMAIL,
  client_id: import.meta.env.VITE_APP_SAK_CLIENT_ID,
  auth_uri: import.meta.env.VITE_APP_SAK_AUTH_URI,
  token_uri: import.meta.env.VITE_APP_SAK_TOKEN_URI,
  auth_provider_x509_cert_url: import.meta.env
    .VITE_APP_SAK_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: import.meta.env.VITE_APP_SAK_CLIENT_X509_CERT_URL,
  universe_domain: import.meta.env.VITE_APP_SAK_UNIVERSE_DOMAIN,
};

let app: App;
let auth: Auth;

if (getApps().length === 0) {
  app = initializeApp({
    credential: cert(serviceAccount as any),
  });
  auth = getAuth(app);
} else {
  app = getApp();
  auth = getAuth(app);
}
export { auth };
