'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLanguage } from '@/components/LanguageProvider';
import { Footer } from '@/components/Footer';
import Image from 'next/image';
import { MapPin, Check, Info, Users, Baby, Link as LinkIcon, Utensils, BedDouble, Minus, Plus, Calendar } from 'lucide-react';
import Link from 'next/link';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader } from '@/components/ui/dialog';

export default function BookPage() {
  const params = useParams();
  const router = useRouter();
  const { language } = useLanguage();
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  
  const [selectedRoomId, setSelectedRoomId] = useState('1');
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);
  const [nights, setNights] = useState(1);
  const [roomsCount, setRoomsCount] = useState(1);
  
  // Mock data, in real app would fetch based on params.id
  const isHOT001 = params.id === 'HOT-001';
  const stay = { 
    id: params.id,
    name: isHOT001 ? 'Palm Hotel & Resort' : 'Grand Plaza', 
    type: language === 'ar' ? 'منتجع' : 'Resort',
    stars: 5,
    location: language === 'ar' ? 'دبي، الإمارات العربية المتحدة' : 'Dubai, UAE',
    address: '123 Palm Jumeirah Street, Dubai',
    rating: 8.6, 
    ratingText: language === 'ar' ? 'رائع' : 'Fabulous',
    reviews: 2728, 
    image: 'https://picsum.photos/seed/stay12/1200/600',
    description: language === 'ar' 
      ? 'منتجع فاخر يوفر إطلالات مذهلة مع حمامات سباحة متعددة وشاطئ خاص. يقع هذا المنتجع في قلب منطقة جميرا ويوفر تجربة لا تُنسى للعائلات والأزواج مع مطاعم عالمية وخدمات استثنائية.' 
      : 'A luxurious resort with amazing views, multiple pools, and private beach access. Located in the heart of Jumeirah, it offers an unforgettable experience for families and couples with world-class restaurants and exceptional services.',
    facilities: [
      { icon: 'wifi', label: language === 'ar' ? 'واي فاي مجاني' : 'Free WiFi' },
      { icon: 'kids', label: language === 'ar' ? 'منطقة أطفال' : 'Kids Area' },
      { icon: 'pool', label: language === 'ar' ? 'مسبح خارجي' : 'Outdoor Pool' },
      { icon: 'beach', label: language === 'ar' ? 'شاطئ خاص' : 'Private Beach' },
      { icon: 'restaurant', label: language === 'ar' ? 'مطاعم فاخرة' : 'Fine Dining' },
      { icon: 'gym', label: language === 'ar' ? 'صالة رياضية' : 'Fitness Center' }
    ],
    mealPlans: ['BB (Bed & Breakfast)', 'HB (Half Board)'],
    rooms: [
      { id: '1', type: language === 'ar' ? 'غرفة قياسية' : 'Standard Room', price: 150, adultCap: 2, childCap: 1, view: language === 'ar' ? 'إطلالة مدينة' : 'City View', connectedReady: false, count: 5 },
      { id: '2', type: language === 'ar' ? 'جناح ديلوكس' : 'Deluxe Suite', price: 300, adultCap: 4, childCap: 2, view: language === 'ar' ? 'إطلالة بحر' : 'Sea View', connectedReady: true, count: 2 }
    ],
    childRules: [
      { ageFrom: 0, ageTo: 5.99, discount: 100 },
      { ageFrom: 6, ageTo: 11.99, discount: 50 }
    ]
  };

  const selectedRoom = stay.rooms.find(r => r.id === selectedRoomId) || stay.rooms[0];
  
  // Pricing Calculation
  const roomBasePrice = selectedRoom.price;
  const kidsPrice = kids * 25; // 25 per kid
  const extraAdults = Math.max(0, adults - (selectedRoom.adultCap * roomsCount));
  const extraAdultPrice = extraAdults * 40; // 40 per extra adult
  const totalPrice = (roomBasePrice * roomsCount + kidsPrice + extraAdultPrice) * nights;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow max-w-5xl w-full mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-[#0758AA] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{stay.type}</span>
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">{stay.name}</h1>
          <div className="flex items-center gap-2 text-sm text-gray-600">
             <MapPin className="w-5 h-5 text-[#0758AA]" />
             <span className="font-medium">{stay.location}</span>
          </div>
        </div>

        {/* Hero Image Gallery */}
        <div 
          className="grid grid-cols-4 gap-2 h-[300px] md:h-[400px] mb-8"
          onClick={() => setIsGalleryOpen(true)}
        >
          <div className="col-span-2 row-span-2 relative rounded-l-lg overflow-hidden cursor-pointer group">
             <Image src={stay.image} fill alt={stay.name} className="object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
          </div>
          <div className="relative overflow-hidden cursor-pointer group">
             <Image src="https://picsum.photos/seed/stay12_room/600/400" fill alt="Room 1" className="object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
          </div>
          <div className="relative overflow-hidden rounded-tr-lg cursor-pointer group">
             <Image src="https://picsum.photos/seed/stay12_view/600/400" fill alt="View" className="object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
          </div>
          <div className="relative overflow-hidden cursor-pointer group">
             <Image src="https://picsum.photos/seed/stay12_pool/600/400" fill alt="Pool" className="object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
          </div>
          <div className="relative overflow-hidden rounded-br-lg cursor-pointer group flex items-center justify-center">
             <Image src="https://picsum.photos/seed/stay12_bath/600/400" fill alt="Bathroom" className="object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
             <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                <span className="text-white font-bold text-lg">+12 {language === 'ar' ? 'صور' : 'Photos'}</span>
             </div>
          </div>
        </div>

        {/* Gallery Dialog */}
        <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
          <DialogContent className="max-w-5xl h-[80vh] flex flex-col p-0 gap-0 overflow-hidden bg-black border-none">
            <DialogHeader className="sr-only">
              <DialogTitle>Photo Gallery</DialogTitle>
              <DialogDescription>Browse all photos of the property</DialogDescription>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="col-span-full h-[400px] relative rounded-lg overflow-hidden">
                  <Image src={stay.image} fill alt="Main" className="object-cover" referrerPolicy="no-referrer" />
                </div>
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="aspect-[4/3] relative rounded-lg overflow-hidden">
                    <Image src={`https://picsum.photos/seed/stay12_gall_${i}/800/600`} fill alt={`Gallery ${i}`} className="object-cover" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-[2] flex flex-col gap-8">
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold mb-4">{language === 'ar' ? 'وصف مكان الإقامة' : 'Property Description'}</h2>
              <p className="text-gray-700 leading-relaxed">
                {stay.description}
              </p>
            </section>
            
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold mb-4">{language === 'ar' ? 'المرافق الأبرز' : 'Main Facilities'}</h2>
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {stay.facilities.map((facility, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-gray-700 p-2 rounded-lg bg-gray-50 border border-gray-100">
                    <Check className="w-4 h-4 text-green-600 shrink-0" />
                    {facility.label}
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <Utensils className="w-5 h-5 text-orange-500" />
                <h2 className="text-xl font-bold">{language === 'ar' ? 'خطط الوجبات المتوفرة' : 'Available Meal Plans'}</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {stay.mealPlans.map((plan, i) => (
                  <span key={i} className="bg-orange-50 text-orange-700 px-3 py-1.5 rounded-lg text-sm font-bold border border-orange-100">
                    {plan}
                  </span>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold">{language === 'ar' ? 'الأسعار والغرف المتوفرة' : 'Availability & Prices'}</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                  <thead className="bg-[#0758AA] text-white">
                    <tr>
                      <th className="px-6 py-4 font-bold">{language === 'ar' ? 'نوع الغرفة' : 'Room Type'}</th>
                      <th className="px-6 py-4 font-bold">{language === 'ar' ? 'السعة القصوى' : 'Max Capacity'}</th>
                      <th className="px-6 py-4 font-bold">{language === 'ar' ? 'السعر (ليلة)' : 'Price (Night)'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {stay.rooms.map((room) => (
                      <tr key={room.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <span className="font-bold text-gray-900 text-lg flex items-center gap-2">
                              {room.type}
                            </span>
                            <span className="text-sm text-gray-500">{room.view}</span>
                            {room.connectedReady && (
                              <span className="text-xs text-[#0758AA] bg-blue-50 px-2 py-0.5 rounded flex w-fit items-center gap-1 mt-1 font-medium">
                                <LinkIcon className="w-3 h-3" />
                                {language === 'ar' ? 'يدعم غرف متصلة' : 'Connected rooms supported'}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1 text-gray-700 bg-gray-100 px-2 py-1 rounded-md">
                                 <Users className="w-4 h-4" />
                                 <span className="font-bold">{room.adultCap}</span>
                              </div>
                              <div className="flex items-center gap-1 text-gray-700 bg-gray-100 px-2 py-1 rounded-md">
                                 <Baby className="w-4 h-4" />
                                 <span className="font-bold">{room.childCap}</span>
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-2xl font-black text-gray-900 border-b-2 border-transparent hover:border-[#0758AA] w-fit cursor-pointer transition-all">
                            ${room.price}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">{language === 'ar' ? 'شامل الضرائب والرسوم' : 'Includes taxes & fees'}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 bg-pink-50/30">
                <div className="flex items-center gap-2 mb-4">
                  <Baby className="w-5 h-5 text-pink-500" />
                  <h2 className="text-xl font-bold">{language === 'ar' ? 'سياسات الأطفال' : 'Children Policies'}</h2>
                </div>
                <div className="space-y-3">
                  {stay.childRules.map((rule, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-white p-3 border border-pink-100 rounded-xl shadow-sm">
                      <span className="text-gray-700 font-medium whitespace-nowrap">
                        {language === 'ar' ? `الأعمار من ${rule.ageFrom} إلى ${rule.ageTo}` : `Age ${rule.ageFrom} to ${rule.ageTo}`}
                      </span>
                      <span className="text-pink-600 font-bold bg-pink-50 px-3 py-1 rounded-lg">
                        {rule.discount === 100 ? (language === 'ar' ? 'مجاناً' : 'Free') : `${rule.discount}% OFF`}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* Booking Widget */}
          <div className="flex-[1]">
            <div className="bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 sticky top-8">
              <h3 className="font-bold text-2xl text-gray-900 mb-6">
                {language === 'ar' ? 'تفاصيل الحجز' : 'Booking Details'}
              </h3>
              
              <div className="space-y-5 mb-6">
                {/* Room Selection */}
                <div className="space-y-2">
                   <label className="text-sm font-bold text-gray-700">{language === 'ar' ? 'اختر الغرفة' : 'Select Room'}</label>
                   <select 
                     value={selectedRoomId} 
                     onChange={(e) => setSelectedRoomId(e.target.value)}
                     className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-900 font-medium focus:ring-2 focus:ring-[#0758AA] outline-none"
                   >
                      {stay.rooms.map(room => (
                        <option key={room.id} value={room.id}>{room.type} - ${room.price}</option>
                      ))}
                   </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Nights */}
                  <div className="space-y-2">
                     <label className="text-sm font-bold text-gray-700">{language === 'ar' ? 'الليالي' : 'Nights'}</label>
                     <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-2">
                       <button onClick={() => setNights(Math.max(1, nights - 1))} className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-gray-600 hover:text-[#0758AA]">
                         <Minus className="w-4 h-4" />
                       </button>
                       <span className="font-bold text-gray-900">{nights}</span>
                       <button onClick={() => setNights(nights + 1)} className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-gray-600 hover:text-[#0758AA]">
                         <Plus className="w-4 h-4" />
                       </button>
                     </div>
                  </div>
                  {/* Rooms */}
                  <div className="space-y-2">
                     <label className="text-sm font-bold text-gray-700">{language === 'ar' ? 'الغرف' : 'Rooms'}</label>
                     <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-2">
                       <button onClick={() => setRoomsCount(Math.max(1, roomsCount - 1))} className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-gray-600 hover:text-[#0758AA]">
                         <Minus className="w-4 h-4" />
                       </button>
                       <span className="font-bold text-gray-900">{roomsCount}</span>
                       <button onClick={() => setRoomsCount(roomsCount + 1)} className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-gray-600 hover:text-[#0758AA]">
                         <Plus className="w-4 h-4" />
                       </button>
                     </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Adults */}
                  <div className="space-y-2">
                     <label className="text-sm font-bold text-gray-700">{language === 'ar' ? 'البالغين' : 'Adults'}</label>
                     <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-2">
                       <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-gray-600 hover:text-[#0758AA]">
                         <Minus className="w-4 h-4" />
                       </button>
                       <span className="font-bold text-gray-900">{adults}</span>
                       <button onClick={() => setAdults(adults + 1)} className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-gray-600 hover:text-[#0758AA]">
                         <Plus className="w-4 h-4" />
                       </button>
                     </div>
                  </div>
                  {/* Kids */}
                  <div className="space-y-2">
                     <label className="text-sm font-bold text-gray-700">{language === 'ar' ? 'الأطفال' : 'Kids'}</label>
                     <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-2">
                       <button onClick={() => setKids(Math.max(0, kids - 1))} className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-gray-600 hover:text-[#0758AA]">
                         <Minus className="w-4 h-4" />
                       </button>
                       <span className="font-bold text-gray-900">{kids}</span>
                       <button onClick={() => setKids(kids + 1)} className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-gray-600 hover:text-[#0758AA]">
                         <Plus className="w-4 h-4" />
                       </button>
                     </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl mb-6 shadow-inner border border-gray-100 space-y-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#0758AA]/5 rounded-bl-full" />
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">{language === 'ar' ? 'سعر الغرفة' : 'Room Base Price'} ({roomsCount}x)</span>
                  <span className="font-bold">${roomBasePrice * roomsCount * nights}</span>
                </div>
                {kidsPrice > 0 && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">{language === 'ar' ? 'رسوم الأطفال' : 'Kids Fees'}</span>
                    <span className="font-bold text-orange-600">+${kidsPrice * nights}</span>
                  </div>
                )}
                {extraAdultPrice > 0 && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">{language === 'ar' ? 'رسوم اضافية (بالغين)' : 'Extra Adults'}</span>
                    <span className="font-bold text-orange-600">+${extraAdultPrice * nights}</span>
                  </div>
                )}
                <div className="pt-3 border-t border-gray-200 flex justify-between items-end">
                  <div>
                    <span className="block text-gray-700 font-bold mb-1">{language === 'ar' ? 'الإجمالي' : 'Total Price'}</span>
                    <span className="text-xs text-gray-500">{language === 'ar' ? 'شامل الضرائب والرسوم' : 'Includes taxes & fees'}</span>
                  </div>
                  <span className="text-4xl font-black text-[#0758AA]">${totalPrice}</span>
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={() => router.push(`/checkout/${params.id}`)} 
                  className="w-full bg-[#0758AA] hover:bg-[#064a91] text-white font-bold text-lg py-4 rounded-xl transition-all shadow-sm block text-center shadow-[#0758AA]/20 hover:shadow-md hover:-translate-y-0.5"
                >
                  {language === 'ar' ? 'احجز الآن' : 'Reserve Now'}
                </button>
                <Link 
                  href="/policies"
                  className="block text-center text-sm text-[#0758AA] hover:underline font-medium"
                >
                  {language === 'ar' ? 'مراجعة سياسات الفندق والإلغاء' : 'Review hotel & cancellation policies'}
                </Link>
                <p className="text-center text-xs text-gray-400 mt-2">
                  {language === 'ar' ? 'لن يتم خصم أي مبلغ الآن' : 'You won\'t be charged yet'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
