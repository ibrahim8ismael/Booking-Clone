'use client';

import React, { use } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { ArrowLeft, ArrowRight, Save, Image as ImageIcon, MapPin, Building, BedDouble, Edit, Trash2, FileText, Users, ShieldAlert, Utensils, Star, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function AdminHotelDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const router = useRouter();

  const t = {
    back: isAr ? 'العودة إلى الفنادق' : 'Back to Hotels',
    hotelDetails: isAr ? 'تفاصيل الفندق' : 'Hotel Details',
    edit: isAr ? 'تعديل' : 'Edit',
    status: isAr ? 'الحالة' : 'Status',
    active: isAr ? 'نشط' : 'Active',
    location: isAr ? 'الموقع' : 'Location',
    rooms: isAr ? 'الغرف' : 'Rooms',
    facilities: isAr ? 'المرافق الأبرز' : 'Main Facilities',
    roomTypes: isAr ? 'أنواع الغرف' : 'Room Types',
    price: isAr ? 'السعر' : 'Price',
    capacity: isAr ? 'السعة' : 'Capacity',
    count: isAr ? 'العدد' : 'Count',
    contractDetails: isAr ? 'تفاصيل التعاقد' : 'Contract Details',
    contactPerson: isAr ? 'مسؤول التواصل' : 'Contact Person',
    phone: isAr ? 'الهاتف' : 'Phone',
    email: isAr ? 'البريد الإلكتروني' : 'Email',
    commission: isAr ? 'العمولة' : 'Commission',
    childPolicies: isAr ? 'سياسات الأطفال' : 'Child Policies',
    mealPlans: isAr ? 'خطط الوجبات' : 'Meal Plans',
    cancellation: isAr ? 'سياسات الإلغاء' : 'Cancellation Policies',
    connectedRoom: isAr ? 'يدعم المتصلة' : 'Connected Ready',
    adults: isAr ? 'بالغين' : 'Adults',
    children: isAr ? 'أطفال' : 'Children',
    view: isAr ? 'الإطلالة' : 'View',
  };

  const hotel = {
    id,
    name: id === 'HOT-001' ? 'Palm Hotel & Resort' : 'Grand Plaza',
    stars: 5,
    description: 'A luxurious resort with amazing views, multiple pools, and private beach access.',
    city: id === 'HOT-001' ? 'Dubai' : 'Riyadh',
    country: id === 'HOT-001' ? 'UAE' : 'KSA',
    address: '123 Main Street',
    status: 'Active',
    contactPerson: 'Ahmed Hassan',
    contactPhone: '+971501234567',
    contactEmail: 'sales@palmhotel.com',
    commission: 15,
    facilities: ['Free WiFi', 'Swimming Pool', 'Private Beach', 'Restaurant'],
    mealPlans: ['BB (Bed & Breakfast)', 'HB (Half Board)'],
    rooms: [
      { id: '1', type: 'Standard Room', price: 150, adultCap: 2, childCap: 1, view: 'City View', connectedReady: false, count: 45 },
      { id: '2', type: 'Deluxe Suite', price: 300, adultCap: 4, childCap: 2, view: 'Sea View', connectedReady: true, count: 12 }
    ],
    childRules: [
      { id: '1', ageFrom: 0, ageTo: 5.99, policy: 'Free', discount: 100 },
      { id: '2', ageFrom: 6, ageTo: 11.99, policy: 'Percentage', discount: 50 },
    ],
    cancellationRules: 'Free cancellation up to 7 days before check-in. 50% penalty within 7 days. No-show 100%.'
  };

  return (
    <div className="pb-10 max-w-6xl mx-auto" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push('/admin/hotels')}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-[#0071c2] hover:border-[#0071c2] transition-colors shadow-sm shrink-0"
            aria-label={t.back}
          >
            {isAr ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
          </button>
          <div>
            <div className="flex items-center gap-3">
               <h1 className="text-2xl font-bold text-gray-900">{hotel.name}</h1>
               <div className="flex text-yellow-400">
                 {Array.from({ length: hotel.stars }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                 ))}
               </div>
            </div>
            <p className="text-gray-500 text-sm mt-1">{hotel.id}</p>
          </div>
        </div>
        
        <div className="flex gap-3 shrink-0">
          <Button 
            className="font-bold bg-[#0071c2] hover:bg-[#005999] text-white flex gap-2 items-center"
            onClick={() => router.push(`/admin/hotels/${id}/edit`)}
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
              <h2 className="text-xl font-bold text-gray-900">{t.hotelDetails}</h2>
            </div>
            <p className="text-gray-700 leading-relaxed min-h-[60px]">{hotel.description}</p>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <FileText className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">{t.contractDetails}</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <span className="block text-sm text-gray-500 mb-1">{t.contactPerson}</span>
                <strong className="text-gray-900 block">{hotel.contactPerson}</strong>
              </div>
              <div>
                <span className="block text-sm text-gray-500 mb-1">{t.phone}</span>
                <strong className="text-gray-900 block" dir="ltr">{hotel.contactPhone}</strong>
              </div>
              <div>
                <span className="block text-sm text-gray-500 mb-1">{t.email}</span>
                <strong className="text-gray-900 block">{hotel.contactEmail}</strong>
              </div>
              <div>
                <span className="block text-sm text-gray-500 mb-1">{t.commission}</span>
                <strong className="text-gray-900 block">{hotel.commission}%</strong>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                <BedDouble className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">{t.roomTypes}</h2>
            </div>
            
            <div className="space-y-4">
              {hotel.rooms.map(room => (
                <div key={room.id} className="p-5 rounded-xl border border-gray-200 bg-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-3 flex-1">
                    <h3 className="font-bold text-gray-900 text-lg">{room.type} <span className="text-sm font-normal text-gray-500 ml-2">({room.view})</span></h3>
                    
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                      <span className="flex items-center gap-1.5 text-gray-700">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span>{room.adultCap} {t.adults}, {room.childCap} {t.children}</span>
                      </span>
                      <span className="text-gray-700">
                        {t.count}: <strong className="text-gray-900">{room.count}</strong>
                      </span>
                      {room.connectedReady && (
                        <span className="text-[#0071c2] bg-blue-50 px-2 py-0.5 rounded font-medium">
                          {t.connectedRoom}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-xl font-bold text-[#0071c2] shrink-0">
                    ${room.price} <span className="text-sm font-normal text-gray-500">/ night</span>
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
               {hotel.childRules.map(rule => (
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
            <p className="text-gray-700">{hotel.cancellationRules}</p>
          </section>

        </div>

        {/* Sidebar Options Area */}
        <div className="space-y-8">
          
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
             <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900">{t.status}</h3>
                <span className={`px-3 py-1 text-sm font-bold rounded-full ${hotel.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                   {hotel.status === 'Active' ? t.active : hotel.status}
                </span>
             </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-gray-400" />
              <h3 className="font-bold text-gray-900">{t.location}</h3>
            </div>
            <div className="space-y-2 text-gray-700">
               <div><strong>{hotel.city}, {hotel.country}</strong></div>
               <div className="text-sm">{hotel.address}</div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-gray-900">{t.facilities}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {hotel.facilities.map(facility => (
                <span key={facility} className="px-3 py-1 bg-yellow-50 text-yellow-800 rounded-lg text-sm font-medium border border-yellow-100">
                  {facility}
                </span>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
             <div className="flex items-center gap-2 mb-4">
              <Utensils className="w-5 h-5 text-orange-400" />
              <h3 className="font-bold text-gray-900">{t.mealPlans}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {hotel.mealPlans.map(plan => (
                <span key={plan} className="px-3 py-1 bg-orange-50 text-orange-800 rounded-lg text-sm font-medium border border-orange-100">
                  {plan}
                </span>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

