import "@/shared/styles/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/shared/utils/providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
