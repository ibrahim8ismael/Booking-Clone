"use client";

import React from "react";
import { useLanguage } from "@/components/LanguageProvider";

export default function AboutPage() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  return (
    <main className="min-h-screen relative flex flex-col py-12 md:py-20">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=2000&auto=format&fit=crop)",
        }}
      />
      <div className="absolute inset-0 z-0 bg-black/50" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 w-full flex-grow">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#0758AA] mb-8 leading-tight">
            {isAr
              ? "ساعة وساعة.. بوابتك لعالم من الرفاهية والخصوصية"
              : "Sa2a wi Sa2a.. Your gateway to a world of luxury and privacy"}
          </h1>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p className="text-lg leading-relaxed">
              {isAr
                ? "منذ انطلاقنا كشركة سياحية (فئة أ - ترخيص 1138)، وضعنا أمام أعيننا هدفًا واحدًا: أن نجعل من كل رحلة قصة تتحكي."
                : "Since our launch as a tourism company (Class A - License 1138), we have set one goal before our eyes: to make every trip a story worth telling."}
            </p>
            <p className="text-lg leading-relaxed">
              {isAr
                ? "في ساعة وساعة، نحن لا نقدم مجرد حجوزات، بل نصمم تجارب سياحية متكاملة (داخلية، خارجية، رحلات اليوم الواحد، حج وعمرة) تجمع بين الرفاهية والخصوصية والراحة وبدون أي تنازلات."
                : "At Sa2a wi Sa2a, we do not just offer bookings; we design integrated tourism experiences (domestic, international, day trips, Hajj and Umrah) that combine luxury, privacy, and comfort without any compromises."}
            </p>
            <p className="text-lg leading-relaxed font-bold text-gray-900">
              {isAr
                ? "وجهاتنا متنوعة، وعروضنا لا تقاوم، انطلق معنا وعيش التجربة بنفسك"
                : "Our destinations are diverse, and our offers are irresistible. Set off with us and live the experience yourself!"}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
