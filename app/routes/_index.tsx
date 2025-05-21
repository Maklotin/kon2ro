import React, { useEffect, useState } from "react";
import { Link, MetaFunction, useNavigate } from "@remix-run/react";
import { doc, getDoc } from "firebase/firestore";
import { auth as clientAuth, db } from "~/firebase.client";
import { Group, Office } from "~/schema/group-office.schema";
import { Button, OfficeStickyNote } from "~/components/ui-library";

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
    <div className="flex-col items-center">
      <h1 className="text-center">Velg Kontor</h1>
      <ul className="flex flex-col items-center justify-center gap-4 mt-10">
        {groups.map((group) => (
          <li key={group.name}>
            <div className="flex justify-evenly items-center w-screen">
              <hr className="w-1/3 border-secondary-100 border-b-2" />
              <Link to={`/groups/${group.name}/settings`}>
                <h3 className="text-center hover:text-secondary-hover-100">{group.name}</h3>
              </Link>
              <hr className="w-1/3 border-secondary-100 border-b-2" />
            </div>
            <ul className="flex flex-row flex-wrap items-center justify-center gap-4 mt-4">
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
        <Button
          onClick={() => navigate("/create-group")}
        >
          <p className="hover:bg font-cooperblack">Opprett ny gruppe</p>
        </Button>
      </div>
    </div>
  );
}
