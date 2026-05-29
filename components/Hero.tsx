'use client';

import React from 'react';
import { useLanguage } from './LanguageProvider';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import Link from 'next/link';

export function Hero() {
  const { t, language } = useLanguage();
  const router = useRouter();

  return (
    <div className="relative mb-12 sm:mb-16 md:mb-20 min-h-[500px] flex items-center justify-center bg-cover bg-center overflow-hidden" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop)' }}>
      <div className="absolute inset-0 bg-black/40 z-0" />
      
      <div className="relative z-10 text-white w-full max-w-6xl mx-auto px-4 py-16 flex flex-col items-center text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg"
        >
          {t.hero.title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl md:text-3xl mb-10 font-bold drop-shadow-md text-gray-100 max-w-3xl"
        >
          {t.hero.subtitle}
        </motion.p>
        
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
        >
           <Link 
             href="/tours"
             className="inline-block bg-[#0758AA] hover:bg-[#064a91] text-white font-bold text-xl px-10 py-5 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
           >
             {language === 'ar' ? 'استكشف الرحلات' : 'Explore the Tours'}
           </Link>
        </motion.div>
      </div>
    </div>
  );
}

