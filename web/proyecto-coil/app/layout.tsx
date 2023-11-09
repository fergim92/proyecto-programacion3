import "./globals.css";
import type { Metadata } from "next";
import { Suspense } from "react";
import Loading from "./loading";
import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";
import ThemeContext from "../components/ContextProvider/toggle-color-mode";

export const metadata: Metadata = {
  title: "Proyecto COIL",
  description: "PUCP-UNRN",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Suspense fallback={<Loading />}>
        <body
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ThemeContext>
            <Header />
            {children}
            <Footer />
          </ThemeContext>
        </body>
      </Suspense>
    </html>
  );
}
