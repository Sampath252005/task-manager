// app/layout.js
'use client';

import './globals.css';
import { ReduxProvider } from './providers';
import ClientLayoutWrapper from './components/ClientLayoutWrapper';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
