import React, { useEffect } from "react";
import { MetaFunction, useNavigate } from "@remix-run/react";
import { doc, getDoc } from "firebase/firestore";
import { auth as clientAuth, db } from "~/firebase.client";
import { Group, Office } from "~/schema/group-office.schema";
import { OfficeStickyNote } from "~/components/ui-library";

export const meta: MetaFunction = () => {
  return [
    { title: "Velg kontor - Kon2ro" },
    { name: "beskrivelse kommer...", content: "Kon2ro hjemmeside" },
  ];
};

export default function Index() {
  const [groups, setGroups] = React.useState<Group[]>([]);
  const [offices, setOffices] = React.useState<Office[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserGroup = async () => {
      const currentUser = clientAuth.currentUser;

      if (!currentUser) {
        navigate("/login");
        return;
      }

      const userDoc = await getDoc(doc(db, "users", currentUser.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        if (
          !data.groups ||
          !Array.isArray(data.groups) ||
          data.groups.length === 0
        ) {
          navigate("/create-group?message=noGroup");
          return;
        }

        const groupDocs = await Promise.all(
          data.groups.map((groupId: string) =>
            getDoc(doc(db, "groups", groupId))
          )
        );

        const userGroups = groupDocs
          .filter((doc) => doc.exists())
          .map((doc) => ({
            name: doc.data()?.name || doc.id,
            offices: doc.data()?.offices || [],
            memberUids: doc.data()?.memberUids || [],
          }));

        const officeDocs = await Promise.all(
          userGroups.flatMap((group) =>
            group.offices.map((officeId: string) =>
              getDoc(doc(db, "offices", officeId))
            )
          )
        );

        const userOffices = officeDocs
          .filter((doc) => doc.exists())
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

        setGroups(userGroups);
        setOffices(userOffices);
      }
    };

    checkUserGroup();
  }, [navigate]);

  return (
    <div className="flex-col h-screen">
      <h2>Velg Kontor</h2>
      <ul className="flex flex-col items-center justify-center gap-4 mt-10">
        {groups.map((group) => (
          <li key={group.name}>
            <h3>{group.name}</h3>
            <ul>
              {offices
                .filter((office) => group.offices.includes(office.id))
                .map((office) => (
                  <li key={office.id}>
                    <OfficeStickyNote
                      name={office.name}
                      description={office?.description}
                      address={office?.address}
                      />
                  </li>
                ))}
            </ul>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-center mt-10">
        <button
          className="bg-secondary-100 px-4 py-2 rounded hover:bg-secondary-hover-100 transition-all duration-300 hover:transform hover:scale-105"
          onClick={() => navigate("/create-group")}
        >
          <p className="hover:bg font-cooperblack">Opprett ny gruppe</p>
        </button>
      </div>
    </div>
  );
}
