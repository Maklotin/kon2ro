import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timegridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { MetaFunction, useLoaderData } from "@remix-run/react";
import { getWeek } from "date-fns";
import { CalendarOptions } from "@fullcalendar/core/index.js";

export const meta: MetaFunction = ({ data }) => {
  const officeName = (data as { officeNameParams?: string })?.officeNameParams?.replace(/_/g, " ");
  return [{ title: `${officeName ?? "Kontor"} - Kon2ro` }];
};

export async function loader({ params }: any) {
  const { officeName } = params;

  if (!officeName) {
    throw new Error("Office name is required");
  }

  return { officeNameParams: officeName };
}

export default function OfficePage() {
  const { officeNameParams } = useLoaderData<{ officeNameParams: string }>();

  const officeName = officeNameParams?.replace(/_/g, " ");

  console.log("Office URL Name:", officeName);

  const options: CalendarOptions = {
    initialView: "timeGridWeek",
    plugins: [dayGridPlugin, timegridPlugin, interactionPlugin],
    nowIndicator: true,
    selectable: true,
    select: handleDateSelect,
    events: [],
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

  function handleDateSelect(selectInfo: any) {
    const start = selectInfo.startStr;
    const end = selectInfo.endStr;
    console.log("Selected time range:", start, "to", end);
  }
  function handleEventClick(clickInfo: any) {
    const eventId = clickInfo.event.id;
    console.log("Clicked event ID:", eventId);
  }
  function customTitleFormatter() {
    const currentWeek = getWeek(new Date());
    return `Uke ${currentWeek}`;
  }

  return (
    <div className="flex flex-col items-center h-1/2 w-2/3">
      <h1>{officeName}</h1>
      <FullCalendar {...options} height={700} />
    </div>
  );
}
