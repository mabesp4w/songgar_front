/** @format */

import MajorsTypes from "./MajorsTypes";

// announcements
interface AnnouncementsTypes {
  id: string;
  major_id: string;
  title: string;
  content: string;
  slug: string;
  announcement_date: Date | string;
  author?: string;
  major: MajorsTypes;
}

export default AnnouncementsTypes;
