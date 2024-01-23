import "../styles/main.css";
import "animate.css";
import Head from 'next/head';

interface RootLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
  pageDescription?: string;
}

export default function RootLayout({ children, pageTitle, pageDescription }: RootLayoutProps) {
  const ogImagePath = '/images/open-graph-image.jpg';
  const title = pageTitle || "Home | Ted Koller Portfolio";
  const description = pageDescription || "Ted Koller's professional portfolio | Includes projects in photography, web development, videography, design, compositing, and more...";

  return (
    <html lang="en">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="Photography, Web Design, Videography" />
        <meta name="author" content="Ted Koller" />
        <link rel="icon" sizes="32x32" href="/images/favicon%2032x32.png" type="image/png" />
        <link rel="icon" sizes="192x192" href="/images/favicon%20192x192.png" type="image/png" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImagePath} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Head>
      <body>{children}</body>
    </html>
  );
}
