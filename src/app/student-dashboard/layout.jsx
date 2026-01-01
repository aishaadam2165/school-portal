
import BootstrapClient from "@/components/BootstrapClient";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "School Portal",
  description: "Manage your school experience online",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
        />
      </head>

      <body>
        <BootstrapClient />

        <Navbar />   

        <main>{children}</main>
      </body>
    </html>
  );
}
