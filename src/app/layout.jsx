import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import FooterPage from "../components/FooterPage";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Himartisan",
  description: "We promote",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="w-full px-6 antialiased min-h-screen bg-gray-100 sm:px-8 md:px-15">
          <Navbar />
          {children}
          <FooterPage />
        </main>
      </body>
    </html>
  );
}
