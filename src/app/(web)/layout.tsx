import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Header from "../../components/header";
import Toast from "@/components/toast";

const poppins = Poppins({
  weight: "400", // or any other weight
  subsets: ["latin"],
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
    <html lang="en">
      <body className={poppins.className}>
        <Toast />
        <main>
          <Header />
          <div className=" min-h-screen ">{children}</div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
