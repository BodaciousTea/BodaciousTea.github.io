import "../styles/main.css";
import Head from 'next/head';

export default function RootLayout({children}: {children: React.ReactNode}) {
  const title = "Home | Ted Koller Portfolio";
  const description = "Ted Koller, Multimedia Professional | Photographer | Web Designer | Videographer | Drone Pilot and more...";
  const ogImagePath = '/images/open-graph-image.jpg';

  return (
    <html lang="en">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="Photography, Web Design, Videography, Drone Piloting, Multimedia" />
        <meta name="author" content="Ted Koller" />
        <link rel="icon" sizes="32x32" href="/images/favicon%2032x32.png" type="image/png" />
        <link rel="icon" sizes="192x192" href="/images/favicon%20192x192.png" type="image/png" />

        {/* Open Graph tags */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImagePath} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />

        {/* Twitter Card tags */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={ogImagePath} />
      </Head>
      <body>{children}</body>
    </html>
  );
}
