'use client';

import React, { use } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { ArrowLeft, ArrowRight, Save, Image as ImageIcon, MapPin, Building, BedDouble, Edit, Trash2 } from 'lucide-react';
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
    facilities: isAr ? 'المرافق' : 'Facilities',
    roomTypes: isAr ? 'أنواع الغرف' : 'Room Types',
    price: isAr ? 'السعر' : 'Price',
    capacity: isAr ? 'السعة' : 'Capacity',
    count: isAr ? 'العدد' : 'Count',
  };

  const hotel = {
    id,
    name: id === 'HOT-001' ? 'Palm Hotel & Resort' : 'Grand Plaza',
    description: 'A luxurious resort with amazing views, multiple pools, and private beach access.',
    location: id === 'HOT-001' ? 'Dubai, UAE' : 'Riyadh, KSA',
    status: 'Active',
    facilities: ['Free WiFi', 'Swimming Pool', 'Gym', 'Restaurant'],
    rooms: [
      { id: '1', type: 'Standard Room', price: 150, capacity: 2, count: 45 },
      { id: '2', type: 'Deluxe Suite', price: 300, capacity: 4, count: 12 }
    ]
  };

  return (
    <div className="pb-10 max-w-5xl mx-auto" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push('/admin/hotels')}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-[#0071c2] hover:border-[#0071c2] transition-colors shadow-sm"
          >
            {isAr ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{hotel.name}</h1>
            <p className="text-gray-500 text-sm">{hotel.id}</p>
          </div>
        </div>
        
        <div className="flex gap-3">
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
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
             <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="p-2 bg-blue-50 text-[#0071c2] rounded-lg">
                <Building className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">{t.hotelDetails}</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">{hotel.description}</p>
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
                <div key={room.id} className="p-4 rounded-xl border border-gray-200 bg-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{room.type}</h3>
                    <div className="flex gap-4 mt-2 text-sm text-gray-600">
                      <span>{t.capacity}: <strong className="text-gray-900">{room.capacity}</strong></span>
                      <span>{t.count}: <strong className="text-gray-900">{room.count}</strong></span>
                    </div>
                  </div>
                  <div className="text-xl font-bold text-[#0071c2]">
                    ${room.price} <span className="text-sm font-normal text-gray-500">/ night</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">{t.location}</h3>
            <div className="flex items-center gap-3 text-gray-700">
              <MapPin className="w-5 h-5 text-gray-400" />
              <span>{hotel.location}</span>
            </div>
            
            <h3 className="font-bold text-gray-900 mt-8 mb-4">{t.facilities}</h3>
            <div className="flex flex-wrap gap-2">
              {hotel.facilities.map(facility => (
                <span key={facility} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                  {facility}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
