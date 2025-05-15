import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { StickyNote } from "~/components/Stickynote";
import {
  StickyNoteTextButton,
  StickyNoteTextInput,
} from "~/components/ui-library";
import { auth as clientAuth } from "~/firebase.client";
import { auth as serverAuth } from "~/firebase.server";
import { ActionFunction } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { session } from "~/cookies";
import { redirect } from "@remix-run/node";

// Hentet fra remix firebase auth fra incertase.io: https://invertase.io/blog/remix-firebase-auth

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const idToken = form.get("idToken")?.toString();

  if (!idToken) {
    throw new Error("idToken is required");
  }

  await serverAuth.verifyIdToken(idToken);

  const jwt = await serverAuth.createCustomToken(idToken, {
    expiresIn: 60 * 60 * 24 * 5 * 1000, // 5 dager
  });

  return redirect("/", {
    headers: {
      "Set-Cookie": await session.serialize(jwt),
    },
  });
};

export default function Login() {
  const fetcher = useFetcher();
  const [error, setError] = React.useState<string | null>(null);
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  async function handleSubmit(e: React.MouseEvent) {
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
      const idToken = await credential.user.getIdToken();

      fetcher.submit({ idToken }, { method: "post", action: "/login" });
    } catch (error) {
      console.error("Login error:", error);
      setError(
        "Det oppsto et problem, " +
          (error instanceof Error ? error.message : String(error))
      );
    }
  }

  return (
    <div>
      <StickyNote
        title="Logg inn"
        goBack={true}
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
              <StickyNoteTextButton onClick={handleSubmit} type="button">
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
              <StickyNoteTextButton
                onClick={() => console.log("Login with Google clicked")}
                type="button"
              >
                Logg inn med Google
              </StickyNoteTextButton>
            ),
            x: 120,
            y: 500,
          },
        ]}
      />
      {error && (
        <div className="text-red-500 mt-4 text-center font-rbeanie text-2xl">
          {error}
        </div>
      )}
    </div>
  );
}
