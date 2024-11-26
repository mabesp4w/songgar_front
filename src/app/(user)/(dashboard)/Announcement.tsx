/** @format */

import useAnnouncementsApi from "@/stores/api/Announcements";
import { momentId } from "@/utils/momentIndonesia";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { BsMegaphone } from "react-icons/bs";

const Announcement: FC = () => {
  // store
  const { setAnnouncements, dtAnnouncements } = useAnnouncementsApi();
  // state
  const [shortContent, setShortContent] = useState("");

  useEffect(() => {
    setAnnouncements({});
  }, [setAnnouncements]);

  useEffect(() => {
    if (dtAnnouncements?.data[0]?.content) {
      const contentText = dtAnnouncements.data[0].content.replace(
        /<\/?[^>]+(>|$)/g,
        ""
      ); // Hapus HTML tags
      const truncatedText =
        contentText.length > 100
          ? contentText.substring(0, 100) + "..."
          : contentText;
      setShortContent(truncatedText);
    }
  }, [dtAnnouncements]);

  return dtAnnouncements ? (
    dtAnnouncements?.data.length > 0 && (
      <div className="max-h-fit">
        <div className="bg-primary rounded-t-xl text-accent py-3 mb-4">
          <div className="flex items-center gap-x-4 text-lg">
            <BsMegaphone />
            <span className="tracking-wide">Pengumuman</span>
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <p>
            {momentId(dtAnnouncements?.data[0]?.announcement_date).format(
              "DD/MM/YYYY"
            )}
          </p>
          <p
            className="font-bold text-lg"
            title={dtAnnouncements?.data[0]?.title}
          >
            {dtAnnouncements?.data[0]?.title?.length > 40
              ? dtAnnouncements.data[0].title.substring(0, 40) + "..."
              : dtAnnouncements.data[0].title}
          </p>
          <div
            className="prose"
            dangerouslySetInnerHTML={{
              __html: shortContent,
            }}
          />
        </div>
        <div>
          <Link
            href="#"
            className="text-muted border border-muted rounded-none mx-auto hover:rounded-sm p-2"
          >
            Selengkapnya
          </Link>
        </div>
      </div>
    )
  ) : (
    <div>Loading..</div>
  );
};

export default Announcement;
