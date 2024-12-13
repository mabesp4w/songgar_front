/** @format */

import ModalFull from "@/components/modal/ModalFull";
import AnnouncementsTypes from "@/types/AnnouncementsTypes";
import { momentId } from "@/utils/momentIndonesia";
import React from "react";

type Props = {
  announcement: AnnouncementsTypes | null;
  showModal: boolean;
  setShowModal: (data: boolean) => void;
};

const DetailAnnouncement = ({
  announcement,
  showModal,
  setShowModal,
}: Props) => {
  if (!announcement) {
    return null;
  }

  return (
    <ModalFull
      title={`${announcement?.title}`}
      showModal={showModal}
      setShowModal={setShowModal}
      width="90%"
    >
      <div className="flex flex-col gap-y-6">
        {/* judul */}
        <div>
          <h6 className="text-sm">
            {announcement?.major.major_nm}{" "}
            {announcement?.author ? `- ${announcement?.author}` : ""}
          </h6>
          <h5>
            Jayapura, {momentId(announcement?.announcement_date).format("LL")}
          </h5>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: announcement?.content || "" }}
          className="relative prose h-full  overflow-hidden"
        />
      </div>
    </ModalFull>
  );
};

export default DetailAnnouncement;
