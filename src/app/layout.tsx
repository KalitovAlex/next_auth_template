import "@/shared/styles/globals.css";
import { Inter } from "next/font/google";
import "@/shared/styles/antd-overrides.css";
import { Providers } from "@/shared/utils/providers/providers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
