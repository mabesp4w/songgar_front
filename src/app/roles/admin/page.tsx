/** @format */

import { redirect } from "next/navigation";

export default function Home() {
  redirect("/roles/admin/dashboard");
}
