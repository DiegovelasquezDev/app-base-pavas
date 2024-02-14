import React from "react";
import { EventComponent, WrapperComponent } from "../../components";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function Calendar() {
  const handleDateClick = (arg) => {
    // bind with an arrow function
    alert(arg.dateStr);
  };
  return (
    <WrapperComponent category={"Pages"} title={"Calendario"}>
      <EventComponent />
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        dateClick={handleDateClick}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "today prev next",
          center: "title",
          end: "dayGridMonth timeGridWeek timeGridDay",
        }}
        weekends={false}
        events={[
          { title: "event 1", date: "2023-12-04" },
          { title: "event 2", date: "2023-12-05" },
        ]}
      />
    </WrapperComponent>
  );
}
