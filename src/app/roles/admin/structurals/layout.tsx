/** @format */

import React, { Suspense } from "react";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Halaman Jabatan Struktural",
};

type Props = {
  children: React.ReactNode;
};

const layout = (props: Props) => {
  return (
    <Suspense>
      <>{props.children}</>
    </Suspense>
  );
};

export default layout;
