import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timegridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { MetaFunction, useLoaderData } from "@remix-run/react";
import { getWeek } from "date-fns";
import { CalendarOptions } from "@fullcalendar/core/index.js";
import React from "react";
import { auth as clientAuth, db } from "~/firebase.client";
import {
  query,
  collection,
  where,
  getDocs,
  getDoc,
  doc,
  addDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { Button } from "~/components/ui-library";

export const meta: MetaFunction = ({ data }) => {
  const officeName = (
    data as { officeNameParams?: string }
  )?.officeNameParams?.replace(/_/g, " ");
  return [{ title: `${officeName ?? "Kontor"} - Kon2ro` }];
};

export async function loader({ params }: any) {
  const { officeName } = params;

  if (!officeName) {
    throw new Error("Office name is required");
  }

  return { officeNameParams: officeName };
}

export default function Calendar() {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [officeData, setOfficeData] = React.useState<any>(null);
  const [username, setUsername] = React.useState<string | null>(null);
  const [events, setEvents] = React.useState<any[]>([]);
  const { officeNameParams } = useLoaderData<{ officeNameParams: string }>();
  const officeName = officeNameParams?.replace(/_/g, " ");

  React.useEffect(() => {
    const unsubscribe = clientAuth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            const names = data.name.split(" ");
            const lastInitial =
              names.length > 1 ? names[names.length - 1][0] : "";
            setUsername(names[0] + " " + lastInitial + ".");
          }
          await fetchOffice();
        } catch (error) {
          console.error("Error fetching user or office data:", error);
          setError("Failed to load user or office data");
        } finally {
          setLoading(false);
        }
      } else {
        console.error("No user is logged in");
        setError("User not logged in");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [officeName]);

  const fetchOffice = async () => {
    if (!officeName) return;

    try {
      const officeQuery = query(
        collection(db, "offices"),
        where("name", "==", officeName)
      );
      const officeSnapshot = await getDocs(officeQuery);
      if (!officeSnapshot.empty) {
        setOfficeData(officeSnapshot.docs[0].data());
      } else {
        console.error("Office not found");
        setError("Office not found");
      }
    } catch (error) {
      console.error("Error fetching office data:", error);
      setError("Failed to load office data");
    }
  };

  const generateInviteLink = async () => {
    if (!officeData) {
      setError("Office data is not loaded.");
      return;
    }

    try {
      const inviteToken = uuidv4();

      await setDoc(doc(db, "invites", inviteToken), {
        groupId: officeData.group,
        createdAt: new Date().toISOString(),
      });

      const inviteLink = `${window.location.origin}/invite/${inviteToken}`;

      await navigator.clipboard.writeText(inviteLink);

      alert("Invitasjonslenke er kopiert til utklippstavlen!");
    } catch (error) {
      console.error("Error generating invite link:", error);
      setError("Failed to generate invite link.");
    }
  };

  React.useEffect(() => {
    if (officeData) {
      fetchEvents();
    }
  }, [officeData]);

  async function fetchEvents() {
    if (!officeData) return;

    try {
      const eventsQuery = query(
        collection(db, "timestamps"),
        where("officeId", "==", officeData.id)
      );
      const eventsSnapshot = await getDocs(eventsQuery);
      const eventsData = eventsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventsData);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("Failed to load events");
    }
  }

  const handleDateSelect = async (selectInfo: any) => {
    if (!officeData || !username) return;

    const currentUser = clientAuth.currentUser;
    if (!currentUser) {
      alert("Du må være logget inn for å opprette en hendelse.");
      return;
    }

    try {
      const userDoc = await getDoc(doc(db, "users", currentUser.uid));
      if (!userDoc.exists()) {
        alert("Brukerdata ikke funnet.");
        return;
      }

      const userData = userDoc.data();
      const userColor = userData.color || { bg: "#673030", border: "#3d1d1d" };

      const newEvent = {
        title: `${username} - På kontoret`,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        officeId: officeData.id,
        uid: currentUser.uid,
        backgroundColor: userColor.bg,
        borderColor: userColor.border,
      };

      const eventRef = await addDoc(collection(db, "timestamps"), newEvent);

      setEvents((prevEvents) => [
        ...prevEvents,
        { id: eventRef.id, ...newEvent },
      ]);
    } catch (error) {
      console.error("Error creating event:", error);
      setError("Det oppsto et problem under lagring av tidspunktet");
    }
  };

  const handleEventClick = async (clickInfo: any) => {
    const currentUser = clientAuth.currentUser;
    if (!currentUser) {
      alert("Du må være logget inn for å redigere tidspunkt.");
      return;
    }

    const eventCreatorUid = clickInfo.event.extendedProps.uid;
    if (eventCreatorUid !== currentUser.uid) {
      alert("Du kan ikke redigere andres tidspunkt.");
      return;
    }

    if (confirm("Er du sikker på at du vil slette dette tidspunktet?")) {
      try {
        await deleteDoc(doc(db, "timestamps", clickInfo.event.id));

        setEvents((prevEvents) =>
          prevEvents.filter((event) => event.id !== clickInfo.event.id)
        );

      } catch (error) {
        console.error("Error deleting event:", error);
        alert("Det oppsto et problem under sletting av tidspunktet.");
      }
    }
  };
  const options: CalendarOptions = {
    initialView: "timeGridWeek",
    plugins: [dayGridPlugin, timegridPlugin, interactionPlugin],
    nowIndicator: true,
    selectable: true,
    select: handleDateSelect,
    events: events,
    eventClick: handleEventClick,
    editable: true,
    eventResizableFromStart: true,
    scrollTime: "06:30:00",
    locale: "nb",
    views: {
      timeGridWeek: {
        allDaySlot: false,
      },
      timeGridDay: {
        allDaySlot: false,
      },
    },
    slotLabelFormat: {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    },
    eventTimeFormat: {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    },
    titleFormat: customTitleFormatter,
  };

  function customTitleFormatter() {
    const currentWeek = getWeek(new Date());
    return `Uke ${currentWeek}`;
  }

  if (loading) {
    return <p className="text-secondary-100">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="flex flex-col items-center h-1/2 w-2/3">
      <h1>{officeName}</h1>
      <FullCalendar {...options} height={700} />
      <Button className="mt-8" onClick={generateInviteLink}>
        <p>Generer Invitasjonslenke</p>
      </Button>
    </div>
  );
}
