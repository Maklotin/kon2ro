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
} from "firebase/firestore";

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

  const handleDateSelect = (selectInfo: any) => {
    const newEvent = {
      id: `${Date.now()}`,
      title: username + " - På kontoret",
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      backgroundColor: "#673030",
      borderColor: "#3d1d1d",
    };
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  const handleEventClick = (clickInfo: any) => {
    if (
      confirm(
        "Er du sikker på at du vil slette dette tidspunktet?"
      )
    ) {
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== clickInfo.event.id)
      );
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
    </div>
  );
}
