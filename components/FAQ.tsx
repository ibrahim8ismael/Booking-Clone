'use client';

import React from 'react';
import { useLanguage } from './LanguageProvider';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const faqs = [
    {
      id: "item-1",
      q: isAr ? "كيف يمكنني حجز إقامة؟" : "How do I book a stay?",
      a: isAr 
        ? "يمكنك حجز إقامة بسهولة عن طريق إدخال وجهتك وتواريخ السفر وعدد الضيوف في شريط البحث، ثم اختيار الإقامة المناسبة لك واتباع خطوات الدفع." 
        : "You can easily book a stay by entering your destination, travel dates, and number of guests in the search bar, then selecting the right accommodation and following the checkout steps."
    },
    {
      id: "item-2",
      q: isAr ? "هل يمكنني إلغاء حجزي؟" : "Can I cancel my reservation?",
      a: isAr 
        ? "نعم، معظم الإقامات تقدم خيار إلغاء الحجز مجانًا. يرجى التحقق من سياسة الإلغاء الخاصة بكل إقامة قبل الحجز." 
        : "Yes, most stays offer a free cancellation option. Please check the cancellation policy for each property before booking."
    },
    {
      id: "item-3",
      q: isAr ? "ما هي طرق الدفع المتاحة؟" : "What payment methods are available?",
      a: isAr 
        ? "نقبل معظم بطاقات الائتمان والخصم الرئيسية، بالإضافة إلى طرق الدفع الإلكترونية المتاحة في منطقتك." 
        : "We accept most major credit and debit cards, as well as electronic payment methods available in your region."
    },
    {
      id: "item-4",
      q: isAr ? "هل يمكنني تغيير تواريخ الحجز؟" : "Can I change my booking dates?",
      a: isAr 
        ? "نعم، يمكنك تعديل تواريخ الحجز الخاصة بك عن طريق تسجيل الدخول إلى حسابك والذهاب إلى 'حجوزاتي'. قد تطبق رسوم تغيير بناءً على سياسة الإقامة." 
        : "Yes, you can modify your booking dates by logging into your account and going to 'My Bookings'. Change fees may apply depending on the property's policy."
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          {isAr ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
        </h2>
        <Accordion className="w-full" dir={isAr ? 'rtl' : 'ltr'}>
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger className="text-base font-bold text-gray-800 hover:text-[#0758AA]">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed text-base pt-1">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
