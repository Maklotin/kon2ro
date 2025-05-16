import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React from "react";
import { StickyNote } from "~/components/Stickynote";
import {
  StickyNoteTextButton,
  StickyNoteTextInput,
} from "~/components/ui-library";
import { auth as clientAuth } from "~/firebase.client";
import { Link, redirect, useFetcher, useNavigate } from "@remix-run/react";

import { createUserIfItNotExists } from "~/utils/user";

// Hentet fra remix firebase auth tutorial fra incertase.io: https://invertase.io/blog/remix-firebase-auth

export default function Login() {
  const fetcher = useFetcher();
  const [error, setError] = React.useState<string | null>(null);
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const navigate = useNavigate();

  React.useEffect(() => {
    const unsubscribe = clientAuth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  async function handleEmailPasswordLogin(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password) {
      setError("Epost og passord er påkrevd");
      return;
    }

    try {
      const credential = await signInWithEmailAndPassword(
        clientAuth,
        email,
        password
      );

      await createUserIfItNotExists(credential.user);
    } catch (error) {
      console.error("Login error:", error);
      setError(
        "Det oppsto et problem, " +
          (error instanceof Error ? error.message : String(error))
      );
    }
  }

  async function handleGoogleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: "select_account",
      });

      const result = await signInWithPopup(clientAuth, provider);
      createUserIfItNotExists(result.user);
      const idToken = await result.user.getIdToken();

      fetcher.submit({ idToken }, { method: "post", action: "/login" });
    } catch (error) {
      console.error("Google login error:", error);
      setError(
        "Det oppsto et problem med Google-innlogging, " +
          (error instanceof Error ? error.message : String(error))
      );
    }
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <h2>Velkommen til Kon2ro!</h2>
      <p className="text-secondary-100 font-cnew m-2">
        Logg inn for å bruke Kon2ro
      </p>
      <StickyNote
        title="Logg inn"
        fields={[
          {
            component: (
              <StickyNoteTextInput
                placeholder="Epost"
                name="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            ),
            x: 60,
            y: 175,
          },
          {
            component: (
              <StickyNoteTextInput
                placeholder="Passord"
                name="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            ),
            x: 60,
            y: 255,
          },
          {
            component: (
              <StickyNoteTextButton
                onClick={handleEmailPasswordLogin}
                type="button"
              >
                Logg inn med epost
              </StickyNoteTextButton>
            ),
            x: 120,
            y: 340,
          },
          {
            component: <p className="text-5xl">eller</p>,
            x: 230,
            y: 415,
          },
          {
            component: (
              <StickyNoteTextButton onClick={handleGoogleLogin} type="button">
                Logg inn med Google
              </StickyNoteTextButton>
            ),
            x: 120,
            y: 500,
          },
        ]}
      />
      <p className="text-secondary-100">
        Har du ikke bruker?{" "}
        <Link
          to="/register"
          className="text-link-blue-200 hover:text-link-blue-300"
        >
          Opprett bruker her
        </Link>
      </p>
      {error && (
        <div className="text-red-500 mt-4 text-center font-rbeanie text-2xl">
          {error}
        </div>
      )}
    </div>
  );
}
