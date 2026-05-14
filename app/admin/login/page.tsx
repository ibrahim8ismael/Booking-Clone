'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

export default function AdminLoginPage() {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const t = {
    title: isAr ? 'تسجيل الدخول للمسؤولين' : 'Admin Login',
    description: isAr ? 'أدخل بيانات الاعتماد الخاصة بك للوصول إلى لوحة التحكم' : 'Enter your credentials to access the dashboard',
    emailLabel: isAr ? 'البريد الإلكتروني' : 'Email Address',
    passwordLabel: isAr ? 'كلمة المرور' : 'Password',
    login: isAr ? 'تسجيل الدخول' : 'Login',
    backToSite: isAr ? 'العودة للموقع' : 'Back to Site',
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      // In a real app, we would authenticate here
      router.push('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-[#003580] p-6 text-white text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold">{t.title}</h1>
          <p className="text-blue-100 mt-2 text-sm">{t.description}</p>
        </div>
        
        <form onSubmit={handleLogin} className="p-8 space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-bold text-gray-900">
              {t.emailLabel}
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 bg-gray-50 text-left"
              dir="ltr"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-bold text-gray-900">
              {t.passwordLabel}
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 bg-gray-50 text-left"
              dir="ltr"
              required
            />
          </div>

          <Button type="submit" className="w-full h-12 text-base font-bold bg-[#0071c2] hover:bg-[#005999] text-white">
            {t.login}
          </Button>
        </form>
        
        <div className="bg-gray-50 p-4 border-t border-gray-200 text-center">
          <button 
            type="button"
            onClick={() => router.push('/')}
            className="text-sm text-gray-600 hover:text-[#0071c2] font-medium"
          >
            {t.backToSite}
          </button>
        </div>
      </div>
    </div>
  );
}
