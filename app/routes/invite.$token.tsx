import { useEffect } from "react";
import { MetaFunction, useNavigate, useParams } from "@remix-run/react";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  getDocs,
  query,
  collection,
  where,
} from "firebase/firestore";
import { auth as clientAuth, db } from "~/firebase.client";
import React from "react";

export const meta: MetaFunction = () => {
  return [{ title: "gruppeinvitasjon - Kon2ro" }];
};


// Hele siden er generert med Github Copilot med GPT-4o

export default function Invite() {
  const { token } = useParams();
  const navigate = useNavigate();
  const hasProcessedInvite = React.useRef(false);

  useEffect(() => {
    const handleInvite = async () => {
      if (!token || hasProcessedInvite.current) return;

      hasProcessedInvite.current = true;

      try {
        const inviteDoc = await getDoc(doc(db, "invites", token));
        if (!inviteDoc.exists()) {
          alert("Ugyldig lenke!");
          navigate("/");
          return;
        }

        const { groupId } = inviteDoc.data();

        clientAuth.onAuthStateChanged(async (currentUser) => {
          if (!currentUser) {
            navigate(`/login?redirect=/invite/${token}`);
            return;
          }

          const userRef = doc(db, "users", currentUser.uid);

          const existingUsers = await getDocs(
            query(
              collection(db, "users"),
              where("groups", "array-contains", groupId)
            )
          );

          const usedColors = existingUsers.docs
            .map((doc) => doc.data().color)
            .filter((color) => color && color.bg && color.border);

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

          const availableColors = colors.filter(
            (color) => !usedColors.some((used) => used.bg === color.bg)
          );

          const assignedColor = availableColors.length
            ? availableColors[
                Math.floor(Math.random() * availableColors.length)
              ]
            : colors[Math.floor(Math.random() * colors.length)]; 

          await updateDoc(userRef, {
            groups: arrayUnion(groupId),
            color: assignedColor,
          });

          alert("Du har blitt lagt til i gruppen!");
          navigate("/");
        });
      } catch (error) {
        console.error("Error handling invite:", error);
        alert("Det oppsto et problem med å behandle invitasjonslenken.");
        navigate("/");
      }
    };

    handleInvite();
  }, [token, navigate]);

  return <p className="text-secondary-100">Behandler invitasjonslenke...</p>;
}
