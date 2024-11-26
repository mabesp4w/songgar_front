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
  return props.children;
};

export default layout;
