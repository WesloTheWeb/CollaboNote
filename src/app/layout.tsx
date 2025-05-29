import { cherryBomb, roboto, dynapuff, notoSansTagalog, outfit } from "./fonts/fonts";
import type { Metadata } from "next";
import "./globals.scss";
import Header from "@/components/Header/Header";
import { SessionStoreProvider, ReduxStoreProvider, ReactQueryProvider } from "@/components/Providers";
import Footer from "@/components/Footer/Footer";
import DashboardWrapper from "@/components/Dashboard/DashboardWrapper/DashboardWrapper";

export const metadata: Metadata = {
  title: "CollaboNote",
  description: "A place to collaborate and celebrate our wins over our goals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cherryBomb.variable} ${roboto.variable} ${dynapuff.variable} ${notoSansTagalog.variable} ${outfit.variable}`}>
        <ReactQueryProvider>
          <SessionStoreProvider>
            <ReduxStoreProvider>
              <Header />
              <DashboardWrapper>
                {children}
              </DashboardWrapper>
              <Footer />
            </ReduxStoreProvider>
          </SessionStoreProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
