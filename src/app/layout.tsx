import "@/shared/styles/globals.css";
import { Inter } from "next/font/google";
import "@/shared/styles/antd-overrides.css";
import { Providers } from "@/shared/utils/providers/providers";
import { Header } from "@/widgets/header/ui/header";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
