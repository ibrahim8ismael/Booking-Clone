'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { useAuth } from '@/components/AuthProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter, useSearchParams } from 'next/navigation';

function VerifyOTPContent() {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [countdown, setCountdown] = useState(60);
  const { login } = useAuth();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResend = () => {
    if (countdown === 0) {
      setCountdown(60);
      // In a real app, send the OTP again here
    }
  };

  const t = {
    title: isAr ? 'أدخل رمز التحقق' : 'Enter your verification code',
    description: isAr 
      ? `لقد أرسلنا رمزًا مكونًا من 6 أرقام إلى ${email}`
      : `We sent a 6-digit code to ${email}`,
    verify: isAr ? 'تحقق' : 'Verify',
    didntReceive: isAr ? 'لم تتلق الرمز؟' : "Didn't receive the code?",
    resend: isAr ? 'إعادة الإرسال' : 'Resend',
    back: isAr ? 'العودة' : 'Back',
  };

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Paste logic
      const pastedData = value.slice(0, 6).split('');
      const newOtp = [...otp];
      for (let i = 0; i < pastedData.length; i++) {
        if (index + i < 6) {
          newOtp[index + i] = pastedData[i];
        }
      }
      setOtp(newOtp);
      // Focus the next empty input or the last one
      const nextIndex = Math.min(index + pastedData.length, 5);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Initial simple focus logic
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length === 6) {
      // In a real app, verify OTP here
      // For now, simulate success
      login();
      router.push('/profile');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-12 md:pt-24" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <button 
          onClick={() => router.back()}
          className="text-[#0071c2] hover:underline text-sm mb-6 flex items-center font-bold"
        >
           {isAr ? '← ' : '← '}{t.back}
        </button>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600 mb-8">{t.description}</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-2 mb-6" dir="ltr">
            {otp.map((digit, index) => (
              <Input
                key={index}
                type="text"
                maxLength={6} // allow paste
                value={digit}
                ref={(el) => { inputRefs.current[index] = el; }}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 text-center text-xl font-bold rounded-lg border-gray-300 focus:border-[#0071c2] focus:ring-[#0071c2]"
                inputMode="numeric"
                pattern="[0-9]*"
              />
            ))}
          </div>

          <Button type="submit" className="w-full h-12 text-base font-bold bg-[#0071c2] hover:bg-[#005999] text-white">
            {t.verify}
          </Button>
        </form>

        <div className="mt-8 text-center text-sm">
          <span className="text-gray-600">{t.didntReceive}</span>{' '}
          <button 
            type="button"
            onClick={handleResend}
            disabled={countdown > 0}
            className={`font-bold transition-colors ${countdown > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-[#0071c2] hover:underline'}`}
          >
            {t.resend}{countdown > 0 ? ` (${countdown}s)` : ''}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function VerifyOTPPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOTPContent />
    </Suspense>
  );
}
