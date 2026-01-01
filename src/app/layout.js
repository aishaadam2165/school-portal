import "./globals.css";
import BootstrapClient from "@/components/BootstrapClient";

export const metadata = {
  title: "School Portal",
  description: "Manage your school experience online",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Bootstrap Icons */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
        />
      </head>

      <body>
        <BootstrapClient />
        <main>{children}</main>
      </body>
    </html>
  );
}
