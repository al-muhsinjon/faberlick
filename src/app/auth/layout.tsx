export const metadata = {
  title: "Faberlic",
  description: "Faberlic | store",
};

import { Toaster } from "react-hot-toast";
import "../globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
      <Toaster position="top-center" reverseOrder={false} />
        {children}</body>
    </html>
  );
}
