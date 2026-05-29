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
      q: isAr ? "كيف يمكنني حجز رحلتي؟" : "How can I book my trip?",
      a: isAr 
        ? "بمنتهى السهولة! تقدر تحجز رحلتك مباشرة من خلال موقعنا، أو تشرفنا بالاتصال الهاتفي، أو زيارة مقرنا لتنسيق كافة التفاصيل مع فريق خدمة العملاء." 
        : "It's very easy! You can book your trip directly through our website, give us a call, or visit our office to coordinate all the details with our customer service team."
    },
    {
      id: "item-2",
      q: isAr ? "ما هي خيارات الدفع المتاحة؟" : "What payment options are available?",
      a: isAr 
        ? "بنوفر لك مرونة تامة؛ تقدر تدفع إلكترونيًا بالبطاقة البنكية، أو عبر التحويل البنكي المباشر، أو نقدًا في مقر الشركة." 
        : "We offer you complete flexibility; you can pay electronically by credit card, via direct bank transfer, or in cash at the company headquarters."
    },
    {
      id: "item-3",
      q: isAr ? "لو حصل ظرف طارئ أقدر أعدل أو ألغي الحجز؟" : "If an emergency occurs, can I modify or cancel the reservation?",
      a: isAr 
        ? "أكيد، إحنا مقدرين جدًا الظروف الطارئة، تقدر تعدل حجزك وفقًا لسياسة الإلغاء والتعديل الخاصة بالشركة، وفريقنا هيساعدك تلاقي أفضل بديل متاح." 
        : "Absolutely, we are very understanding of emergency situations. You can modify your reservation according to the company's cancellation and modification policy, and our team will help you find the best available alternative."
    },
    {
      id: "item-4",
      q: isAr ? "هل الدعم متوفر لو احتجت حاجة أثناء الرحلة؟" : "Is support available if I need something during the trip?",
      a: isAr 
        ? "أكيد.. إحنا معاك خطوة بخطوة، فريق الدعم الفني متاح على مدار الساعة للرد على أي استفسار أو حل أي مشكلة تواجهك أثناء رحلتك لضمان راحتك التامة." 
        : "Definitely.. we are with you step by step. The technical support team is available around the clock to answer any inquiry or solve any problem you face during your trip to ensure your complete comfort."
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
