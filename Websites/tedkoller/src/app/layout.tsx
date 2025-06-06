import "../styles/main.css";
import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "Home | Ted Koller",
  description: "Ted Koller's professional portfolio | Includes projects in photography, web development, videography, design, compositing, and more...",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <link rel="icon" href="/images/icon.png" sizes="any" />
      <body>{children}</body>
      <meta property="og:title" content="Ted Koller's Portfolio" />
      <meta property="og:description" content="Ted Koller's professional portfolio | Includes projects in photography, web development, videography, design, compositing, and more..." />
      <meta property="og:image" content="/images/open-graph-image.jpg" />
      <meta name="keywords" content="Photography, Web Design, Videography, Kansas City, KC, Ted Koller, Photo, Video, Website" />
      <meta name="author" content="Ted Koller" />
    </html>
  );
}
