export const metadata = {
  title: "Faberlic",
  description: "Faberlic | store",
};

import "../globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
