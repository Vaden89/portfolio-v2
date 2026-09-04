import type { Metadata } from "next";
import { Bitcount_Prop_Double, Montserrat } from "next/font/google";
import "./globals.css";
import Providers from "~/contexts/providers";
import { Navbar } from "~/components/common/nav-bar";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
});

const bitcount = Bitcount_Prop_Double({
  subsets: ["latin"],
  variable: "--font-bitcount",
  weight: ["300", "400", "500", "600", "700"],
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
const siteName = "Isaac Shosanya";
const siteDescription =
  "Isaac Shosanya - Software Engineer & Gamer. Building a new reality one digital experience at a time.";
const keywords = [
  "Isaac Shosanya",
  "Software Engineer",
  "Web Developer",
  "Frontend Developer",
  "Backend Developer",
  "Full-Stack Developer",
  "Developer",
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Next.js",
  "Portfolio",
];

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  keywords: keywords.join(", "),
  referrer: "origin",
  authors: [
    {
      name: "Isaac Shosanya",
      url: baseUrl,
    },
  ],
  creator: "Isaac Shosanya",
  publisher: "Isaac Shosanya",
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  alternates: {
    canonical: baseUrl,
  },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
  },
  category: "technology",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    title: siteName,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    site: "@vadenisisaac",
    creator: "@vadenisisaac",
    title: siteName,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} ${bitcount.variable} antialiased min-h-screen w-full max-w-3xl mx-auto px-6 scrollbar`}
      >
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
