import React, { useEffect, useState } from "react";
import { MetaFunction, useNavigate } from "@remix-run/react";
import { doc, getDoc } from "firebase/firestore";
import { auth as clientAuth, db } from "~/firebase.client";
import { Group, Office } from "~/schema/group-office.schema";
import { OfficeStickyNote } from "~/components/ui-library";

export const meta: MetaFunction = () => {
  return [{ title: "Velg kontor - Kon2ro" }];
};

export default function Index() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [offices, setOffices] = useState<Office[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserGroup = async () => {
      setLoading(true);
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
      setLoading(false);
    };

    checkUserGroup();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-secondary-100 font-cooperblack text-2xl">
          Laster...
        </p>
      </div>
    );
  }

  return (
    <div className="flex-col items-center h-screen">
      <h1 className="text-center">Velg Kontor</h1>
      <ul className="flex flex-col items-center justify-center gap-4 mt-10">
        {groups.map((group) => (
          <li key={group.name}>
            <h3 className="text-center">{group.name}</h3>
            <ul className="flex flex-row items-center justify-center gap-4 mt-4">
              {offices
                .filter((office) => group.offices.includes(office.id))
                .map((office) => (
                  <li key={office.id}>
                    <OfficeStickyNote
                      id={office.id}
                      name={office.name}
                      description={office?.description}
                      address={office?.address}
                      group={group.name}
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
