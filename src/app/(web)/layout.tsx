import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Header from "../../components/header";
import Toast from "@/components/toast";
import { ClerkProvider } from "@clerk/nextjs";

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-mulish",
});

export const metadata: Metadata = {
  title: "brand name website nigeria",
  description:
    "Shop high-quality skincare designed to fix real skin problems, not hide them. Trusted products for clear, healthy, confident skin.",
  keywords: [
    "skicare website in nigeria",
    "anual",
    "skincare products",
    "cerave",
    "clear dark spots",
  ],
  openGraph: {
    title: "brand name",
    url: "https://www.annaskincare.store",
    siteName: "Annasskincare",
    images: [{ url: "../../asset/images/annassecrets.png" }],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
      <html lang="en">
        <body className={mulish.variable}>
          <Toast />
          <main>
            <Header />
            <div>{children}</div>
            <Footer />
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
