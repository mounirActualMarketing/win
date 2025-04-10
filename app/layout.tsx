import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from 'next/font/local';
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Montserrat-Arabic font configuration
const montserratArabic = localFont({
  src: [
    {
      path: '../public/fonts/Montserrat-Arabic-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Montserrat-Arabic-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-montserrat-arabic',
});

export const metadata: Metadata = {
  title: "Wall Street English Saudi Arabia",
  description: "Learn English with Wall Street English Saudi Arabia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <Script 
          id="google-tag-manager"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-4EF7PZNTL0"
        />
        <Script 
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-4EF7PZNTL0');
            `
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserratArabic.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
