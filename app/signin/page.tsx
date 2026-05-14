'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const router = useRouter();
  
  const [email, setEmail] = useState('');

  const t = {
    title: isAr ? 'تسجيل الدخول أو إنشاء حساب' : 'Sign in or create an account',
    emailLabel: isAr ? 'البريد الإلكتروني' : 'Email address',
    continueWithEmail: isAr ? 'المتابعة باستخدام البريد الإلكتروني' : 'Continue with email',
    orUseOneOfThese: isAr ? 'أو استخدم إحدى هذه الخيارات' : 'or use one of these options',
    continueWithGoogle: isAr ? 'المتابعة باستخدام Google' : 'Continue with Google',
    continueWithFacebook: isAr ? 'المتابعة باستخدام Facebook' : 'Continue with Facebook',
    terms: isAr 
      ? 'بالمتابعة ، فإنك توافق على الشروط والأحكام الخاصة بنا وبيان الخصوصية.' 
      : 'By signing in or creating an account, you agree with our Terms & conditions and Privacy statement',
    back: isAr ? 'العودة' : 'Back',
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In a real app, we would send the OTP request here
      router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-12 md:pt-24" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">{t.title}</h1>
        
        <form onSubmit={handleEmailSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-bold text-gray-900">
              {t.emailLabel}
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-base h-12"
              required
            />
          </div>

          <Button type="submit" className="w-full h-12 text-base font-bold bg-[#0071c2] hover:bg-[#005999] text-white">
            {t.continueWithEmail}
          </Button>
        </form>

        <div className="mt-8 mb-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">{t.orUseOneOfThese}</span>
          </div>
        </div>

        <div className="space-y-4">
          <Button 
            type="button" 
            variant="outline" 
            className="w-full h-14 text-base font-medium flex items-center justify-center gap-3 border-gray-300 hover:bg-gray-50"
            onClick={() => { /* In a real app, trigger Google OAuth */ }}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            {t.continueWithGoogle}
          </Button>

          <Button 
            type="button" 
            variant="outline" 
            className="w-full h-14 text-base font-medium flex items-center justify-center gap-3 border-gray-300 hover:bg-gray-50 text-[#1877F2]"
            onClick={() => { /* In a real app, trigger Facebook OAuth */ }}
          >
            <Facebook className="w-6 h-6 fill-current" />
            <span className="text-gray-900">{t.continueWithFacebook}</span>
          </Button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-center text-gray-500 max-w-sm mx-auto leading-relaxed">
            {t.terms}
          </p>
        </div>
      </div>
    </div>
  );
}
