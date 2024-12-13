/** @format */

import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "DASHBOARD FPKK",
  description: "WEBSITE RESMI FPKK UOGP",
};

type Props = {
  children: React.ReactNode;
};

const layout = (props: Props) => {
  return <main>{props.children}</main>;
};

export default layout;
