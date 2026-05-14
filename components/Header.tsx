'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from './LanguageProvider';
import { useAuth } from './AuthProvider';
import { BedDouble, Plane, TreePalm, Car, Menu, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { usePathname } from 'next/navigation';

export function Header() {
  const { language, setLanguage } = useLanguage();
  const { isLoggedIn } = useAuth();
  const pathname = usePathname();

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const navItems = [
    { name: language === 'ar' ? 'الإقامات' : 'Stays', icon: BedDouble, active: true },
    { name: language === 'ar' ? 'رحلات الطيران' : 'Flights', icon: Plane, active: false },
    { name: language === 'ar' ? 'الرحلات الجوية + الفنادق' : 'Flight + Hotel', icon: TreePalm, active: false },
    { name: language === 'ar' ? 'تأجير السيارات' : 'Car rentals', icon: Car, active: false },
  ];

  return (
    <header className="bg-[#FED852] text-[#0758AA]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="text-xl font-bold md:text-2xl">
            Booking.com
          </Link>
          
          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={toggleLanguage}
              className="p-2 hover:bg-black/5 rounded-sm font-bold"
              title="Change Language"
            >
              {language === 'ar' ? 'English' : 'عربي'}
            </button>
            
            {isLoggedIn ? (
              <Link 
                href="/profile"
                className="bg-[#0758AA] text-white hover:bg-[#064a91] font-bold px-4 py-2 rounded-sm text-sm transition-colors flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">{language === 'ar' ? 'الملف الشخصي' : 'Profile'}</span>
              </Link>
            ) : (
              <Link 
                href="/signin"
                className="bg-[#0758AA] text-white hover:bg-[#064a91] font-bold px-6 py-2 rounded-sm text-sm transition-colors"
              >
                {language === 'ar' ? 'تسجيل الدخول' : 'Sign in'}
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
