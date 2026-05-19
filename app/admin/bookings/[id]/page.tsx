'use client';

import React from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, MapPin, Calendar, Users, CreditCard, Download, Star, CheckCircle, Info } from 'lucide-react';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';

export default function AdminBookingDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const router = useRouter();

  const t = {
    back: isAr ? 'العودة إلى الحجوزات' : 'Back to Bookings',
    bookingDetails: isAr ? 'تفاصيل الحجز' : 'Booking Details',
    confirmed: isAr ? 'مؤكد' : 'Confirmed',
    guest: isAr ? 'ضيف' : 'Guest',
    guestName: isAr ? 'اسم الضيف' : 'Guest Name',
    checkIn: isAr ? 'تسجيل الدخول' : 'Check-in',
    checkOut: isAr ? 'تسجيل الخروج' : 'Check-out',
    roomAndGuests: isAr ? 'الغرف والضيوف' : 'Rooms & Guests',
    oneRoomTwoAdults: isAr ? '١ غرفة، ٢ بالغين' : '1 Room, 2 Adults',
    paymentMethod: isAr ? 'طريقة الدفع' : 'Payment Method',
    visaEndingIn: isAr ? 'فيزا تنتهي بـ' : 'Visa ending in',
    paymentStatus: isAr ? 'حالة الدفع' : 'Payment Status',
    paidInFull: isAr ? 'مدفوع بالكامل' : 'Paid in full',
    cancelBooking: isAr ? 'إلغاء الحجز' : 'Cancel Booking',
    downloadInvoice: isAr ? 'تحميل الفاتورة' : 'Download Invoice',
    priceBreakdown: isAr ? 'تفاصيل السعر' : 'Price Breakdown',
    roomTotal: isAr ? 'إجمالي الغرفة' : 'Room Total',
    taxes: isAr ? 'الضرائب والرسوم' : 'Taxes & Fees',
    totalPrice: isAr ? 'السعر الإجمالي' : 'Total Price',
    nights: isAr ? 'ليالي' : 'Nights',
  };

  // Mock booking data based on ID
  const booking = {
    id,
    hotelName: id === 'BK-100234' ? (isAr ? 'فندق ومنتجع النخيل' : 'Palm Hotel & Resort') : (isAr ? 'أجنحة السكينة' : 'Serenity Suites'),
    location: id === 'BK-100234' ? (isAr ? 'دبي، الإمارات العربية المتحدة' : 'Dubai, UAE') : (isAr ? 'الرياض، السعودية' : 'Riyadh, Saudi Arabia'),
    checkIn: id === 'BK-100234' ? '2026-06-15' : '2026-04-10',
    checkOut: id === 'BK-100234' ? '2026-06-20' : '2026-04-14',
    status: id === 'BK-100234' ? 'upcoming' : 'completed',
    image: id === 'BK-100234' ? 'https://picsum.photos/seed/dubai/800/400' : 'https://picsum.photos/seed/riyadh/800/400',
    rating: 5,
    roomType: isAr ? 'جناح ديلوكس بإطلالة على البحر' : 'Deluxe Ocean View Suite',
    guestName: 'Ibrahim Ismael',
    totalNights: id === 'BK-100234' ? 5 : 4,
    pricePerNight: id === 'BK-100234' ? 250 : 180,
  };

  const roomTotal = booking.pricePerNight * booking.totalNights;
  const taxes = roomTotal * 0.15; // 15% tax
  const totalPrice = roomTotal + taxes;

  return (
    <div className="flex flex-col pb-8" dir={isAr ? 'rtl' : 'ltr'}>
      <main className="flex-grow max-w-4xl w-full">
        
        {/* Header */}
        <div className="mb-6">
          <button 
            onClick={() => router.push('/admin/bookings')}
            className="flex items-center text-[#0071c2] hover:underline font-bold mb-4"
          >
            {isAr ? <ArrowRight className="w-4 h-4 ml-2" /> : <ArrowLeft className="w-4 h-4 mr-2" />}
            {t.back}
          </button>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">{t.bookingDetails}</h1>
              <p className="text-gray-500 font-medium">{t.bookingDetails} #{booking.id}</p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <Button variant="outline" className="flex-1 sm:flex-none border-gray-300 text-gray-700 bg-white">
                <Download className={`w-4 h-4 ${isAr ? 'ml-2' : 'mr-2'}`} />
                {t.downloadInvoice}
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          
          {/* Status Banner */}
          <div className={`p-4 rounded-xl flex items-start gap-3 ${booking.status === 'upcoming' ? 'bg-green-50 border border-green-200' : 'bg-gray-100 border border-gray-200'}`}>
            {booking.status === 'upcoming' ? (
              <CheckCircle className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
            ) : (
              <Info className="w-6 h-6 text-gray-500 shrink-0 mt-0.5" />
            )}
            <div>
              <h3 className={`font-bold ${booking.status === 'upcoming' ? 'text-green-800' : 'text-gray-800'}`}>
                {booking.status === 'upcoming' ? t.confirmed : (isAr ? 'مكتمل' : 'Completed')}
              </h3>
              <p className={`text-sm ${booking.status === 'upcoming' ? 'text-green-700' : 'text-gray-600'} mt-1`}>
                {booking.status === 'upcoming' 
                  ? (isAr ? 'كل شيء جاهز لرحلتك القادمة!' : 'Everything is set for your upcoming trip!')
                  : (isAr ? 'لقد اكتملت هذه الإقامة.' : 'This stay has been completed.')}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex gap-1 mb-2">
                {[...Array(booking.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{booking.hotelName}</h2>
              <div className="flex items-center text-gray-600 gap-2">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span>{booking.location}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Left Column (Details) */}
            <div className="md:col-span-2 space-y-6">
              
              {/* Stay Details */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">{isAr ? 'تفاصيل الإقامة' : 'Stay Details'}</h3>
                
                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> {t.checkIn}
                    </p>
                    <p className="font-bold text-gray-900">{booking.checkIn}</p>
                    <p className="text-sm text-gray-500 mt-1">{isAr ? 'من 14:00' : 'From 14:00'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> {t.checkOut}
                    </p>
                    <p className="font-bold text-gray-900">{booking.checkOut}</p>
                    <p className="text-sm text-gray-500 mt-1">{isAr ? 'حتى 12:00' : 'Until 12:00'}</p>
                  </div>
                  <div className="col-span-2 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-500 mb-1">{isAr ? 'المدة' : 'Duration'}</p>
                    <p className="font-bold text-gray-900">{booking.totalNights} {t.nights}</p>
                  </div>
                </div>
              </div>

              {/* Room & Guest Details */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">{booking.roomType}</h3>
                
                <div className="space-y-4">
                  <div className="flex border-b border-gray-100 pb-4">
                    <div className="w-1/3 text-gray-500">{t.guestName}</div>
                    <div className="w-2/3 font-medium text-gray-900">{booking.guestName}</div>
                  </div>
                  <div className="flex border-b border-gray-100 pb-4">
                    <div className="w-1/3 text-gray-500 flex items-center gap-2">
                      {t.roomAndGuests}
                    </div>
                    <div className="w-2/3 font-medium text-gray-900 flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      {t.oneRoomTwoAdults}
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column (Payment & Price) */}
            <div className="md:col-span-1 space-y-6">
              
              {/* Price Breakdown */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">{t.priceBreakdown}</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.roomTotal} ({booking.totalNights} {t.nights})</span>
                    <span className="font-medium text-gray-900">${roomTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.taxes}</span>
                    <span className="font-medium text-gray-900">${taxes.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between items-center bg-[#0071c2]/5 p-3 rounded-lg -mx-3 mb-1">
                    <span className="font-bold text-gray-900 text-base">{t.totalPrice}</span>
                    <span className="font-bold text-[#0071c2] text-xl">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">{t.paymentMethod}</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-6 bg-blue-100 rounded flex items-center justify-center text-blue-800 font-bold text-xs italic shrink-0">
                      VISA
                    </div>
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">{t.visaEndingIn} 4242</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-500 mb-1">{t.paymentStatus}</p>
                    <p className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">
                      <CheckCircle className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0" />
                      {t.paidInFull}
                    </p>
                  </div>
                </div>
              </div>

              {booking.status === 'upcoming' && (
                <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 h-11 font-bold">
                  {t.cancelBooking}
                </Button>
              )}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
