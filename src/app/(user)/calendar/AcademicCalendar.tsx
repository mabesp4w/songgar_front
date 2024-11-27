/** @format */
"use client";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import useAcademicCalendarsApi from "@/stores/api/AcademicCalendars";
import AcademicCalendarsTypes from "@/types/AcademicCalendarsTypes";
import React, { useCallback, useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment); // or globalizeLocalizer
type View = "month" | "week" | "work_week" | "day" | "agenda";

const ListAcademicCalendars = () => {
  // state
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<View>("month"); // Default view: "month"
  const [events, setEvents] = useState<any>([]);

  const { setAcademicCalendarsAll, dtAcademicCalendars } =
    useAcademicCalendarsApi();
  // get AcademicCalendars
  const getCalendar = useCallback(async () => {
    setIsLoading(true);
    await setAcademicCalendarsAll({});
    setIsLoading(false);
  }, [setAcademicCalendarsAll]);

  useEffect(() => {
    getCalendar();

    return () => {};
  }, [getCalendar]);

  useEffect(() => {
    const formattedEvents = dtAcademicCalendars.data.map(
      (event: AcademicCalendarsTypes) => ({
        title: event.nm_event, // Gunakan nm_event sebagai title
        start: new Date(event.start_date), // Konversi start_date ke objek Date
        end: new Date(event.end_date || ""), // Konversi end_date ke objek Date
      })
    );

    setEvents(formattedEvents);
    return () => {};
  }, [dtAcademicCalendars.data]);

  return (
    <section className="container grow mt-10">
      {isLoading && (
        <div className="w-full flex justify-center items-center">
          <LoadingSpiner />
        </div>
      )}
      {!isLoading && (
        <div className="h-[50svh]">
          <Calendar
            localizer={localizer}
            events={events}
            date={currentDate}
            view={currentView} // Kontrol tampilan dengan state
            onNavigate={(newDate) => setCurrentDate(newDate)} // Update tanggal saat navigasi
            onView={(view) => setCurrentView(view)} // Update tampilan saat view berubah
            views={["month", "week", "day", "agenda"]} // Semua tampilan
            toolbar={true}
          />
        </div>
      )}
    </section>
  );
};

export default ListAcademicCalendars;
