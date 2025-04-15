import type { Metadata } from "next";
import { Montserrat } from 'next/font/google';
import { Inter as GeistSans } from 'next/font/google';
import { Roboto_Mono as GeistMono } from 'next/font/google';
import "./globals.css";
import Script from "next/script";

const montserratArabic = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
});

const geistSans = GeistSans({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const geistMono = GeistMono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  title: "Wall Street English Saudi Arabia",
  description: "Learn English with Wall Street English Saudi Arabia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
        {/* HubSpot Tracking Code */}
        <Script
          id="hubspot-tracking"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(d,s,i,r) {
                if (d.getElementById(i)){return;}
                var n=d.createElement(s),e=d.getElementsByTagName(s)[0];
                n.id=i;n.src='//js.hsforms.net/forms/embed/v2.js';
                e.parentNode.insertBefore(n,e);
              })(document,'script','hs-form-loader');
            `
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${montserratArabic.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
