'use client';

import React from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { Footer } from '@/components/Footer';
import { Printer } from 'lucide-react';
import Link from 'next/link';

export default function PoliciesPage() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const sidebarLinks = [
    { id: 'about', label: isAr ? 'عن Bookings.com' : 'About Bookings.com', active: false },
    { id: 'legal', label: isAr ? 'الأمور القانونية' : 'Legal', active: false },
    { id: 'dsa', label: 'Digital Services Act', active: false },
    { id: 'dma', label: isAr ? 'قانون الأسواق الرقمية' : 'Digital Markets Act', active: false },
    { id: 'accessibility', label: isAr ? 'بيان تسهيلات الاستخدام' : 'Accessibility Statement', active: false },
    { id: 'terms', label: isAr ? 'شروط الخدمة' : 'Terms of Service', active: true },
    { id: 'how-we-work', label: isAr ? 'طريقة عملنا' : 'How we work', active: false },
    { id: 'offices', label: isAr ? 'المكاتب حول العالم' : 'Offices worldwide', active: false },
    { id: 'contact', label: isAr ? 'تواصل معنا' : 'Contact Us', active: false },
    { id: 'media', label: isAr ? 'المركز الإعلامي' : 'Media Center', active: false },
    { id: 'careers', label: isAr ? 'فرص العمل' : 'Careers', active: false },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="flex-grow max-w-[1200px] w-full mx-auto px-4 py-12 flex flex-col md:flex-row gap-12 text-gray-900">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0 mt-16 md:mt-0">
          <nav className="flex flex-col gap-1">
            {sidebarLinks.map((link) => (
              <a 
                key={link.id} 
                href="#"
                className={`px-4 py-3 text-sm md:text-base transition-colors ${
                  link.active 
                    ? 'bg-[#EBF3FF] text-[#0071C2] border-r-4 border-[#0071C2]' 
                    : 'text-gray-700 hover:bg-gray-50'
                } ${!isAr && link.active ? 'border-r-0 border-l-4' : ''}`}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-grow max-w-3xl">
          <div className="flex justify-start mb-8">
            <button className="flex items-center gap-2 text-[#0071C2] hover:underline text-sm font-semibold">
              <span>{isAr ? 'طباعة' : 'Print'}</span>
              <Printer className="w-5 h-5" />
            </button>
          </div>

          <article>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-900 tracking-tight leading-tight">
              {isAr ? 'شروط الخدمة الخاصة بالعملاء' : 'Customer Terms of Service'}
            </h1>
            <p className="text-gray-500 text-sm md:text-base mb-10">
              {isAr ? 'تم التحديث في 15 سبتمبر 2025' : 'Updated on September 15, 2025'}
            </p>

            <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-gray-900 tracking-tight mt-12">
              {isAr ? 'ملخص هذه "الشروط"' : 'Summary of these "Terms"'}
            </h2>

            <div className="space-y-6 text-sm md:text-base text-gray-800 leading-relaxed font-medium">
              <p>
                {isAr 
                  ? 'إلى جانب "الشروط" الواردة في هذه الصفحة، هناك وثيقتان أخريان تمثلان جزءاً من عقدنا معك:' 
                  : 'Along with the "Terms" on this page, two other documents form part of our contract with you:'}
              </p>

              <ul className="list-disc pr-6 pl-6 space-y-4">
                <li>
                  {isAr ? (
                    <>
                      تساعدك <a href="#" className="text-[#0071C2] hover:underline">صفحة "طريقة عملنا"</a> على استخدام "المنصة" الخاصة بنا وفهم التقييمات والترتيبات والتوصيات الخاصة بنا وكيفية كسبنا للمال وغير ذلك.
                    </>
                  ) : (
                    <>
                      Our <a href="#" className="text-[#0071C2] hover:underline">"How we work" page</a> helps you use our "Platform", understand our reviews, rankings, and recommendations, how we make money, and more.
                    </>
                  )}
                </li>
                <li>
                  {isAr ? (
                    <>
                      تساعدنا <a href="#" className="text-[#0071C2] hover:underline">"المعايير والإرشادات الخاصة بالمحتوى"</a> لدينا على إبقاء كل ما يرد على "المنصة" الخاصة بنا مناسباً وملائماً لجمهورنا العالمي، دون الحد من حرية التعبير. وتوضح لك كيفية إدارتنا للمحتوى وإجراءات الأمان على الإنترنت وكيف نتخذ إجراءات ضد أي محتوى غير لائق.
                    </>
                  ) : (
                    <>
                      Our <a href="#" className="text-[#0071C2] hover:underline">"Content Standards and Guidelines"</a> help us keep everything on our "Platform" suitable for our global audience without restricting freedom of expression. They explain how we manage content and act against anything inappropriate.
                    </>
                  )}
                </li>
              </ul>

              <p>
                {isAr 
                  ? 'بالموافقة على "الشروط" الخاصة بنا، فإنك توافق على كل ما يرد في الوثائق الثلاث. في حالة عدم قبولك لأي من هذه "الشروط"، يرجى عدم استخدام "المنصة" الخاصة بنا.' 
                  : 'By accepting our "Terms", you agree to everything in all three documents. If you do not accept any of these "Terms," please do not use our "Platform".'}
              </p>

              <p>
                {isAr 
                  ? 'إن جميع هذه المعلومات مهمة لأنها (إلى جانب رسالة تأكيد الحجز الخاصة بك عبر البريد الإلكتروني، وأي معلومات تعاقدية مسبقة مقدمة قبل الحجز) تحدد الشروط القانونية التي يعرض "مزودو الخدمة" بموجبها "تجارب السفر" الخاصة بهم من خلال "المنصة" الخاصة بنا.' 
                  : 'All this information is important because (along with your booking confirmation email and any pre-contractual information provided before booking) it sets out the legal terms on which "Service Providers" offer their "Travel Experiences" through our "Platform".'}
              </p>

              <p>
                {isAr ? (
                  <>
                    وإذا حدث خطأ ما في "تجربة السفر" الخاصة بك، فإن <a href="#" className="text-[#0071C2] hover:underline">القسم A16 من هذه "الشروط"</a> يشرح ما يمكنك فعله حيال ذلك الخطأ. يتضمن ذلك تقديم شكوى إلينا، واللجوء إلى المحكمة، واستخدام خدمة تسوية النزاعات على الإنترنت (في بعض الحالات).
                  </>
                ) : (
                  <>
                    If something goes wrong with your "Travel Experience," <a href="#" className="text-[#0071C2] hover:underline">Section A16 of these "Terms"</a> explains what you can do about it. This includes submitting a complaint to us, going to court, and using online dispute resolution services (in some cases).
                  </>
                )}
              </p>

              <p>
                {isAr ? (
                  <>
                    إذا كنت تريد الاعتراض على قرار متعلق بالإشراف على المحتوى أو الإبلاغ عن أي محتوى على "المنصة" الخاصة بنا، فإن <a href="#" className="text-[#0071C2] hover:underline">"المعايير والإرشادات الخاصة بالمحتوى"</a> لدينا تشرح كيفية القيام بذلك وكيفية إدارتنا لهذه الطلبات.
                  </>
                ) : (
                  <>
                    If you want to appeal an content moderation decision or report any content on our "Platform," our <a href="#" className="text-[#0071C2] hover:underline">"Content Standards and Guidelines"</a> explain how to do so and how we manage these requests.
                  </>
                )}
              </p>

              <p>
                {isAr ? (
                  <>
                    لا يشكل هذا الملخص جزءاً من "الشروط" الخاصة بنا أو وثيقة قانونية. إنه مجرد شرح بسيط لـ "الشروط" الخاصة بنا. نحن نشجعك على قراءة كل وثيقة بالكامل. تحمل بعض الكلمات الواردة في هذا الملخص دلالات محددة، لذلك يرجى الرجوع إلى <a href="#" className="text-[#0071C2] hover:underline">"قاموس Bookings"</a> في نهاية هذه "الشروط".
                  </>
                ) : (
                  <>
                    This summary does not form part of our "Terms" or a legal document. It is merely a simple explanation of our "Terms." We encourage you to read each document in full. Some words in this summary have specific meanings, so please refer to the <a href="#" className="text-[#0071C2] hover:underline">"Bookings Dictionary"</a> at the end of these "Terms".
                  </>
                )}
              </p>
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-gray-900 tracking-tight mt-16">
              {isAr ? 'جدول المحتويات' : 'Table of Contents'}
            </h2>
            {/* Table of contents and rest of page would go here */}

          </article>
        </main>
      </div>
      <Footer />
    </div>
  );
}

