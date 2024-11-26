/** @format */

// academicCalendars
interface AcademicCalendarsTypes {
  id: string;
  nm_event: string;
  start_date: Date | string;
  end_date?: Date | string;
  description?: string;
}

export default AcademicCalendarsTypes;
