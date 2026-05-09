'use client';

import React from 'react';
import { useLanguage } from './LanguageProvider';
import Image from 'next/image';
import { MapPin, ThumbsUp, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function UniqueStays() {
  const { t, language } = useLanguage();

  const stays = [
    { 
      name: 'The Resi-Suites by Elegant Hospitality', 
      type: language === 'ar' ? 'شقة' : 'Apartment',
      stars: 5,
      location: language === 'ar' ? 'القاهرة، مصر' : 'Cairo, Egypt', 
      distance: language === 'ar' ? '25 كلم من مركز المدينة' : '25 km from center',
      rating: 9.6, 
      ratingText: language === 'ar' ? 'استثنائي' : 'Exceptional',
      reviews: 24, 
      price: '1,957', 
      oldPrice: '3,069',
      image: 'https://picsum.photos/seed/stay11/400/300' 
    },
    { 
      name: 'Gaia Pyramids Hotel', 
      type: language === 'ar' ? 'بيت ضيافة' : 'Guest house',
      stars: 5,
      location: language === 'ar' ? 'القاهرة، مصر' : 'Cairo, Egypt', 
      distance: language === 'ar' ? '11.8 كلم من مركز المدينة' : '11.8 km from center',
      rating: 8.6, 
      ratingText: language === 'ar' ? 'رائع' : 'Fabulous',
      reviews: 2728, 
      price: '3,265', 
      oldPrice: '4,218',
      image: 'https://picsum.photos/seed/stay12/400/300' 
    },
    { 
      name: 'Khan Alibaba Pyramids View', 
      type: language === 'ar' ? 'بيت ضيافة' : 'Guest house',
      stars: 5,
      location: language === 'ar' ? 'القاهرة، مصر' : 'Cairo, Egypt', 
      distance: language === 'ar' ? '11.6 كلم من مركز المدينة' : '11.6 km from center',
      rating: 8.9, 
      ratingText: language === 'ar' ? 'رائع' : 'Fabulous',
      reviews: 8, 
      price: '1,076', 
      oldPrice: '1,329',
      image: 'https://picsum.photos/seed/stay13/400/300' 
    },
    { 
      name: 'Queen Inn Pyramids View', 
      type: language === 'ar' ? 'مكان مبيت وإفطار' : 'Bed and breakfast',
      stars: 3,
      location: language === 'ar' ? 'القاهرة، مصر' : 'Cairo, Egypt', 
      distance: language === 'ar' ? '11.7 كلم من مركز المدينة' : '11.7 km from center',
      rating: 10.0, 
      ratingText: language === 'ar' ? 'استثنائي' : 'Exceptional',
      reviews: 7, 
      price: '1,452', 
      oldPrice: '3,986',
      image: 'https://picsum.photos/seed/stay14/400/300' 
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 my-12">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{t.uniqueStays.title || 'أماكن إقامة فريدة'}</h2>
          <p className="text-gray-500 mt-1">{t.uniqueStays.subtitle || 'أماكن إقامة محببة'}</p>
        </div>
      </div>
      
      <div className="relative">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
          {stays.map((stay, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="w-[300px] flex-shrink-0 snap-start transition-colors rounded-lg overflow-hidden flex flex-col group border border-transparent hover:border-gray-200 shadow-sm bg-white pb-3"
            >
              <Link href="/book/1" className="flex flex-col h-full relative cursor-pointer">
                <div className="w-full h-64 relative rounded-t-lg overflow-hidden mb-3">
                  <Image 
                    src={stay.image} 
                    alt={stay.name} 
                    fill 
                    referrerPolicy="no-referrer"
                    className="object-cover"
                  />
                  <button 
                    className="absolute top-3 rtl:right-3 ltr:left-3 bg-white/90 p-2 rounded-full shadow-sm hover:bg-gray-100 transition-colors z-10"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Heart className="w-4 h-4 text-gray-900" />
                  </button>
                </div>

                <div className="flex flex-col flex-grow px-2">
                  {/* Meta info */}
                  <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                    <span className="text-xs text-gray-500 font-bold">{stay.type}</span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: stay.stars }).map((_, i) => (
                        <div key={i} className="w-2.5 h-2.5 bg-[#FED852] rounded-[1px]" />
                      ))}
                    </div>
                    <div className="bg-[#FED852] text-white p-[1px] rounded-[1px]">
                      <ThumbsUp className="w-2 h-2" />
                    </div>
                    <div className="bg-[#0758AA] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm ml-auto rtl:mr-auto rtl:ml-0">
                      Genius
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-gray-900 text-base leading-tight mb-2 group-hover:text-[#0758AA] transition-colors">{stay.name}</h3>
                  
                  {/* Location & Reviews Row */}
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex flex-col text-sm text-gray-600 gap-1">
                      <span className="hidden sm:block">{stay.location}</span>
                    </div>
                    
                    {/* Rating Block */}
                    <div className="flex gap-2 text-right rtl:text-left items-start shrink-0">
                       <div className="flex flex-col items-end">
                         <span className="text-sm font-bold text-gray-900">{stay.ratingText}</span>
                         <span className="text-xs text-gray-500">{stay.reviews} {language === 'ar' ? 'تقييم' : 'reviews'}</span>
                       </div>
                       <div className="bg-[#0758AA] text-white text-sm font-bold w-7 h-7 flex items-center justify-center rounded-sm rounded-tr-none">
                         {stay.rating}
                       </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-gray-600 mb-4 mt-auto">
                     <MapPin className="w-3.5 h-3.5" />
                     <span>{stay.distance}</span>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-baseline justify-end rtl:justify-start gap-1">
                    <span className="text-xs text-gray-500">{language === 'ar' ? 'ابتداءً من' : 'Starting from'}</span>
                    <span className="text-sm text-red-600 line-through mx-1">EGP {stay.oldPrice}</span>
                    <span className="font-bold text-lg text-gray-900">EGP {stay.price}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <button className="absolute top-1/2 -left-4 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-100 hover:bg-gray-50 hidden sm:flex z-10 text-gray-800">
           <ChevronLeft className="w-5 h-5" />
        </button>
        <button className="absolute top-1/2 -right-4 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-100 hover:bg-gray-50 hidden sm:flex z-10 text-gray-800">
           <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
