import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Access: Moonshot AI Europe",
  robots: { index: false, follow: false },
};

export default function GateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
