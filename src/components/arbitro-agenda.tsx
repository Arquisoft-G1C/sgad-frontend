"use client";

import { Calendar as BigCalendar, dateFnsLocalizer, Views } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import es from "date-fns/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = { es };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date: Date) => startOfWeek(date, { weekStartsOn: 1 }),
  getDay,
  locales,
});

type EventType = {
  title: string;
  start: Date;
  end: Date;
  valor?: string;
};

type ArbitroAgendaProps = {
  events: EventType[];
};

export function ArbitroAgenda({ events }: ArbitroAgendaProps) {
  const handleSelectEvent = (event: EventType) => {
    alert(`${event.title}\nValor: ${event.valor ?? "N/A"}`);
  };

  return (
    <BigCalendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
      defaultView={Views.MONTH}
      style={{ height: 500 }}
      messages={{
        today: "Hoy",
        previous: "Anterior",
        next: "Siguiente",
        month: "Mes",
        week: "Semana",
        day: "Día",
        agenda: "Agenda",
      }}
      onSelectEvent={handleSelectEvent}
    />
  );
}
