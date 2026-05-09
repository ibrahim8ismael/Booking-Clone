'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from './LanguageProvider';
import { BedDouble, Plane, TreePalm, Car, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

export function Header() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const navItems = [
    { name: language === 'ar' ? 'الإقامات' : 'Stays', icon: BedDouble, active: true },
    { name: language === 'ar' ? 'رحلات الطيران' : 'Flights', icon: Plane, active: false },
    { name: language === 'ar' ? 'الرحلات الجوية + الفنادق' : 'Flight + Hotel', icon: TreePalm, active: false },
    { name: language === 'ar' ? 'تأجير السيارات' : 'Car rentals', icon: Car, active: false },
  ];

  return (
    <header className="bg-[#0758AA] text-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="text-xl font-bold md:text-2xl">
            Booking.com
          </Link>
          
          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={toggleLanguage}
              className="p-2 hover:bg-white/10 rounded-sm"
              title="Change Language"
            >
              {language === 'ar' ? 'English' : 'عربي'}
            </button>
            <button className="hidden sm:block font-medium p-2 hover:bg-white/10 rounded-sm">?</button>
            
            <Link 
              href="/search"
              className="bg-[#FED852] text-[#0758AA] hover:bg-[#fbd141] font-bold px-6 py-2 rounded-sm text-sm transition-colors"
            >
              {language === 'ar' ? 'احجز الآن' : 'Book Now'}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
