'use client';

import React from 'react';
import { useLanguage } from '@/components/LanguageProvider';

export default function NotFound() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const t = {
    title: isAr ? '404' : '404',
    heading: isAr ? 'عذراً! الصفحة غير موجودة' : 'Oops! Page not found',
    description: isAr 
      ? 'الصفحة التي تبحث عنها قد تم إزالتها، أو تم تغيير اسمها، أو أنها غير متاحة مؤقتاً.' 
      : 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.',
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-lg w-full bg-white md:p-12 p-8 rounded-3xl md:shadow-sm md:border md:border-gray-100 flex flex-col items-center text-center">
        
        <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-8 ring-8 ring-blue-50/50">
          <span className="text-4xl font-black tracking-tighter text-[#003580]">{t.title}</span>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
          {t.heading}
        </h2>
        
        <p className="text-gray-500 text-lg max-w-sm leading-relaxed mb-10">
          {t.description}
        </p>
      </div>
    </div>
  );
}
