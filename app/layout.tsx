import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "@/style/index.scss";
import { Providers } from "@/lib";

const inter = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Insiders Test 1",
  description: "Test 1 for Insiders",
  icons: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
