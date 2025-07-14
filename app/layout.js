// layout.js
import "./globals.css";
import { ReduxProvider } from "@/app/providers";
import ClientLayoutWrapper from "./components/ClientLayoutWrapper"; // 👈 create this

export default function RootLayout({ children }) {
  return (
    <html lang="en" lang="hi">
      <body>
        <ReduxProvider>
          <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
