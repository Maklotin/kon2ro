import React from "react";
import { StickyNote } from "~/components/Stickynote";
import {
  StickyNoteTextButton,
  StickyNoteTextInput,
} from "~/components/ui-library";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth as clientAuth } from "~/firebase.client";
import { createUserIfItNotExists } from "~/utils/user";
import { MetaFunction, useNavigate } from "@remix-run/react";
// import { ActionFunction, redirect } from "@remix-run/node";
// import { session } from "~/cookies";

export const meta: MetaFunction = () => {
  return [{ title: "Opprett bruker - Kon2ro" }];
};

// export const action: ActionFunction = async ({ request }) => {
//   const form = await request.formData();
//   const idToken = form.get("idToken")?.toString();

//   if (!idToken) {
//     throw new Error("idToken is required");
//   }

//   try {
//     const decodedToken = await serverAuth.verifyIdToken(idToken);

//     const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 dager
//     const sessionCookie = await serverAuth.createSessionCookie(idToken, {
//       expiresIn,
//     });

//     return redirect("/", {
//       headers: {
//         "Set-Cookie": await session.serialize(sessionCookie, {
//           expires: new Date(Date.now() + expiresIn),
//           maxAge: expiresIn / 1000,
//         }),
//       },
//     });
//   } catch (error) {
//     console.error("Authentication error:", error);
//     return redirect("/login");
//   }
// };

export default function Register() {
  // const fetcher = useFetcher();
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const unsubscribe = clientAuth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password || !confirmPassword || !name) {
      setError("Vennligst fyll ut alle feltene");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passordene må være like");
      return;
    }

    try {
      const credential = await createUserWithEmailAndPassword(
        clientAuth,
        email,
        password
      );

      const result = await createUserIfItNotExists(credential.user, name);

      if (result && "error" in result && result.error) {
        console.error("Error creating user document:", result.error);
        setError("Det oppsto et problem med å opprette brukeren");
        return;
      }

      // Sign out the user after registration
      await clientAuth.signOut();

      // Redirect to the login page
      navigate("/login");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Noe gikk galt");
      }
    }
  }
  return (
    <div className="flex items-center justify-between w-screen">
      <div className="w-1/3"></div>
      <div className="flex flex-col items-center">
        <h2>Velkommen til Kon2ro!</h2>
        <p className="text-secondary-100 font-cnew m-2">
          Logg inn for å bruke Kon2ro
        </p>
        <StickyNote
          title="Opprett bruker"
          goBackTo="/login"
          fields={[
            {
              component: (
                <StickyNoteTextInput
                  placeholder="Navn"
                  name="name"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
              ),
              x: 60,
              y: 175,
            },
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
              y: 255,
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
              x: 65,
              y: 335,
            },
            {
              component: (
                <StickyNoteTextInput
                  placeholder="Bekreft passord"
                  name="confirmPassword"
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  required
                />
              ),
              x: 65,
              y: 415,
            },
            {
              component: (
                <StickyNoteTextButton
                  onClick={(e) => handleRegister(e)}
                  type="button"
                >
                  Opprett bruker her
                </StickyNoteTextButton>
              ),
              x: 120,
              y: 500,
            },
          ]}
        />
      </div>

      <div className="flex flex-col justify-between h-[36rem] w-1/3">
        <div></div>
        <p className="text-secondary-100">Tilbake til logg inn siden</p>
      </div>
    </div>
  );
}
