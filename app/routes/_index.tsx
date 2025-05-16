import { type MetaFunction } from "@remix-run/node";
import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { auth as clientAuth, db } from "~/firebase.client";

export const meta: MetaFunction = () => {
  return [
    { title: "Kon2ro" },
    { name: "beskrivelse...", content: "Velkommen til Kon2ro" },
  ];
};

export default function Index() {
  const [userData, setUserData] = React.useState<any>(null);
  const [isInGroup, setIsInGroup] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchUserData = async () => {
      if (clientAuth.currentUser) {
        const userDoc = await getDoc(
          doc(db, "users", clientAuth.currentUser.uid)
        );
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData(data);

          if (
            data.groups &&
            Array.isArray(data.groups) &&
            data.groups.length > 0
          ) {
            setIsInGroup(true);
          } else {
            setIsInGroup(false);
          }
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="flex-col h-screen">
      <h2>Velkommen til Kon2ro!</h2>
      {userData && (
        <p className="text-secondary-100 font-cnew ">
          {isInGroup
            ? "Du er medlem av en eller flere grupper for øyeblikket."
            : "Du er ikke medlem av noen grupper."}
        </p>
      )}
    </div>
  );
}
