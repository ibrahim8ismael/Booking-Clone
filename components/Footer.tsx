'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from './LanguageProvider';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export function Footer() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <footer className="bg-[#0758AA] text-white py-12 mt-12 text-sm font-medium">
      <div className="max-w-6xl mx-auto px-4">
        {/* Simple Links */}
        <div className="flex flex-col md:flex-row justify-center gap-8 mb-8 border-b border-white/20 pb-8 text-center">
          <Link href="/policies" className="hover:underline text-white/90">{isAr ? 'السياسات والشروط' : 'Policies & Terms'}</Link>
          <Link href="/tours" className="hover:underline text-white/90">{isAr ? 'رحلاتنا' : 'Our Tours'}</Link>
          <Link href="/about" className="hover:underline text-white/90">{isAr ? 'عن الشركة' : 'About Us'}</Link>
          <Link href="/contact" className="hover:underline text-white/90">{isAr ? 'تواصل معنا' : 'Contact Us'}</Link>
        </div>

        <div className="text-center mb-8 border-b border-white/20 pb-8">
          <h3 className="text-xl font-bold mb-4">{isAr ? 'ابدأ رحلتك الآن.. تواصل مع مستشارك السياحي' : 'Start your journey now.. Contact your travel consultant'}</h3>
          <p className="text-white/80 mb-2">
            <strong>{isAr ? 'المقر الرئيسي:' : 'Headquarters:'}</strong> {isAr ? '2 ش عمر حفني، أمام مسجد بلال، خلف مصر للطيران، عباس العقاد، مدينة نصر , Cairo, Egypt' : '2 Omar Hefny St., in front of Bilal Mosque, behind EgyptAir, Abbas El Akkad, Nasr City, Cairo, Egypt'}
          </p>
          <p className="text-white/80">
            <strong>{isAr ? 'الخط الساخن/ الواتساب:' : 'Hotline / WhatsApp:'}</strong> <a href="https://wa.me/201208222245" className="hover:underline hover:text-white" dir="ltr">201208222245</a>
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between font-normal gap-4">
          <div className="text-center md:text-left rtl:text-right">
            <p className="mb-2">
              {isAr ? 'حقوق الطبع والنشر © 2026 ساعة وساعة. جميع الحقوق محفوظة.' : 'Copyright © 2026 Sa2a wi Sa2a. All rights reserved.'}
            </p>
            <p className="text-white/60 text-xs">
              {isAr ? 'تم بناء هذه النسخة لأغراض تعليمية باستخدام AI Studio.' : 'Clone built for educational purposes with AI Studio.'}
            </p>
          </div>
          <div className="flex items-center gap-4 text-white hover:[&>a]:scale-110 [&>a]:transition-transform">
            <a href="#" aria-label="Facebook">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" aria-label="Twitter">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="#" aria-label="Instagram">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" aria-label="YouTube">
              <Youtube className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
