import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/components/LanguageProvider';
import { AuthProvider } from '@/components/AuthProvider';
import { Header } from '@/components/Header';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { Cairo } from "next/font/google";
import { cn } from "@/lib/utils";

const cairo = Cairo({subsets:['latin', 'arabic'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'Booking Clone',
  description: 'A clone of a booking website',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", cairo.variable)}>
      <body>
        <LanguageProvider>
          <AuthProvider>
            <Header />
            {children}
            <WhatsAppButton />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
