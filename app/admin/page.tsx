'use client';

import React from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { Users, Building, Calendar, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

export default function AdminDashboardPage() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const stats = [
    { 
      title: isAr ? 'إجمالي الحجوزات' : 'Total Bookings', 
      value: '1,245', 
      icon: Calendar,
      trend: '+12%',
      isPositive: true
    },
    { 
      title: isAr ? 'العائدات' : 'Revenue', 
      value: '$45,231', 
      icon: DollarSign,
      trend: '+8%',
      isPositive: true
    },
    { 
      title: isAr ? 'العملاء الجدد' : 'New Customers', 
      value: '342', 
      icon: Users,
      trend: '-2%',
      isPositive: false
    },
    { 
      title: isAr ? 'الفنادق النشطة' : 'Active Hotels', 
      value: '84', 
      icon: Building,
      trend: '+5%',
      isPositive: true
    },
  ];

  const recentBookings = [
    { id: 'BK-100234', customer: 'Ibrahim Ismael', hotel: 'Palm Hotel & Resort', amount: '$1,250', status: 'Confirmed' },
    { id: 'BK-100235', customer: 'Sarah Johnson', hotel: 'Serenity Suites', amount: '$720', status: 'Pending' },
    { id: 'BK-100236', customer: 'Ahmed Ali', hotel: 'Grand Plaza', amount: '$450', status: 'Confirmed' },
    { id: 'BK-100237', customer: 'Emma Wilson', hotel: 'Sea View Resort', amount: '$890', status: 'Cancelled' },
    { id: 'BK-100238', customer: 'Mohammed R.', hotel: 'Oasis Hotel', amount: '$320', status: 'Confirmed' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-lg ${
                i === 0 ? 'bg-blue-50 text-blue-600' :
                i === 1 ? 'bg-green-50 text-green-600' :
                i === 2 ? 'bg-purple-50 text-purple-600' :
                'bg-orange-50 text-orange-600'
              }`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={`flex items-center text-sm font-medium ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {stat.isPositive ? <TrendingUp className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" /> : <TrendingDown className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />}
                {stat.trend}
              </div>
            </div>
            <div>
              <p className="text-gray-500 font-medium text-sm mb-1">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">{isAr ? 'الحجوزات الأخيرة' : 'Recent Bookings'}</h2>
          <button className="text-sm font-bold text-[#0071c2] hover:underline">
            {isAr ? 'عرض الكل' : 'View All'}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left" dir={isAr ? 'rtl' : 'ltr'}>
            <thead className="bg-gray-50 text-gray-500 text-sm">
              <tr>
                <th className="px-6 py-4 font-medium">{isAr ? 'رقم الحجز' : 'Booking ID'}</th>
                <th className="px-6 py-4 font-medium">{isAr ? 'العميل' : 'Customer'}</th>
                <th className="px-6 py-4 font-medium">{isAr ? 'الفندق' : 'Hotel'}</th>
                <th className="px-6 py-4 font-medium">{isAr ? 'المبلغ' : 'Amount'}</th>
                <th className="px-6 py-4 font-medium">{isAr ? 'الحالة' : 'Status'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentBookings.map((booking, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors text-sm">
                  <td className="px-6 py-4 font-medium text-gray-900">{booking.id}</td>
                  <td className="px-6 py-4 text-gray-600">{booking.customer}</td>
                  <td className="px-6 py-4 text-gray-600">{booking.hotel}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{booking.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                      booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {booking.status === 'Confirmed' ? (isAr ? 'مؤكد' : 'Confirmed') :
                       booking.status === 'Pending' ? (isAr ? 'قيد الانتظار' : 'Pending') :
                       (isAr ? 'ملغى' : 'Cancelled')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
