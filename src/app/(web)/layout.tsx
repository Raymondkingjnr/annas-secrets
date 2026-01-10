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
  title: "Annas Secrets",
  description:
    "Butt and Hips Enlargement,Breast Enlargement, Breast Firming, weight Gain, weight loss, flat Tummy, vagina care,intimate care products,Infections product, Bumps and ingrown Hairs products ..All Natural and Effective 👌",
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
            <div className=" min-h-screen ">{children}</div>
            <Footer />
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
