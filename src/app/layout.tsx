import "../styles/main.css";
import "animate.css";
import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "TED KOLLER",
  description: "The Photographer | Videographer | Web Designer | Drone Pilot",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
