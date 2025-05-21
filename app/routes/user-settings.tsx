import { StickyNote } from "~/components/Stickynote";
import {
  StickyNoteTextInput,
  StickyNoteTextButton,
} from "~/components/ui-library";
import { auth as clientAuth, db } from "~/firebase.client";
import {
  updateProfile,
  updatePassword,
  deleteUser,
  EmailAuthProvider,
  GoogleAuthProvider,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import {
  arrayRemove,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { Link, MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [{ title: "Brukerinnstillinger - Kon2ro" }];
};


//Så si hele denne siden er generert med Github Copilot GPT-4o

export default function UserSettings() {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChangeName = async () => {
    const currentUser = clientAuth.currentUser;
    if (!currentUser) {
      setError("Du må være logget inn for å endre navn.");
      return;
    }

    try {
      await updateProfile(currentUser, { displayName: name });
      setSuccess("Navnet ditt er oppdatert!");
    } catch (error) {
      console.error("Error updating name:", error);
      setError("Det oppsto et problem med å oppdatere navnet.");
    }
  };

  const handleChangePassword = async () => {
    const currentUser = clientAuth.currentUser;
    if (!currentUser) {
      setError("Du må være logget inn for å endre passord.");
      return;
    }

    try {
      await updatePassword(currentUser, password);
      setSuccess("Passordet ditt er oppdatert!");
    } catch (error) {
      console.error("Error updating password:", error);
      setError("Det oppsto et problem med å oppdatere passordet.");
    }
  };

  const handleDeleteUser = async () => {
    const currentUser = clientAuth.currentUser;
    if (!currentUser) {
      setError("Du må være logget inn for å slette brukeren.");
      return;
    }

    if (
      !confirm(
        "Er du sikker på at du vil slette brukeren din? Dette kan ikke angres."
      )
    ) {
      return;
    }

    try {
      if (currentUser.providerData[0]?.providerId === "google.com") {
        const provider = new GoogleAuthProvider();
        await reauthenticateWithPopup(currentUser, provider);
      } else if (currentUser.email) {
        const password = prompt(
          "Vennligst skriv inn passordet ditt for å bekrefte:"
        );
        if (!password) {
          setError("Passord er påkrevd for å slette brukeren.");
          return;
        }
        const credential = EmailAuthProvider.credential(
          currentUser.email,
          password
        );
        await reauthenticateWithCredential(currentUser, credential);
      }

      const userRef = doc(db, "users", currentUser.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();

        if (userData.groups && Array.isArray(userData.groups)) {
          for (const groupId of userData.groups) {
            const groupRef = doc(db, "groups", groupId);
            await updateDoc(groupRef, {
              memberUids: arrayRemove(currentUser.uid),
            });
          }
        }

        const timestampsQuery = query(
          collection(db, "timestamps"),
          where("uid", "==", currentUser.uid)
        );
        const timestampsSnapshot = await getDocs(timestampsQuery);
        for (const timestampDoc of timestampsSnapshot.docs) {
          await deleteDoc(timestampDoc.ref);
        }

        await deleteDoc(userRef);
      }

      await deleteUser(currentUser);

      alert("Brukeren din er slettet.");
      window.location.href = "/";
    } catch (error) {
      console.error("Error deleting user:", error);
      if (error.code === "auth/wrong-password") {
        setError("Feil passord. Vennligst prøv igjen.");
      } else if (error.code === "auth/popup-closed-by-user") {
        setError("Reautentisering avbrutt. Vennligst prøv igjen.");
      } else {
        setError("Det oppsto et problem med å slette brukeren.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <StickyNote
        title="Brukerinnstillinger"
        fields={[
          {
            component: (
              <StickyNoteTextInput
                placeholder="Nytt navn"
                name="name"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            ),
            x: 70,
            y: 175,
          },
          {
            component: (
              <StickyNoteTextButton onClick={handleChangeName} type="button">
                Endre navn
              </StickyNoteTextButton>
            ),
            x: 190,
            y: 255,
          },
          {
            component: (
              <StickyNoteTextInput
                placeholder="Nytt passord"
                name="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            ),
            x: 85,
            y: 335,
          },
          {
            component: (
              <StickyNoteTextButton
                onClick={handleChangePassword}
                type="button"
              >
                Endre passord
              </StickyNoteTextButton>
            ),
            x: 180,
            y: 415,
          },
          {
            component: (
              <StickyNoteTextButton onClick={handleDeleteUser} type="button">
                <p className="text-red-line-100 text-5xl hover:text-red-500">
                  Slett bruker
                </p>
              </StickyNoteTextButton>
            ),
            x: 190,
            y: 495,
          },
        ]}
      />
      <p className="text-3xl font-cnew underline">
        <Link
          to="/gdpr"
          className="text-link-blue-200 hover:text-link-blue-300 font"
        >
          Personvernserklæring
        </Link>
      </p>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-500 mt-4">{success}</p>}
    </div>
  );
}
