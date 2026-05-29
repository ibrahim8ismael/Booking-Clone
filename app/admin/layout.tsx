'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/components/LanguageProvider';
import { LayoutDashboard, Users, Map, Calendar, Globe, LogOut, Menu } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { language, setLanguage } = useLanguage();
  const isAr = language === 'ar';
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/admin/login') {
    return <div dir={isAr ? 'rtl' : 'ltr'}>{children}</div>;
  }

  const navItems = [
    { name: isAr ? 'لوحة التحكم' : 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: isAr ? 'الرحلات' : 'Tours', href: '/admin/tours', icon: Map },
    { name: isAr ? 'الحجوزات' : 'Bookings', href: '/admin/bookings', icon: Calendar },
    { name: isAr ? 'العملاء' : 'Customers', href: '/admin/customers', icon: Users },
  ];

  const handleLogout = () => {
    // In a real app we would clear session/cookies here
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#003580] text-white flex flex-col shrink-0">
        <div className="p-6">
          <Link href="/admin" className="text-xl font-bold">
            Admin Dashboard
          </Link>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive 
                    ? 'bg-white/20 text-white' 
                    : 'text-blue-100 hover:bg-white/10'
                }`}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 mt-auto space-y-2">
          <button
            onClick={() => setLanguage(isAr ? 'en' : 'ar')}
            className="flex items-center gap-3 px-4 py-3 w-full text-left text-blue-100 hover:text-white hover:bg-white/10 rounded-lg font-medium transition-colors"
          >
            <Globe className="w-5 h-5 shrink-0" />
            {isAr ? 'English' : 'العربية'}
          </button>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left text-blue-100 hover:text-white hover:bg-white/10 rounded-lg font-medium transition-colors"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {isAr ? 'تسجيل الخروج' : 'Logout'}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
             <button className="md:hidden p-2 text-gray-600">
               <Menu className="w-6 h-6" />
             </button>
             <h2 className="text-xl font-semibold text-gray-800">
               {navItems.find(item => item.href === pathname)?.name || 'Admin'}
             </h2>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium text-gray-600">
            <span>Admin User</span>
            <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
               A
            </div>
          </div>
        </header>
        
        <div className="p-6 flex-1 overflow-auto bg-gray-50">
          {children}
        </div>
      </main>
    </div>
  );
}
