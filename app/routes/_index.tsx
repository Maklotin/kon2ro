import React, { useEffect } from "react";
import { MetaFunction, useNavigate } from "@remix-run/react";
import { doc, getDoc } from "firebase/firestore";
import { auth as clientAuth, db } from "~/firebase.client";

export const meta: MetaFunction = () => {
  return [
    { title: "Kon2ro" },
    { name: "beskrivelse kommer...", content: "Kon2ro hjemmeside" },
  ];
};

export default function Index() {
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
        }
      }
    };

    checkUserGroup();
  }, [navigate]);

  return (
    <div className="flex-col h-screen">
      <h2>Velkommen til Kon2ro!</h2>
      <p className="text-secondary-100 font-cnew">
        Du er medlem av en eller flere grupper for øyeblikket.
      </p>
    </div>
  );
}
