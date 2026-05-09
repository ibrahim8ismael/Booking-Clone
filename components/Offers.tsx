'use client';

import React from 'react';
import { useLanguage } from './LanguageProvider';
import Image from 'next/image';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { motion } from 'motion/react';

export function Offers() {
  const { language } = useLanguage();

  const destinations = [
    { title: language === 'ar' ? 'إيجارات شهرية' : 'Monthly Rentals', image: 'https://picsum.photos/seed/ry1/200/200' },
    { title: language === 'ar' ? 'الرياض' : 'Riyadh', image: 'https://picsum.photos/seed/ry2/200/200' },
    { title: language === 'ar' ? 'جدة' : 'Jeddah', image: 'https://picsum.photos/seed/ry3/200/200' },
    { title: language === 'ar' ? 'حائل' : 'Hail', image: 'https://picsum.photos/seed/ry4/200/200' },
    { title: language === 'ar' ? 'الخبر' : 'Al Khobar', image: 'https://picsum.photos/seed/ry5/200/200' },
    { title: language === 'ar' ? 'أبها' : 'Abha', image: 'https://picsum.photos/seed/ry6/200/200' },
    { title: language === 'ar' ? 'العلا' : 'AlUla', image: 'https://picsum.photos/seed/ry7/200/200' },
    { title: language === 'ar' ? 'الطائف' : 'Taif', image: 'https://picsum.photos/seed/ry8/200/200' },
    { title: language === 'ar' ? 'مكة' : 'Makkah', image: 'https://picsum.photos/seed/ry9/200/200' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 my-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {language === 'ar' ? 'في كل مكان لك بيت' : 'A home everywhere you go'}
        </h2>
        <div className="flex gap-2">
          <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors">
            {language === 'ar' ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
          <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors">
            {language === 'ar' ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
        </div>
      </div>
      
      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide py-2 snap-x">
        {destinations.map((dest, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="flex flex-col items-center gap-3 cursor-pointer min-w-[120px] snap-start"
          >
            <div className="w-28 h-28 rounded-full overflow-hidden shadow-sm hover:shadow-md transition-shadow transform hover:scale-105 duration-300">
              <Image 
                src={dest.image}
                alt={dest.title}
                width={112}
                height={112}
                className="object-cover w-full h-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-medium text-gray-900 text-center">{dest.title}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
