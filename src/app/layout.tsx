import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Заметки',
  description: 'Приложение для заметок',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${poppins.variable} antialiased`}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height initial-scale=1.0"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
