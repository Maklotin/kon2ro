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
import { Link, MetaFunction, useNavigate } from "@remix-run/react";

import { createUserIfItNotExists } from "~/utils/user";
import { FirebaseError } from "firebase/app";

export const meta: MetaFunction = () => {
  return [{ title: "Logg inn - Kon2ro" }];
};

// Deler av koden (spesielt Google login) er hentet fra remix firebase auth tutorial fra incertase.io: https://invertase.io/blog/remix-firebase-auth
// createUserIfItNotExists() er også hentet fra samme kilde.

export default function Login() {
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
      setError("Vennligst fyll ut epost og passord");
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
      // Fant hjelp med å sette riktig type fra "Juk" fra Stackoverflow https://stackoverflow.com/questions/40157541/how-do-you-access-the-code-property-of-a-firebaseerror-in-angularfire-typesc
      if (error instanceof FirebaseError) {
        // error kodene er hentet fra Firebase sin dokumentasjon. https://firebase.google.com/docs/auth/admin/errors
        if (error.code === "auth/invalid-credential") {
          setError("Feil epost eller passord");
        } else if (error.code === "auth/user-not-found") {
          setError("Bruker finnes ikke");
        } else if (error.code === "auth/wrong-password") {
          setError("Feil passord");
        } else if (error.code === "invalid-email") {
          setError("Ugyldig epostadresse");
        } else {
          setError(
            "Det oppsto et problem, " +
              (error instanceof FirebaseError ? error.message : String(error)) +
              " Vennligst prøv igjen eller kontakt support."
          );
        }
      } else {
        setError(
          "Det oppsto et problem, " +
            (error instanceof Error ? error.message : String(error)) +
            " Vennligst prøv igjen eller kontakt support."
        );
      }
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
