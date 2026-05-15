'use client';

import React, { use } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { ArrowLeft, ArrowRight, Mail, Phone, Calendar, MapPin, Building, CreditCard, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function AdminCustomerDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const router = useRouter();

  const t = {
    back: isAr ? 'العودة إلى العملاء' : 'Back to Customers',
    customerProfile: isAr ? 'الملف الشخصي للعميل' : 'Customer Profile',
    contactInfo: isAr ? 'معلومات الاتصال' : 'Contact Information',
    email: isAr ? 'البريد الإلكتروني' : 'Email',
    phone: isAr ? 'الهاتف' : 'Phone',
    joinDate: isAr ? 'تاريخ الانضمام' : 'Join Date',
    totalSpent: isAr ? 'إجمالي الإنفاق' : 'Total Spent',
    bookingHistory: isAr ? 'سجل الحجوزات' : 'Booking History',
    noBookings: isAr ? 'لا توجد حجوزات حتى الآن' : 'No bookings yet',
    status: isAr ? 'الحالة' : 'Status',
    bookingId: isAr ? 'رقم الحجز' : 'Booking ID',
    hotel: isAr ? 'الفندق' : 'Hotel',
    dates: isAr ? 'التواريخ' : 'Dates',
    amount: isAr ? 'المبلغ' : 'Amount',
    viewBooking: isAr ? 'عرض الحجز' : 'View Booking',
    active: isAr ? 'نشط' : 'Active',
  };

  // Mock customer data
  const customer = {
    id,
    name: id === 'CUST-001' ? 'Ibrahim Ismael' : 'Sarah Johnson',
    email: id === 'CUST-001' ? 'ibrahim.ismael204@gmail.com' : 'sarah.j@example.com',
    phone: id === 'CUST-001' ? '+971 50 123 4567' : '+1 234 567 8900',
    joinDate: id === 'CUST-001' ? '2025-10-12' : '2026-01-15',
    totalSpent: id === 'CUST-001' ? 4250 : 720,
    status: 'Active',
    avatar: id === 'CUST-001' ? 'I' : 'S',
    bookings: id === 'CUST-001' ? [
      { id: 'BK-100234', hotel: 'Palm Hotel & Resort', checkIn: '2026-06-15', checkOut: '2026-06-20', amount: 1250, status: 'Confirmed' },
      { id: 'BK-098211', hotel: 'Grand Plaza', checkIn: '2025-11-05', checkOut: '2025-11-10', amount: 950, status: 'Completed' },
      { id: 'BK-087110', hotel: 'Oasis Hotel', checkIn: '2025-10-20', checkOut: '2025-10-22', amount: 450, status: 'Completed' }
    ] : [
      { id: 'BK-100235', hotel: 'Serenity Suites', checkIn: '2026-04-10', checkOut: '2026-04-14', amount: 720, status: 'Pending' }
    ]
  };

  return (
    <div className="flex flex-col pb-8" dir={isAr ? 'rtl' : 'ltr'}>
      <main className="flex-grow max-w-5xl w-full">
        
        {/* Header */}
        <div className="mb-6">
          <button 
            onClick={() => router.push('/admin/customers')}
            className="flex items-center text-[#0071c2] hover:underline font-bold mb-4"
          >
            {isAr ? <ArrowRight className="w-4 h-4 ml-2" /> : <ArrowLeft className="w-4 h-4 mr-2" />}
            {t.back}
          </button>
          
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">{t.customerProfile}</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Left Column (Profile Info) */}
          <div className="md:col-span-1 space-y-6">
            
            {/* User Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-4xl mb-4">
                {customer.avatar}
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">{customer.name}</h2>
              <p className="text-gray-500 text-sm mb-4">{customer.id}</p>
              
              <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 text-sm font-bold rounded-full mb-6">
                <CheckCircle className="w-4 h-4 mr-1.5 rtl:ml-1.5 rtl:mr-0" />
                {t.active}
              </div>
              
              <div className="w-full flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100 mb-2">
                <span className="text-gray-600 font-medium text-sm">{t.totalSpent}</span>
                <span className="font-bold text-gray-900">${customer.totalSpent}</span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">{t.contactInfo}</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">{t.email}</p>
                    <p className="text-sm font-medium text-gray-900 break-all">{customer.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">{t.phone}</p>
                    <p className="text-sm font-medium text-gray-900" dir="ltr">{customer.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">{t.joinDate}</p>
                    <p className="text-sm font-medium text-gray-900">{customer.joinDate}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (Booking History) */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-bold text-lg text-gray-900">{t.bookingHistory}</h3>
                <span className="bg-gray-100 text-gray-800 text-xs font-bold px-2.5 py-1 rounded-full">
                  {customer.bookings.length}
                </span>
              </div>
              
              <div className="divide-y divide-gray-100">
                {customer.bookings.length > 0 ? customer.bookings.map((booking) => (
                  <div key={booking.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900">{booking.id}</span>
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                            booking.status === 'Completed' ? 'bg-blue-100 text-blue-700' :
                            booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <Building className="w-4 h-4 shrink-0 text-gray-400" />
                          <span className="font-medium text-gray-900">{booking.hotel}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <Clock className="w-4 h-4 shrink-0 text-gray-400" />
                          <span>{booking.checkIn} — {booking.checkOut}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col justify-between items-start sm:items-end">
                        <div className="font-bold text-lg text-gray-900 mb-4 sm:mb-0">
                          ${booking.amount}
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => router.push(`/admin/bookings/${booking.id}`)}
                          className="font-bold text-[#0071c2] border-[#0071c2]/20 hover:bg-blue-50"
                        >
                          {t.viewBooking}
                        </Button>
                      </div>
                      
                    </div>
                  </div>
                )) : (
                  <div className="p-12 text-center text-gray-500">
                    <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p>{t.noBookings}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
