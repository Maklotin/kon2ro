import { Button } from "~/components/ui-library";
import {
  doc,
  deleteDoc,
  updateDoc,
  arrayRemove,
  getDocs,
  query,
  collection,
  where,
} from "firebase/firestore";
import { useParams, useNavigate, Link } from "@remix-run/react";
import { db } from "~/firebase.client";

export default function GroupSettings() {
  // Slettefunksjon er generert med Github Copilot modell GPT-4p
  const { groupName } = useParams();
  const navigate = useNavigate();

  const handleDeleteGroup = async () => {
    if (
      !confirm(
        "Er du sikker på at du vil slette denne gruppen? Dette kan ikke angres."
      )
    ) {
      return;
    }

    try {
      const groupQuery = query(
        collection(db, "groups"),
        where("name", "==", groupName)
      );
      const groupSnapshot = await getDocs(groupQuery);

      if (groupSnapshot.empty) {
        alert("Gruppen finnes ikke.");
        return;
      }

      const groupDoc = groupSnapshot.docs[0];
      const groupId = groupDoc.id;
      const groupData = groupDoc.data();

      if (groupData.memberUids && Array.isArray(groupData.memberUids)) {
        for (const userId of groupData.memberUids) {
          const userRef = doc(db, "users", userId);
          await updateDoc(userRef, {
            groups: arrayRemove(groupId),
          });
        }
      }

      if (groupData.offices && Array.isArray(groupData.offices)) {
        for (const officeId of groupData.offices) {
          const officeRef = doc(db, "offices", officeId);

          const timestampsQuery = query(
            collection(db, "timestamps"),
            where("officeId", "==", officeId)
          );
          const timestampsSnapshot = await getDocs(timestampsQuery);
          for (const timestampDoc of timestampsSnapshot.docs) {
            await deleteDoc(timestampDoc.ref);
          }

          await deleteDoc(officeRef);
        }
      }

      await deleteDoc(doc(db, "groups", groupId));

      alert("Gruppen og alle kontor har blitt slettet.");
      navigate("/");
    } catch (error) {
      console.error("Error deleting group:", error);
      alert("Det oppsto et problem med å slette gruppen.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1>Gruppeinnstillinger</h1>

      <Link to="/" className="bg-secondary-100 flex items-center p-2 rounded-md mt-12 hover:bg-secondary-hover-100 transition duration-200 hover:scale-105">
        <i className="ri-arrow-left-long-line text-secondary-300 text-4xl mr-2"></i>
        <p className="font-cooperblack">Tilbake</p>
      </Link>

      <Button
        onClick={handleDeleteGroup}
        className="mt-12 bg-red-500 hover:bg-red-300 flex items-center p-2"
      >
        <i className="ri-delete-bin-line text-red-950 mr-2"></i>
        <p className="text-red-950 font-cnew">Slett gruppe?</p>
      </Button>
    </div>
  );
}
