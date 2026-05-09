'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useLanguage } from '@/components/LanguageProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Image from 'next/image';
import { Lock, User, Mail, Phone, CreditCard, ChevronRight, Calendar as CalendarIcon, Users, Building, Info } from 'lucide-react';
import Link from 'next/link';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export default function CheckoutPage() {
  const params = useParams();
  const { language } = useLanguage();

  const isAr = language === 'ar';
  const [checkIn, setCheckIn] = React.useState<Date | undefined>(new Date(2026, 7, 16));
  const [checkOut, setCheckOut] = React.useState<Date | undefined>(new Date(2026, 7, 17));

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow max-w-5xl w-full mx-auto px-4 py-8">
        <div className="mb-6 flex items-center gap-2 text-sm">
          <Link href={`/book/${params.id}`} className="text-[#0758AA] hover:underline">
            {isAr ? 'العودة للتفاصيل' : 'Back to details'}
          </Link>
          <ChevronRight className={`w-4 h-4 text-gray-500 ${isAr ? 'rotate-180' : ''}`} />
          <span className="text-gray-500">{isAr ? 'تأكيد الحجز' : 'Confirm your booking'}</span>
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
          {isAr ? 'أدخل تفاصيلك' : 'Enter your details'}
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form Section */}
          <div className="flex-[2] flex flex-col gap-6">
            
            {/* Booking Details Inputs */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold mb-6 text-[#0758AA]">{isAr ? 'تفاصيل الإقامة' : 'Stay Details'}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    {isAr ? 'تاريخ الوصول' : 'Check-in Date'} *
                  </label>
                  <Popover>
                    <PopoverTrigger
                        className={cn(
                          "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 border bg-background hover:bg-accent hover:text-accent-foreground",
                          "w-full justify-start text-left font-normal border-gray-300 py-5 px-3 rounded-sm hover:bg-transparent",
                          !checkIn && "text-muted-foreground",
                          isAr ? "text-right flex-row-reverse" : "text-left"
                        )}
                      >
                        <CalendarIcon className={cn("w-5 h-5 text-gray-400 shrink-0", isAr ? "ml-3" : "mr-3")} />
                        {checkIn ? format(checkIn, "PPP") : <span>{isAr ? "اختر تاريخ" : "Pick a date"}</span>}
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 z-50">
                      <Calendar
                        mode="single"
                        selected={checkIn}
                        onSelect={setCheckIn}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    {isAr ? 'تاريخ المغادرة' : 'Check-out Date'} *
                  </label>
                  <Popover>
                    <PopoverTrigger
                        className={cn(
                          "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 border bg-background hover:bg-accent hover:text-accent-foreground",
                          "w-full justify-start text-left font-normal border-gray-300 py-5 px-3 rounded-sm hover:bg-transparent",
                          !checkOut && "text-muted-foreground",
                           isAr ? "text-right flex-row-reverse" : "text-left"
                        )}
                      >
                        <CalendarIcon className={cn("w-5 h-5 text-gray-400 shrink-0", isAr ? "ml-3" : "mr-3")} />
                        {checkOut ? format(checkOut, "PPP") : <span>{isAr ? "اختر تاريخ" : "Pick a date"}</span>}
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 z-50">
                      <Calendar
                        mode="single"
                        selected={checkOut}
                        onSelect={setCheckOut}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    {isAr ? 'الغرف' : 'Rooms'} *
                  </label>
                  <div className="relative">
                    <Building className="absolute w-5 h-5 text-gray-400 top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3" />
                    <input 
                      type="number" 
                      min="1"
                      defaultValue="1"
                      className="w-full border border-gray-300 rounded-sm py-2.5 ltr:pl-10 rtl:pr-10 px-3 focus:outline-none focus:ring-2 focus:ring-[#FED852] focus:border-transparent transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    {isAr ? 'البالغين' : 'Adults'} *
                  </label>
                  <div className="relative">
                    <Users className="absolute w-5 h-5 text-gray-400 top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3" />
                    <input 
                      type="number" 
                      min="1"
                      defaultValue="2"
                      className="w-full border border-gray-300 rounded-sm py-2.5 ltr:pl-10 rtl:pr-10 px-3 focus:outline-none focus:ring-2 focus:ring-[#FED852] focus:border-transparent transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    {isAr ? 'الأطفال' : 'Children'} *
                  </label>
                  <div className="relative">
                    <Users className="absolute w-5 h-5 text-gray-400 top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3" />
                    <input 
                      type="number" 
                      min="0"
                      defaultValue="0"
                      className="w-full border border-gray-300 rounded-sm py-2.5 ltr:pl-10 rtl:pr-10 px-3 focus:outline-none focus:ring-2 focus:ring-[#FED852] focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Details */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold mb-6 text-[#0758AA]">{isAr ? 'التفاصيل الشخصية' : 'Personal Details'}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    {isAr ? 'الاسم الأول' : 'First Name'} *
                  </label>
                  <div className="relative">
                    <User className="absolute w-5 h-5 text-gray-400 top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3" />
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded-sm py-2.5 ltr:pl-10 rtl:pr-10 px-3 focus:outline-none focus:ring-2 focus:ring-[#FED852] focus:border-transparent transition-all"
                      placeholder={isAr ? 'أحمد' : 'John'}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    {isAr ? 'اسم العائلة' : 'Last Name'} *
                  </label>
                  <div className="relative">
                    <User className="absolute w-5 h-5 text-gray-400 top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3" />
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded-sm py-2.5 ltr:pl-10 rtl:pr-10 px-3 focus:outline-none focus:ring-2 focus:ring-[#FED852] focus:border-transparent transition-all"
                      placeholder={isAr ? 'محمد' : 'Doe'}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    {isAr ? 'البريد الإلكتروني' : 'Email Address'} *
                  </label>
                  <div className="relative">
                    <Mail className="absolute w-5 h-5 text-gray-400 top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3" />
                    <input 
                      type="email" 
                      className="w-full border border-gray-300 rounded-sm py-2.5 ltr:pl-10 rtl:pr-10 px-3 focus:outline-none focus:ring-2 focus:ring-[#FED852] focus:border-transparent transition-all"
                      placeholder={isAr ? 'ahmed@example.com' : 'john@example.com'}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    {isAr ? 'رقم الهاتف' : 'Phone Number'} *
                  </label>
                  <div className="relative">
                    <Phone className="absolute w-5 h-5 text-gray-400 top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3" />
                    <input 
                      type="tel" 
                      className="w-full border border-gray-300 rounded-sm py-2.5 ltr:pl-10 rtl:pr-10 px-3 focus:outline-none focus:ring-2 focus:ring-[#FED852] focus:border-transparent transition-all"
                      placeholder="+20 100 123 4567"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Special Requests */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold mb-2 text-[#0758AA]">{isAr ? 'طلبات خاصة' : 'Special Requests'}</h2>
              <p className="text-sm text-gray-600 mb-4">
                {isAr ? 'الطلبات الخاصة غير مضمونة، لكن مكان الإقامة سيبذل قصارى جهده لتلبيتها. يمكنك دوماً إرسال طلب خاص بعد اكتمال حجزك.' : 'Special requests cannot be guaranteed, but the property will do its best to meet your needs. You can always make a special request after your booking is complete.'}
              </p>
              <textarea 
                className="w-full border border-gray-300 rounded-sm p-3 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-[#FED852] focus:border-transparent"
                placeholder={isAr ? 'الرجاء كتابة طلباتك باللغة الإنجليزية أو لغة مكان الإقامة...' : 'Please write your requests in English or the propertys language...'}
              ></textarea>
            </div>

            {/* Payment Info Note */}
            <div className="bg-[#EBF3FF] p-6 rounded-lg shadow-sm border border-[#0758AA]/20">
              <h2 className="text-xl font-bold mb-4 text-[#0758AA] flex items-center gap-2">
                <Info className="w-5 h-5" />
                {isAr ? 'معلومات الدفع والتأكيد' : 'Payment and Confirmation'}
              </h2>
              <p className="text-gray-700 text-base font-medium">
                {isAr 
                  ? 'سنتواصل معك خلال 24 ساعة لتأكيد الحجز وإتمام عملية الدفع.' 
                  : 'We will contact you within 24 hours to confirm the process and complete the payment.'}
              </p>
            </div>

            <div className="flex justify-end mt-4">
               <button className="bg-[#0758AA] hover:bg-[#064a91] text-white font-extrabold text-lg px-8 py-4 rounded-sm transition-colors shadow-md w-full md:w-auto">
                 {isAr ? 'تأكيد الحجز' : 'Complete Booking'}
               </button>
            </div>

          </div>

          {/* Sidebar */}
          <div className="flex-[1]">
             <div className="bg-white border border-gray-200 rounded-lg shadow-sm sticky top-4 overflow-hidden">
               <div className="p-4 border-b border-gray-200 bg-[#EBF3FF]">
                 <h3 className="font-bold text-lg text-[#0758AA] mb-1">{isAr ? 'تفاصيل حجزك' : 'Your booking details'}</h3>
               </div>
               
               <div className="p-4">
                 <div className="flex gap-4 mb-4 pb-4 border-b border-gray-100">
                   <div className="w-20 h-20 rounded-md overflow-hidden relative shrink-0">
                     <Image 
                        src="https://picsum.photos/seed/stay12/400/300"
                        alt="Hotel"
                        fill
                        className="object-cover"
                     />
                   </div>
                   <div>
                     <h4 className="font-bold text-gray-900 mb-1">Gaia Pyramids Hotel</h4>
                     <p className="text-sm text-gray-600">{isAr ? 'القاهرة، مصر' : 'Cairo, Egypt'}</p>
                   </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-100">
                   <div>
                     <span className="block text-sm text-gray-500 mb-1">{isAr ? 'تسجيل الوصول' : 'Check-in'}</span>
                     <strong className="text-sm">Wed, Aug 16 2026</strong>
                     <span className="block text-xs text-gray-500 mt-1">15:00 - 23:00</span>
                   </div>
                   <div>
                     <span className="block text-sm text-gray-500 mb-1">{isAr ? 'المغادرة' : 'Check-out'}</span>
                     <strong className="text-sm">Thu, Aug 17 2026</strong>
                     <span className="block text-xs text-gray-500 mt-1">08:00 - 12:00</span>
                   </div>
                 </div>

                 <div className="mb-4 pb-4 border-b border-gray-100">
                   <span className="block text-sm text-gray-500 mb-1">{isAr ? 'مدة الإقامة الكلية' : 'Total length of stay:'}</span>
                   <strong className="text-sm">{isAr ? 'ليلة واحدة' : '1 night'}</strong>
                 </div>

                 <div className="bg-[#f2f2f2] -mx-4 px-4 py-4 mb-4">
                   <div className="flex justify-between items-center mb-1">
                     <span className="text-lg font-bold text-gray-900">{isAr ? 'السعر' : 'Price'}</span>
                     <span className="text-2xl font-extrabold text-[#0758AA]">EGP 3,265</span>
                   </div>
                   <p className="text-xs text-gray-500">{isAr ? 'يشمل الضرائب والرسوم' : 'Includes taxes and charges'}</p>
                 </div>
               </div>
             </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}
