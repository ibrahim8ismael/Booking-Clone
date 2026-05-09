'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from './LanguageProvider';

export function Footer() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <footer className="bg-[#0758AA] text-white py-12 mt-12 text-sm font-medium">
      <div className="max-w-6xl mx-auto px-4">
        {/* Newsletter Section */}
        <div className="bg-[#064a91] -mx-4 px-4 py-8 mb-12 flex flex-col items-center text-center">
          <h2 className="text-2xl font-light mb-2">
            {isAr ? 'وفر وقتك ومالك!' : 'Save time, save money!'}
          </h2>
          <p className="text-white/80 mb-6">
            {isAr ? 'اشترك وسنرسل لك أفضل العروض' : "Sign up and we'll send the best deals to you"}
          </p>
          <div className="flex w-full max-w-md gap-2">
            <input 
              type="email" 
              placeholder={isAr ? 'عنوان بريدك الإلكتروني' : 'Your email address'} 
              className="flex-grow px-4 py-3 rounded-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#FED852]" 
            />
            <button className="bg-[#0071c2] hover:bg-[#005999] px-6 py-3 rounded-sm font-bold text-lg transition-colors border border-white/20">
              {isAr ? 'اشترك' : 'Subscribe'}
            </button>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12 border-b border-white/20 pb-12">
          <div className="flex flex-col gap-3">
            <Link href="#" className="hover:underline text-white/90">{isAr ? 'الدول' : 'Countries'}</Link>
            <Link href="#" className="hover:underline text-white/90">{isAr ? 'المناطق' : 'Regions'}</Link>
            <Link href="#" className="hover:underline text-white/90">{isAr ? 'المدن' : 'Cities'}</Link>
            <Link href="#" className="hover:underline text-white/90">{isAr ? 'الأحياء' : 'Districts'}</Link>
            <Link href="#" className="hover:underline text-white/90">{isAr ? 'المطارات' : 'Airports'}</Link>
            <Link href="#" className="hover:underline text-white/90">{isAr ? 'الفنادق' : 'Hotels'}</Link>
            <Link href="#" className="hover:underline text-white/90">{isAr ? 'أماكن تهمك' : 'Places of interest'}</Link>
          </div>
          <div className="flex flex-col gap-3">
            <Link href="#" className="hover:underline text-white/90">{isAr ? 'بيوت' : 'Homes'}</Link>
            <Link href="#" className="hover:underline text-white/90">{isAr ? 'شقق' : 'Apartments'}</Link>
            <Link href="#" className="hover:underline text-white/90">{isAr ? 'منتجعات' : 'Resorts'}</Link>
            <Link href="#" className="hover:underline text-white/90">{isAr ? 'فيلات' : 'Villas'}</Link>
            <Link href="#" className="hover:underline text-white/90">{isAr ? 'بيوت شباب' : 'Hostels'}</Link>
            <Link href="#" className="hover:underline text-white/90">{isAr ? 'أماكن مبيت وإفطار' : 'B&Bs'}</Link>
            <Link href="#" className="hover:underline text-white/90">{isAr ? 'بيوت ضيافة' : 'Guest houses'}</Link>
          </div>
          <div className="flex flex-col gap-3">
            <Link href="#" className="hover:underline text-white/90">{isAr ? 'أماكن إقامة فريدة' : 'Unique places to stay'}</Link>
            <Link href="#" className="hover:underline text-white/90">{isAr ? 'جميع الوجهات' : 'All destinations'}</Link>
            <Link href="#" className="hover:underline text-white/90">{isAr ? 'جميع وجهات الطيران' : 'All flight destinations'}</Link>
            <Link href="#" className="hover:underline text-white/90">{isAr ? 'جميع مواقع استئجار السيارات' : 'All car rental locations'}</Link>
            <Link href="#" className="hover:underline text-white/90">{isAr ? 'اكتشف' : 'Discover'}</Link>
            <Link href="#" className="hover:underline text-white/90">{isAr ? 'التقييمات' : 'Reviews'}</Link>
            <Link href="#" className="hover:underline text-white/90">{isAr ? 'اكتشف الإقامات الشهرية' : 'Discover monthly stays'}</Link>
            <Link href="#" className="hover:underline text-white/90">{isAr ? 'مقالات السفر' : 'Unpacked: Travel articles'}</Link>
            <Link href="#" className="hover:underline text-white/90">{isAr ? 'عروض موسمية وعطلات' : 'Seasonal and holiday deals'}</Link>
          </div>
          <div className="flex flex-col gap-3">
            <Link href="#" className="hover:underline text-white/90">{isAr ? 'استئجار سيارات' : 'Car rental'}</Link>
            <Link href="#" className="hover:underline text-white/90">{isAr ? 'البحث عن رحلات طيران' : 'Flight finder'}</Link>
            <Link href="#" className="hover:underline text-white/90">{isAr ? 'حجوزات المطاعم' : 'Restaurant reservations'}</Link>
            <Link href="#" className="hover:underline text-white/90">{isAr ? 'Booking.com لوكلاء السفر' : 'Booking.com for Travel Agents'}</Link>
          </div>
          <div className="flex flex-col gap-3">
            <Link href="#" className="hover:underline text-white/90">{isAr ? 'الأسئلة المتكررة حول فيروس كورونا (COVID-19)' : 'Coronavirus (COVID-19) FAQs'}</Link>
            <Link href="#" className="hover:underline text-white/90">{isAr ? 'نبذة عن Booking.com' : 'About Booking.com'}</Link>
            <Link href="#" className="hover:underline text-white/90">{isAr ? 'مساعدة خدمة العملاء' : 'Customer Service Help'}</Link>
            <Link href="#" className="hover:underline text-white/90">{isAr ? 'مساعدة الشركاء' : 'Partner help'}</Link>
            <Link href="#" className="hover:underline text-white/90">{isAr ? 'الوظائف' : 'Careers'}</Link>
            <Link href="#" className="hover:underline text-white/90">{isAr ? 'الاستدامة' : 'Sustainability'}</Link>
            <Link href="#" className="hover:underline text-white/90">{isAr ? 'المركز الإعلامي' : 'Press center'}</Link>
            <Link href="#" className="hover:underline text-white/90">{isAr ? 'مركز موارد السلامة' : 'Safety Resource Center'}</Link>
            <Link href="#" className="hover:underline text-white/90">{isAr ? 'علاقات المستثمرين' : 'Investor relations'}</Link>
            <Link href="#" className="hover:underline text-white/90">{isAr ? 'الشروط والأحكام' : 'Terms & conditions'}</Link>
            <Link href="#" className="hover:underline text-white/90">{isAr ? 'منازعات الشركاء' : 'Partner dispute'}</Link>
            <Link href="#" className="hover:underline text-white/90">{isAr ? 'كيف نعمل' : 'How We Work'}</Link>
            <Link href="#" className="hover:underline text-white/90">{isAr ? 'بيان الخصوصية وملفات تعريف الارتباط' : 'Privacy & cookie statement'}</Link>
            <Link href="#" className="hover:underline text-white/90">{isAr ? 'بيان MSA' : 'MSA statement'}</Link>
            <Link href="#" className="hover:underline text-white/90">{isAr ? 'الاتصال بالشركة' : 'Corporate contact'}</Link>
            <Link href="#" className="hover:underline text-white/90">{isAr ? 'إرشادات المحتوى' : 'Content guidelines'}</Link>
          </div>
        </div>

        <div className="text-center font-normal">
          <p className="mb-4">
            {isAr ? 'حقوق الطبع والنشر © 1996–2026 Booking.com™. جميع الحقوق محفوظة.' : 'Copyright © 1996–2026 Booking.com™. All rights reserved.'}
          </p>
          <p className="text-white/60 text-xs">
            {isAr ? 'تم بناء هذه النسخة لأغراض تعليمية باستخدام AI Studio.' : 'Clone built for educational purposes with AI Studio.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
