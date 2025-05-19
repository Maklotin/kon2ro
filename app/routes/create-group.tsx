import { MetaFunction, useNavigate, useSearchParams } from "@remix-run/react";
import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { StickyNote } from "~/components/Stickynote";
import {
  StickyNoteTextButton,
  StickyNoteTextInput,
} from "~/components/ui-library";
import { auth as clientAuth, db } from "~/firebase.client";

export const meta: MetaFunction = () => {
  return [
    { title: "Opprett gruppe - Kon2ro" },
    { name: "beskrivelse kommer...", content: "Opprett gruppe" },
  ];
};

export default function CreateGroup() {
  const [noGroups, setNoGroups] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [groupName, setGroupName] = React.useState<string>("");
  const [offices, setOffices] = React.useState<string[]>([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  React.useEffect(() => {
    const unsubscribe = clientAuth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate("/login");
      }
      // Jeg vet det er unødvendig å både sjekke om bruker er i en gruppe via Firestore og sende "noGroup" med searchParams,
      // dette er for å vise hva jeg kan, i sluttproduktet hadde jeg kanskje satt opp en ordentlig "redirect" i stedet eller
      // bare sjekket om bruker er medlem av gruppe i database.
      const userDoc = await getDoc(doc(db, "users", user!.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (!(userData.groups && userData.groups.length > 0)) {
          setNoGroups(true);
        }
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

  try {
    const groupRef = doc(db, "groups", groupName);
  } catch (error) {}

  return (
    <div className="flex items-center justify-between w-screen">
      <div className="w-1/3"></div>
      <div className="flex flex-col items-center">
        <h2>Velkommen til Kon2ro!</h2>
        {searchParams.get("message") === "noGroup" && (
          <p className="text-red-500 font-cnew mt-2">
            Du er ikke medlem av noe gruppe.
          </p>
        )}
        <p className="text-secondary-100 font-cnew mb-2">
          {noGroups ? "Opprett gruppe for å bruke Kon2ro" : "Opprett ny gruppe"}
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
                <p>For å legge til flere kontor, skriv komma etter hvert</p>
              ),
              x: 70,
              y: 270,
            },
            {
              component: <p>kontor (f. Eks: kontor1, kontor2, kontor3).</p>,
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
