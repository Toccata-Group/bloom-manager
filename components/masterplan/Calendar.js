import React, { useState } from "react";
import moment from "moment";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

import styles from "~styles/components/masterplan/calendar.module.scss";

import CalendarToolbar from "~components/masterplan/CalendarToolbar";

const CalendarTab = () => {
  const [events, setEvents] = useState([
    {
      start: moment().toDate(),
      end: moment().toDate(),
      title: "Start Zinnia",
      type: "start",
    },
    {
      start: moment().toDate(),
      end: moment().add(1, "days").toDate(),
      title: "Harden off Lisianthus",
      type: "harden",
    },
    {
      start: moment("2022-07-10T17:31:19+00:00").toDate(),
      end: moment("2022-07-10T17:31:19+00:00").add(1, "days").toDate(),
      title: "Transplant Lisianthus",
      type: "transplant",
    },
  ]);

  const Calendar = withDragAndDrop(BigCalendar);

  const localizer = momentLocalizer(moment);

  const onEventResize = (data) => {
    const { start, end } = data;

    setEvents((state) => {
      state[0].start = start;
      state[0].end = end;
      return [...state];
    });
  };

  const moveEvent = ({ event, start, end }) => {
    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start, end };

    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);

    setEvents(nextEvents);
  };

  const eventStyleGetter = (event) => {
    let backgroundColor = "";
    switch (event.type) {
      case "start":
        backgroundColor = "#505168";
        break;
      case "harden":
        backgroundColor = "#707070";
        break;
      case "transplant":
        backgroundColor = "#eaf0ce";
        break;
      default:
        backgroundColor = "#505168";
    }

    let style = {
      backgroundColor,
      color: event.type === "transplant" ? "#2e2e2e" : "#fff",
    };

    return {
      style,
    };
  };

  return (
    <div className={styles.container}>
      <Calendar
        localizer={localizer}
        events={events}
        onEventDrop={moveEvent}
        eventPropGetter={eventStyleGetter}
        onEventResize={onEventResize}
        resizeable
        showAllEvents
        components={{ toolbar: CalendarToolbar }}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
};

export default CalendarTab;
