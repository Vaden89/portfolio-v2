import "../_voxx/voxx.css";

import { getConfig } from "./_data";
import type { ReactNode } from "react";

export default async function BlogLayout({
  children,
}: {
  children: ReactNode;
}) {
  const config = await getConfig();
  return <div className="voxx">{children}</div>;
}
