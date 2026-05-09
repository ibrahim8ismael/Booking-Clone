'use client';

import React from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Image from 'next/image';
import { Heart, MapPin, ThumbsUp, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function SearchPage() {
  const { t, language } = useLanguage();

  const stays = [
    { 
      id: 1,
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
      image: 'https://picsum.photos/seed/stay11/800/600',
      description: language === 'ar' ? 'استمتع بإقامة فاخرة مع إطلالات رائعة على المدينة وخدمات فندقية متكاملة.' : 'Enjoy a luxurious stay with great city views and full hotel services.'
    },
    { 
      id: 2,
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
      image: 'https://picsum.photos/seed/stay12/800/600',
      description: language === 'ar' ? 'إقامة مريحة بالقرب من الأهرامات مع إفطار مجاني وواي فاي سريع.' : 'Comfortable stay near the Pyramids with free breakfast and fast Wi-Fi.'
    },
    { 
      id: 3,
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
      image: 'https://picsum.photos/seed/stay13/800/600',
      description: language === 'ar' ? 'إطلالة بانورامية على أهرامات الجيزة وموقع استراتيجي لمحبي الآثار.' : 'Panoramic view of the Giza Pyramids and strategic location for archaeology lovers.'
    },
    { 
      id: 4,
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
      image: 'https://picsum.photos/seed/stay14/800/600',
      description: language === 'ar' ? 'مكان هادئ وأسعار مناسبة مع ضيافة استثنائية من العائلة المضيفة.' : 'Quiet place and reasonable prices with exceptional hospitality from the host family.'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow max-w-6xl w-full mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {language === 'ar' ? 'نتائج البحث' : 'Search Results'}
        </h1>
        <p className="text-gray-600 mb-8">
          {language === 'ar' ? 'قاهرة: وجدنا 2,863 مكان إقامة' : 'Cairo: 2,863 properties found'}
        </p>

        <div className="flex flex-col gap-6">
          {stays.map((stay, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={stay.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow"
            >
              <div className="w-full md:w-72 h-64 md:h-auto relative flex-shrink-0">
                <Image 
                  src={stay.image} 
                  alt={stay.name} 
                  fill 
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <button className="absolute top-3 rtl:right-3 ltr:left-3 bg-white/90 p-2 rounded-full shadow-sm hover:bg-gray-100 transition-colors z-10">
                  <Heart className="w-5 h-5 text-gray-900" />
                </button>
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h2 className="text-[#0758AA] font-bold text-xl hover:underline cursor-pointer">
                        {stay.name}
                      </h2>
                      <div className="flex gap-0.5">
                        {Array.from({ length: stay.stars }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-[#FED852] text-[#FED852]" />
                        ))}
                      </div>
                      <div className="bg-[#FED852] text-white p-1 rounded-sm">
                        <ThumbsUp className="w-3 h-3" />
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <Link href="#" className="text-[#0758AA] underline hover:no-underline">{stay.location}</Link>
                      <span>•</span>
                      <Link href="#" className="text-[#0758AA] underline hover:no-underline">{language === 'ar' ? 'عرض على الخريطة' : 'Show on map'}</Link>
                      <span>•</span>
                      <span>{stay.distance}</span>
                    </div>

                    <p className="text-sm text-gray-700 mt-3 line-clamp-2 md:line-clamp-none max-w-2xl">
                      {stay.description}
                    </p>
                  </div>

                  {/* Rating Block */}
                  <div className="flex gap-2 text-right rtl:text-left items-start shrink-0 hidden sm:flex">
                     <div className="flex flex-col items-end">
                       <span className="text-base font-bold text-gray-900">{stay.ratingText}</span>
                       <span className="text-xs text-gray-500">{stay.reviews} {language === 'ar' ? 'تقييم' : 'reviews'}</span>
                     </div>
                     <div className="bg-[#0758AA] text-white text-base font-bold w-8 h-8 flex items-center justify-center rounded-sm rounded-tr-none">
                       {stay.rating}
                     </div>
                  </div>
                </div>

                <div className="mt-auto pt-6 flex flex-col sm:flex-row justify-between items-end gap-4 border-t border-gray-100 mt-4">
                  <div className="w-full sm:w-auto">
                     <p className="text-sm text-green-700 font-bold mb-1">
                        {language === 'ar' ? 'إلغاء مجاني' : 'Free cancellation'}
                     </p>
                     <p className="text-xs text-green-700">
                        {language === 'ar' ? 'يمكنك الإلغاء لاحقاً، لذا احجز هذا السعر الرائع اليوم.' : 'You can cancel later, so lock in this great price today.'}
                     </p>
                  </div>
                  
                  <div className="flex flex-col items-end w-full sm:w-auto shrink-0">
                    <span className="text-xs text-gray-500 mb-1">{language === 'ar' ? 'لليلة واحدة، شخصان' : '1 night, 2 adults'}</span>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-sm text-red-600 line-through">EGP {stay.oldPrice}</span>
                      <span className="font-bold text-2xl text-gray-900">EGP {stay.price}</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">{language === 'ar' ? 'يشمل الضرائب والرسوم' : 'Includes taxes and charges'}</p>
                    
                    <Link 
                      href={`/book/${stay.id}`}
                      className="bg-[#0758AA] hover:bg-[#064a91] text-white font-bold px-6 py-2 rounded-sm transition-colors text-center w-full sm:w-auto"
                    >
                      {language === 'ar' ? 'رؤية التوافر' : 'See availability'}
                    </Link>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
