'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useLanguage } from '@/components/LanguageProvider';
import { Footer } from '@/components/Footer';
import Image from 'next/image';
import { MapPin, Star, ThumbsUp, Check, Info } from 'lucide-react';
import Link from 'next/link';

export default function BookPage() {
  const params = useParams();
  const { language } = useLanguage();
  
  // Mock data, in real app would fetch based on params.id
  const stay = { 
    id: params.id,
    name: 'Gaia Pyramids Hotel', 
    type: language === 'ar' ? 'فندق' : 'Hotel',
    stars: 5,
    location: language === 'ar' ? 'القاهرة، مصر' : 'Cairo, Egypt', 
    rating: 8.6, 
    ratingText: language === 'ar' ? 'رائع' : 'Fabulous',
    reviews: 2728, 
    price: '3,265', 
    image: 'https://picsum.photos/seed/stay12/1200/600',
    description: language === 'ar' ? 'يقع فندق Gaia Pyramids في القاهرة، ويبعد مسافة قصيرة عن أهرامات الجيزة. يوفر الفندق غرفاً مكيفة مع خدمة واي فاي مجانية ومطعم يقدم أشهى المأكولات المحلية والعالمية. استمتع بإطلالات خلابة على الأهرامات من تراس سطح الفندق.' : 'Gaia Pyramids Hotel is located in Cairo, a short distance from the Giza Pyramids. The hotel offers air-conditioned rooms with free Wi-Fi and a restaurant serving delicious local and international cuisine. Enjoy breathtaking views of the pyramids from the hotels rooftop terrace.'
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow max-w-5xl w-full mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#FED852] text-xs font-bold px-2 py-1 rounded-sm text-gray-900">{stay.type}</span>
              <div className="flex gap-0.5">
                {Array.from({ length: stay.stars }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#FED852] text-[#FED852]" />
                ))}
              </div>
              <div className="bg-[#FED852] text-white p-1 rounded-sm">
                <ThumbsUp className="w-3 h-3" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{stay.name}</h1>
            <div className="flex items-center gap-2 text-sm text-[#0758AA]">
               <MapPin className="w-4 h-4" />
               <span className="underline cursor-pointer">{stay.location}</span>
            </div>
          </div>
          
          <div className="flex flex-col items-end shrink-0 hidden md:flex">
             <div className="flex items-center gap-4">
               <div className="flex flex-col items-end">
                 <span className="text-lg font-bold text-gray-900">{stay.ratingText}</span>
                 <span className="text-sm text-gray-500">{stay.reviews} {language === 'ar' ? 'تقييم' : 'reviews'}</span>
               </div>
               <div className="bg-[#0758AA] text-white text-xl font-bold w-12 h-12 flex items-center justify-center rounded-sm rounded-tr-none">
                 {stay.rating}
               </div>
             </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full h-[400px] relative rounded-lg overflow-hidden mb-8 shadow-sm">
          <Image 
            src={stay.image}
            fill
            alt={stay.name}
            className="object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-[2] flex flex-col gap-8">
            <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold mb-4">{language === 'ar' ? 'تفاصيل مكان الإقامة' : 'Property Details'}</h2>
              <p className="text-gray-700 leading-relaxed text-sm">
                {stay.description}
              </p>
            </section>
            
            <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold mb-4">{language === 'ar' ? 'أكثر المرافق رواجًا' : 'Most popular facilities'}</h2>
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  language === 'ar' ? 'واي فاي مجاني' : 'Free WiFi',
                  language === 'ar' ? 'غرف عائلية' : 'Family rooms',
                  language === 'ar' ? 'مواقف سيارات مجانية' : 'Free parking',
                  language === 'ar' ? 'خدمة نقل المطار' : 'Airport shuttle',
                  language === 'ar' ? 'مطعم' : 'Restaurant',
                  language === 'ar' ? 'مكتب استقبال على مدار 24 ساعة' : '24-hour front desk'
                ].map((facility, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-green-600" />
                    {facility}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Booking Widget */}
          <div className="flex-[1]">
            <div className="bg-[#EBF3FF] p-6 rounded-lg border border-[#0758AA]/20 sticky top-4">
              <h3 className="font-bold text-xl text-gray-900 mb-2">
                {language === 'ar' ? 'ممتاز' : 'Excellent'}
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                {language === 'ar' ? 'موقع استثنائي وتقييمات عالية من الضيوف' : 'Exceptional location and highly rated by guests'}
              </p>
              
              <div className="bg-white p-4 rounded-md mb-6 shadow-sm border border-gray-200">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-[#0758AA] shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">
                    <strong className="block mb-1">{language === 'ar' ? 'نصيحة للمسافرين' : 'Traveler tip'}</strong>
                    {language === 'ar' ? 'احجز الآن لتأمين هذا السعر. الأسعار قد ترتفع قريباً وتوفر الغرف محدود!' : 'Book now to lock in this price. Prices may go up soon and room availability is limited!'}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-end mb-6 pb-6 border-b border-gray-300">
                <span className="text-gray-700 font-bold">{language === 'ar' ? 'السعر لليلة واحدة' : 'Price for 1 night'}</span>
                <span className="text-2xl font-bold text-gray-900">EGP {stay.price}</span>
              </div>

              <Link 
                href={`/checkout/${params.id}`} 
                className="w-full bg-[#0758AA] hover:bg-[#064a91] text-white font-bold text-lg py-3 rounded-sm transition-colors shadow-sm block text-center"
              >
                {language === 'ar' ? 'احجز الآن' : 'Reserve'}
              </Link>
              <p className="text-center text-xs text-gray-500 mt-3">
                {language === 'ar' ? 'الموقع سيطلب تفاصيل الدفع لتأكيد الحجز' : 'You will be asked for payment details to confirm.'}
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-4">
            {language === 'ar' ? 'تقييمات الضيوف' : 'Guest Reviews'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 overflow-hidden">
                      <Image src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" width={40} height={40} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Reviewer {i + 1}</h4>
                      <p className="text-xs text-gray-500">{language === 'ar' ? 'مصر' : 'Egypt'}</p>
                    </div>
                  </div>
                  <div className="bg-[#0758AA] text-white text-sm font-bold w-7 h-7 flex items-center justify-center rounded-sm rounded-tr-none">
                    {(9 + Math.random()).toFixed(1)}
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-700 italic">
                    "{language === 'ar' 
                      ? 'إقامة رائعة جداً، المكان نظيف وطاقم العمل ودود. أنصح به بشدة!' 
                      : 'Very wonderful stay, the place is clean and the staff is friendly. Highly recommend it!'}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
