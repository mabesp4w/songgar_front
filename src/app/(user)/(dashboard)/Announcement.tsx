/** @format */

import LoadingSpiner from "@/components/loading/LoadingSpiner";
import useAnnouncementsApi from "@/stores/api/Announcements";
import { momentId } from "@/utils/momentIndonesia";
import Link from "next/link";
import { FC, useCallback, useEffect, useState } from "react";
import { BsMegaphone } from "react-icons/bs";

const Announcement: FC = () => {
  // store
  const { setAnnouncements, dtAnnouncements } = useAnnouncementsApi();
  const [isLoading, setIsLoading] = useState(true);
  // state
  const [shortContent, setShortContent] = useState("");
  // get announcement
  const getData = useCallback(async () => {
    setIsLoading(true);
    await setAnnouncements({});
    setIsLoading(false);
  }, [setAnnouncements]);

  useEffect(() => {
    getData();
  }, [getData, setAnnouncements]);

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

  console.log({ dtAnnouncements });
  if (isLoading) {
    return <LoadingSpiner />;
  }
  return (
    <div className="max-h-fit">
      <div className="bg-primary rounded-t-xl mb-4 text-secondary py-3 px-3">
        <div className="flex items-center gap-x-4 text-lg">
          <BsMegaphone />
          <span className="tracking-wide">Pengumuman</span>
        </div>
      </div>
      <div className="flex flex-col gap-y-2  px-3">
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
            : dtAnnouncements.data[0]?.title}
        </p>
        <div
          className="prose"
          dangerouslySetInnerHTML={{
            __html: shortContent,
          }}
        />
      </div>
      <div className=" px-3">
        <Link
          href="#"
          className="text-muted border border-muted rounded-none mx-auto hover:rounded-sm p-2"
        >
          Selengkapnya
        </Link>
      </div>
    </div>
  );
};

export default Announcement;
