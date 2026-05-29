'use client';

import React, { use } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { ArrowLeft, ArrowRight, Save, Image as ImageIcon, MapPin, Building, BedDouble, Edit, Trash2, FileText, Users, ShieldAlert, Utensils, Star, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function AdminTourDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const router = useRouter();

  const t = {
    back: isAr ? 'العودة إلى الرحلات' : 'Back to Tours',
    tourDetails: isAr ? 'تفاصيل الرحلة' : 'Tour Details',
    edit: isAr ? 'تعديل' : 'Edit',
    status: isAr ? 'الحالة' : 'Status',
    active: isAr ? 'نشط' : 'Active',
    location: isAr ? 'الوجهة' : 'Location',
    groups: isAr ? 'المجموعات' : 'Groups',
    features: isAr ? 'مميزات الرحلة' : 'Tour Features',
    groupTypes: isAr ? 'أنواع المواعيد' : 'Group Slots',
    price: isAr ? 'السعر' : 'Price',
    capacity: isAr ? 'السعة' : 'Capacity',
    count: isAr ? 'العدد' : 'Count',
    childPolicies: isAr ? 'سياسات الأطفال' : 'Child Policies',
    mealPlans: isAr ? 'خطط الوجبات' : 'Meal Plans',
    cancellation: isAr ? 'سياسات الإلغاء' : 'Cancellation Policies',
    connectedRoom: isAr ? 'متاحة' : 'Available',
    adults: isAr ? 'بالغين' : 'Adults',
    children: isAr ? 'أطفال' : 'Children',
  };

  const tour = {
    id,
    name: id === 'TOUR-001' ? 'Sharm El Sheikh 4 Days' : 'Luxor & Aswan Cruise',
    stars: 5,
    description: 'A luxurious trip with amazing views, guided tours, and excellent accommodation.',
    city: id === 'TOUR-001' ? 'Sharm El Sheikh' : 'Luxor',
    country: 'Egypt',
    address: 'Cairo Central Station',
    status: 'Active',
    contactPerson: 'Ahmed Hassan',
    contactPhone: '+201001234567',
    contactEmail: 'sales@tourvendor.com',
    commission: 15,
    features: ['Free WiFi in Hotel', 'Internal Transportation', 'Tour Guide', 'Meals Included'],
    groups: [
      { id: '1', type: 'Group 1', price: 150, adultCap: 20, childCap: 10, startDate: '2026-05-01', endDate: '2026-05-05', count: 1 },
      { id: '2', type: 'Group 2', price: 200, adultCap: 20, childCap: 10, startDate: '2026-05-06', endDate: '2026-05-10', count: 1 }
    ],
    childRules: [
      { id: '1', ageFrom: 0, ageTo: 5.99, policy: 'Free', discount: 100 },
      { id: '2', ageFrom: 6, ageTo: 11.99, policy: 'Percentage', discount: 50 },
    ],
    cancellationRules: 'Free cancellation up to 7 days before trip. 50% penalty within 7 days. No-show 100%.'
  };

  return (
    <div className="pb-10 max-w-6xl mx-auto" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
            <button 
            onClick={() => router.push('/admin/tours')}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-[#0071c2] hover:border-[#0071c2] transition-colors shadow-sm shrink-0"
            aria-label={t.back}
          >
            {isAr ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
          </button>
          <div>
            <div className="flex items-center gap-3">
               <h1 className="text-2xl font-bold text-gray-900">{tour.name}</h1>
               <div className="flex text-yellow-400">
                 {Array.from({ length: tour.stars }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                 ))}
               </div>
            </div>
            <p className="text-gray-500 text-sm mt-1">{tour.id}</p>
          </div>
        </div>
        
        <div className="flex gap-3 shrink-0">
          <Button 
            className="font-bold bg-[#0071c2] hover:bg-[#005999] text-white flex gap-2 items-center"
            onClick={() => router.push(`/admin/tours/${id}/edit`)}
          >
            <Edit className="w-4 h-4" />
            {t.edit}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="p-2 bg-blue-50 text-[#0071c2] rounded-lg">
                <Building className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">{t.tourDetails}</h2>
            </div>
            <p className="text-gray-700 leading-relaxed min-h-[60px]">{tour.description}</p>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                <BedDouble className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">{t.groupTypes}</h2>
            </div>
            
            <div className="space-y-4">
              {tour.groups.map((group) => (
                <div key={group.id} className="p-5 rounded-xl border border-gray-200 bg-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-3 flex-1">
                    <h3 className="font-bold text-gray-900 text-lg">{group.type} <span className="text-sm font-normal text-amber-600 ml-2">({group.startDate} - {group.endDate})</span></h3>
                    
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                      <span className="flex items-center gap-1.5 text-gray-700">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span>{group.adultCap} {t.adults}, {group.childCap} {t.children}</span>
                      </span>
                      <span className="text-gray-700">
                        {t.count}: <strong className="text-gray-900">{group.count}</strong>
                      </span>
                    </div>
                  </div>
                  <div className="text-xl font-bold text-[#0071c2] shrink-0">
                    ${group.price} <span className="text-sm font-normal text-gray-500">/ person</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="p-2 bg-pink-50 text-pink-600 rounded-lg">
                <Users className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">{t.childPolicies}</h2>
            </div>
            
            <div className="space-y-3">
               {tour.childRules.map(rule => (
                  <div key={rule.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                     <span className="text-gray-700 font-medium">Age {rule.ageFrom} to {rule.ageTo}</span>
                     <span className="text-pink-600 font-bold bg-pink-50 px-3 py-1 rounded-full text-sm">
                        {rule.discount}% OFF
                     </span>
                  </div>
               ))}
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
              <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">{t.cancellation}</h2>
            </div>
            <p className="text-gray-700">{tour.cancellationRules}</p>
          </section>

        </div>

        {/* Sidebar Options Area */}
        <div className="space-y-8">
          
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
             <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900">{t.status}</h3>
                <span className={`px-3 py-1 text-sm font-bold rounded-full ${tour.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                   {tour.status === 'Active' ? t.active : tour.status}
                </span>
             </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-gray-400" />
              <h3 className="font-bold text-gray-900">{t.location}</h3>
            </div>
            <div className="space-y-2 text-gray-700">
               <div><strong>{tour.city}, {tour.country}</strong></div>
               <div className="text-sm">{tour.address}</div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-gray-900">{t.features}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {tour.features.map((feature: string) => (
                <span key={feature} className="px-3 py-1 bg-yellow-50 text-yellow-800 rounded-lg text-sm font-medium border border-yellow-100">
                  {feature}
                </span>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

