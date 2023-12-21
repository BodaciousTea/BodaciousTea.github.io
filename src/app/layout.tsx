import "../styles/main.css";
import "animate.css";
import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "TED KOLLER",
  description: "Ted Koller, Multimedia Professional | Photographer | Web Designer | Videographer | Drone Pilot and more...",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
