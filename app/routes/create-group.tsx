import { MetaFunction, useNavigate, useSearchParams } from "@remix-run/react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import React from "react";
import { StickyNote } from "~/components/Stickynote";
import {
  StickyNoteTextButton,
  StickyNoteTextInput,
} from "~/components/ui-library";
import { auth as clientAuth, db } from "~/firebase.client";

export const meta: MetaFunction = () => {
  return [{ title: "Opprett gruppe - Kon2ro" }];
};

export default function CreateGroup() {
  const [noGroups, setNoGroups] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [groupName, setGroupName] = React.useState<string>("");
  const [offices, setOffices] = React.useState<string[]>([]);
  const [userId, setUserId] = React.useState<string | null>(null);
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
        setUserId(user!.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  async function handleCreateGroup() {
    if (!groupName || offices.length === 0) {
      setError("Vennligst fyll ut alle feltene");
      return;
    }

    try {
      // query hentet fra Github Copilot medmodell GPT-4o
      const duplicateGroupQuery = query(
        collection(db, "groups"),
        where("name", "==", groupName)
      );
      const duplicateGroupSnapshot = await getDocs(duplicateGroupQuery);

      if (!duplicateGroupSnapshot.empty) {
        setError("Gruppe finnes allerede");
        return;
      }

      const groupRef = doc(collection(db, "groups"));
      const officeIds: string[] = [];

      // kode for å sette inn offices i database er hentet fra Github Copilot medmodell GPT-4o
      for (const officeName of offices) {
        const officeRef = doc(collection(db, "offices"));
        officeIds.push(officeRef.id);

        await setDoc(officeRef, {
          name: officeName.trim(),
          address: "",
          description: "",
          group: groupRef.id,
          id: officeRef.id,
        });
      }

      const colors = [
        { bg: "#673030", border: "#3d1d1d" },
        { bg: "#606c38", border: "#283618" },
        { bg: "#003554", border: "#051923" },
        { bg: "#3c096c", border: "#240046" },
        { bg: "#2d6a4f", border: "#1b4332" },
        { bg: "#33415c", border: "#001233" },
        { bg: "#800f2f", border: "#590d22" },
        { bg: "#7f4f24", border: "#582f0e" },
        { bg: "#363014", border: "#1f1b0d" },
      ];

      const assignedColor = colors[0];

      await setDoc(groupRef, {
        memberUids: [userId],
        name: groupName,
        offices: officeIds,
      });

      const userRef = doc(db, "users", userId!);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        await setDoc(userRef, {
          ...userData,
          color: assignedColor,
          groups: [...(userData.groups || []), groupRef.id],
        });
      }

      navigate("/");
    } catch (error) {
      console.error("Error creating group:", error);
      setError("Det oppsto et problem " + error);
    }
  }
  return (
    <div>
      <div className="flex items-center justify-between w-screen">
        <div className="w-1/3"></div>
        <div className="flex flex-col items-center">
          <h2 className={noGroups ? undefined : "mb-10"}>
            {noGroups ? "Velkommen til Kon2ro!" : "Opprett ny gruppe"}
          </h2>
          {searchParams.get("message") === "noGroup" && (
            <p className="text-red-500 font-cnew mt-2">
              Du er ikke medlem av noe gruppe.
            </p>
          )}
          <p className="text-secondary-100 font-cnew mb-2">
            {noGroups && "Opprett gruppe for å bruke Kon2ro"}
          </p>
          <StickyNote
            title="Opprett gruppe"
            goBackTo={noGroups ? "/login" : "/"}
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
                  <StickyNoteTextButton
                    onClick={handleCreateGroup}
                    type="button"
                  >
                    Opprett gruppe
                  </StickyNoteTextButton>
                ),
                x: 150,
                y: 500,
              },
            ]}
          />
        </div>

        <div className="flex flex-col justify-between h-[38rem] w-1/3">
          <div></div>
          <p className="text-secondary-100">
            {noGroups
              ? "Tilbake til logg inn siden"
              : "Tilbake til hjemmesiden"}
          </p>
        </div>
      </div>
      {error && (
        <div className="text-red-500 mt-4 text-center font-rbeanie text-2xl">
          {error}
        </div>
      )}
    </div>
  );
}
