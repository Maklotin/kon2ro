import { useEffect } from "react";
import { useNavigate, useParams } from "@remix-run/react";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { auth as clientAuth, db } from "~/firebase.client";

// Hele siden er generert med Github Copilot med GPT-4o

export default function Invite() {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleInvite = async () => {
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const inviteDoc = await getDoc(doc(db, "invites", token));
        if (!inviteDoc.exists()) {
          alert("Ugyldig lenke!.");
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
          await updateDoc(userRef, {
            groups: arrayUnion(groupId),
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

  return <p>Behandler invitasjonslenke...</p>;
}
