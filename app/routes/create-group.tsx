import { useNavigate } from "@remix-run/react";
import React from "react";
import { StickyNote } from "~/components/Stickynote";
import {
  StickyNoteTextButton,
  StickyNoteTextInput,
} from "~/components/ui-library";
import { auth as clientAuth } from "~/firebase.client";

export default function CreateGroup() {
  const [error, setError] = React.useState<string | null>(null);
  const [groupName, setGroupName] = React.useState<string>("");
  const [offices, setOffices] = React.useState<string[]>([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const unsubscribe = clientAuth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  async function handleCreateGroup() {
    if (!groupName || offices.length === 0) {
      setError("Gruppenavn og kontor er tomme");
      return;
    }
    console.log("kontor er: ", offices);
  }

  return (
    <div className="flex items-center justify-between w-screen">
      <div className="w-1/3"></div>
      <div className="flex flex-col items-center">
        <h2>Velkommen til Kon2ro!</h2>
        <p className="text-secondary-100 font-cnew m-2">
          Opprett gruppe for å bruke Kon2ro
        </p>
        <StickyNote
          title="Opprett gruppe"
          goBackTo="/login"
          fields={[
            {
              component: (
                <StickyNoteTextInput
                  placeholder="Gruppenavn"
                  name="groupName"
                  type="text"
                  onChange={(e) => setGroupName(e.target.value)}
                  value={groupName}
                  required
                />
              ),
              x: 60,
              y: 175,
            },
            {
              component: (
                <p>
                  For å legge til flere kontor, skriv komma etter hvert
                </p>
              ),
              x: 70,
              y: 270,
            },
            {
              component: (
                <p>kontor (f. Eks: kontor1, kontor2, kontor3).</p>
              ),
              x: 70,
              y: 310,
            },
            {
              component: (
                <StickyNoteTextInput
                  placeholder="Kontor"
                  name="offices"
                  type="text"
                  onChange={(e) => setOffices(e.target.value.split(","))}
                  value={offices.join(",")}
                  required
                />
              ),
              x: 60,
              y: 375,
            },
            {
              component: (
                <StickyNoteTextButton onClick={handleCreateGroup} type="button">
                  Opprett gruppe
                </StickyNoteTextButton>
              ),
              x: 150,
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
