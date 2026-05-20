import type { Metadata } from "next";
import ClientLayout from "./client-layout";
import "../styles.css";

export const metadata: Metadata = {
  title: "THE HOTEL 360",
  description:
    "Hotel Harmony Hub is a comprehensive hotel management platform for modern hospitality businesses.",
  authors: [{ name: "Lovable" }],
  openGraph: {
    title: "THE HOTEL 360",
    description:
      "Hotel Harmony Hub is a comprehensive hotel management platform for modern hospitality businesses.",
    type: "website",
    images: [
      {
        url: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/daf1c875-65a7-4020-abb5-22ca5f2ea65d/id-preview-f4ad31ce--61013178-72b3-4086-8923-e9d8d02fe5ba.lovable.app-1778143052699.png",
      },
    ],
  },
  twitter: {
    card: "summary",
    site: "@Lovable",
    title: "THE HOTEL 360",
    description:
      "Hotel Harmony Hub is a comprehensive hotel management platform for modern hospitality businesses.",
    images: [
      "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/daf1c875-65a7-4020-abb5-22ca5f2ea65d/id-preview-f4ad31ce--61013178-72b3-4086-8923-e9d8d02fe5ba.lovable.app-1778143052699.png",
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+Bengali:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
