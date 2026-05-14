'use client';

import React, { useEffect } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { useAuth } from '@/components/AuthProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Mail, Phone, MapPin, Calendar, CreditCard, LogOut } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';

export default function ProfilePage() {
  const { language } = useLanguage();
  const { isLoggedIn, logout } = useAuth();
  const isAr = language === 'ar';
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/signin');
    }
  }, [isLoggedIn, router]);

  const t = {
    myProfile: isAr ? 'الملف الشخصي' : 'My Profile',
    personalInfo: isAr ? 'المعلومات الشخصية' : 'Personal Information',
    recentBookings: isAr ? 'حجوزاتي الأخيرة' : 'Recent Bookings',
    name: isAr ? 'الاسم' : 'Name',
    email: isAr ? 'البريد الإلكتروني' : 'Email address',
    phone: isAr ? 'رقم الهاتف' : 'Phone Number',
    editProfile: isAr ? 'تعديل الملف الشخصي' : 'Edit Profile',
    bookingReference: isAr ? 'رقم الحجز' : 'Booking Ref',
    dates: isAr ? 'التواريخ' : 'Dates',
    status: isAr ? 'الحالة' : 'Status',
    confirmed: isAr ? 'مؤكد' : 'Confirmed',
    viewDetails: isAr ? 'عرض التفاصيل' : 'View Details',
    noBookings: isAr ? 'لا توجد حجوزات سابقة' : 'No recent bookings',
    logout: isAr ? 'تسجيل الخروج' : 'Log out',
    saveChanges: isAr ? 'حفظ التغييرات' : 'Save Changes',
    cancel: isAr ? 'إلغاء' : 'Cancel',
  };

  const [userConfig, setUserConfig] = React.useState({
    name: 'Ibrahim Ismael',
    email: 'ibrahim.ismael204@gmail.com',
    phone: '+1 234 567 8900'
  });

  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [editForm, setEditForm] = React.useState(userConfig);

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserConfig(editForm);
    setIsEditDialogOpen(false);
  };

  const mockBookings = [
    {
      id: 'BK-100234',
      hotelName: isAr ? 'فندق ومنتجع النخيل' : 'Palm Hotel & Resort',
      location: isAr ? 'دبي، الإمارات العربية المتحدة' : 'Dubai, UAE',
      checkIn: '2026-06-15',
      checkOut: '2026-06-20',
      status: 'upcoming',
      image: 'https://picsum.photos/seed/dubai/400/300'
    },
    {
      id: 'BK-099482',
      hotelName: isAr ? 'أجنحة السكينة' : 'Serenity Suites',
      location: isAr ? 'الرياض، السعودية' : 'Riyadh, Saudi Arabia',
      checkIn: '2026-04-10',
      checkOut: '2026-04-14',
      status: 'completed',
      image: 'https://picsum.photos/seed/riyadh/400/300'
    }
  ];

  if (!isLoggedIn) return null; // or loading state

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-8 pb-16" dir={isAr ? 'rtl' : 'ltr'}>
      <main className="flex-grow max-w-6xl mx-auto w-full px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t.myProfile}</h1>
          <Button 
            variant="outline" 
            className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
            onClick={() => {
              logout();
              router.push('/');
            }}
          >
            <LogOut className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
            {t.logout}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Sidebar / Personal Info */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 bg-[#0071c2]/10 rounded-full flex items-center justify-center text-[#0071c2] mb-4">
                  <User className="w-12 h-12" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">{userConfig.name}</h2>
                <p className="text-sm text-gray-500">{t.personalInfo}</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-sm break-all">{userConfig.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-sm" dir="ltr">{userConfig.phone}</span>
                </div>
              </div>
              
              <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <Button 
                  onClick={() => setIsEditDialogOpen(true)}
                  className="w-full mt-6 bg-[#0071c2] hover:bg-[#005999] text-white font-bold h-11"
                >
                  {t.editProfile}
                </Button>
                <DialogContent className="sm:max-w-md" dir={isAr ? 'rtl' : 'ltr'}>
                  <DialogHeader>
                    <DialogTitle className={isAr ? 'text-right outline-none' : 'text-left outline-none'}>
                      {t.editProfile}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleEditSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-gray-700">
                        {t.name}
                      </label>
                      <Input
                        id="name"
                        value={editForm.name}
                        onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-gray-700">
                        {t.email}
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full text-left"
                        dir="ltr"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                        {t.phone}
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        value={editForm.phone}
                        onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full text-left"
                        dir="ltr"
                        required
                      />
                    </div>
                    <DialogFooter className="mt-6 flex gap-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => {
                          setEditForm(userConfig);
                          setIsEditDialogOpen(false);
                        }}
                      >
                        {t.cancel}
                      </Button>
                      <Button type="submit" className="bg-[#0071c2] hover:bg-[#005999] text-white font-bold">
                        {t.saveChanges}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <nav className="space-y-2">
                    <a href="#" className="flex items-center gap-3 text-[#0071c2] font-semibold p-2 rounded-lg bg-[#0071c2]/5">
                        <Calendar className="w-5 h-5" />
                        {t.recentBookings}
                    </a>
                    <a href="#" className="flex items-center gap-3 text-gray-600 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                        <CreditCard className="w-5 h-5 opacity-70" />
                        {isAr ? 'طرق الدفع' : 'Payment Methods'}
                    </a>
                </nav>
            </div>
          </div>
          
          {/* Main Content / Recent Bookings */}
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.recentBookings}</h2>
            
            {mockBookings.length > 0 ? (
                <div className="space-y-4">
                    {mockBookings.map((booking) => (
                        <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col sm:flex-row">
                            <div className="relative w-full sm:w-48 h-48 sm:h-auto shrink-0">
                                <Image 
                                    src={booking.image} 
                                    alt={booking.hotelName}
                                    fill
                                    className="object-cover"
                                    referrerPolicy="no-referrer"
                                />
                            </div>
                            <div className="p-6 flex-grow flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg font-bold text-gray-900">{booking.hotelName}</h3>
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                                            booking.status === 'upcoming' 
                                            ? 'bg-green-100 text-green-700' 
                                            : 'bg-gray-100 text-gray-600'
                                        }`}>
                                            {booking.status === 'upcoming' ? (isAr ? 'قادم' : 'Upcoming') : (isAr ? 'مكتمل' : 'Completed')}
                                        </span>
                                    </div>
                                    <div className="flex items-center text-gray-500 text-sm mb-4 gap-1">
                                        <MapPin className="w-4 h-4" />
                                        <span>{booking.location}</span>
                                    </div>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between border-t border-gray-100 pt-3">
                                        <span className="text-gray-500">{t.dates}:</span>
                                        <span className="font-medium text-gray-900">{booking.checkIn} — {booking.checkOut}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">{t.bookingReference}:</span>
                                        <span className="font-medium text-gray-900">{booking.id}</span>
                                    </div>
                                </div>
                                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                                    <Button 
                                        variant="outline" 
                                        className="text-[#0071c2] border-[#0071c2] hover:bg-[#0071c2]/5 h-9 font-bold"
                                        onClick={() => router.push(`/booking/${booking.id}`)}
                                    >
                                        {t.viewDetails}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-200 text-center flex flex-col items-center">
                    <Calendar className="w-12 h-12 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{t.noBookings}</h3>
                    <p className="text-gray-500">{isAr ? 'لم تقم بأي حجوزات مؤخراً.' : 'You haven\'t made any bookings recently.'}</p>
                </div>
            )}
            
          </div>
        </div>
      </main>
    </div>
  );
}
