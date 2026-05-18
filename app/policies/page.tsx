'use client';

import React from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { Footer } from '@/components/Footer';
import { ShieldAlert, Users, Calendar, Info, Check, Clock } from 'lucide-react';
import Link from 'next/link';

export default function PoliciesPage() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-10" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="flex-grow max-w-4xl w-full mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">
            {isAr ? 'السياسات العامة والإلغاء' : 'General & Cancellation Policies'}
          </h1>
          <p className="text-gray-600">
            {isAr 
              ? 'يرجى قراءة هذه السياسات بعناية قبل إتمام الحجز الخاص بك' 
              : 'Please read these policies carefully before completing your booking'}
          </p>
        </div>

        <div className="space-y-8">
          {/* Cancellation section */}
          <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-red-50 text-red-600 rounded-2xl">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {isAr ? 'سياسة الإلغاء القياسية' : 'Standard Cancellation Policy'}
              </h2>
            </div>
            
            <div className="space-y-4 text-gray-700">
              <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <Check className="w-6 h-6 text-green-500 shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    {isAr ? 'إلغاء مجاني' : 'Free Cancellation'}
                  </h3>
                  <p>{isAr ? 'يمكنك الإلغاء مجاناً حتى 7 أيام قبل تاريخ الوصول المتوقع.' : 'You can cancel for free up to 7 days before your check-in date.'}</p>
                </div>
              </div>
              
              <div className="flex gap-4 p-4 bg-orange-50/50 rounded-2xl border border-orange-100">
                <Info className="w-6 h-6 text-orange-500 shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    {isAr ? 'غرامة 50%' : '50% Penalty'}
                  </h3>
                  <p>{isAr ? 'في حال الإلغاء خلال 7 أيام من تاريخ الوصول، يتم خصم 50% من قيمة الحجز.' : 'If you cancel within 7 days of arrival, a 50% penalty will be applied.'}</p>
                </div>
              </div>
              
              <div className="flex gap-4 p-4 bg-red-50/50 rounded-2xl border border-red-100">
                <ShieldAlert className="w-6 h-6 text-red-500 shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    {isAr ? 'عدم الحضور' : 'No-Show'}
                  </h3>
                  <p>{isAr ? 'في حال عدم الحضور دون إشعار مسبق، سيتم خصم كامل قيمة الحجز (100%).' : 'In case of a no-show without prior notice, the full amount (100%) will be charged.'}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Times section */}
          <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-50 text-[#0758AA] rounded-2xl">
                <Clock className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {isAr ? 'أوقات تسجيل الوصول والمغادرة' : 'Check-in & Check-out Times'}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 border border-gray-100 rounded-2xl">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">
                  {isAr ? 'تسجيل الوصول' : 'Check-in'}
                </span>
                <div className="text-3xl font-black text-gray-900 mb-2">14:00</div>
                <p className="text-sm text-gray-600">
                  {isAr ? 'ابتداءً من الساعة الثانية ظهراً' : 'Starting from 2:00 PM'}
                </p>
              </div>
              <div className="p-6 border border-gray-100 rounded-2xl">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">
                  {isAr ? 'تسجيل المغادرة' : 'Check-out'}
                </span>
                <div className="text-3xl font-black text-gray-900 mb-2">12:00</div>
                <p className="text-sm text-gray-600">
                  {isAr ? 'حتى الساعة الثانية عشر ظهراً' : 'Until 12:00 PM'}
                </p>
              </div>
            </div>
          </section>
          
          <div className="text-center mt-8">
             <Link 
               href="/" 
               className="inline-block px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl transition-colors"
             >
               {isAr ? 'العودة للصفحة الرئيسية' : 'Return to Home'}
             </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
