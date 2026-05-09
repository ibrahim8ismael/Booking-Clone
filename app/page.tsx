'use client';

import { Hero } from '@/components/Hero';
import { Offers } from '@/components/Offers';
import { UniqueStays } from '@/components/UniqueStays';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Hero />
      <Offers />
      <UniqueStays />
      <FAQ />
      <div className="flex-grow" />
      <Footer />
    </main>
  );
}
