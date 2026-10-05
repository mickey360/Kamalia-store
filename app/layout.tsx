import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kamalia — Pakistani Heritage, Woven for Today",
  description: "Shop authentic Kamalia khaddar, karandi, lawn, shawls, kameez shalwar and Pakistani heritage wear, delivered across Pakistan.",
  icons: { icon: "/icon.svg", apple: "/logo-mark.svg" },
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="en"><body>{children}</body></html>;
}
