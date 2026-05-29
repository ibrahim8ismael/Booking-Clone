"use client";

import React from "react";
import { useLanguage } from "@/components/LanguageProvider";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import { motion } from "motion/react";

export default function ContactPage() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  return (
    <main className="min-h-screen relative flex flex-col py-12 md:py-20 overflow-x-hidden">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=2000&auto=format&fit=crop")',
        }}
      />
      <div className="absolute inset-0 z-0 bg-black/60" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 w-full flex-grow">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight drop-shadow-md"
          >
            {isAr ? "ابدأ رحلتك الآن.." : "Start your journey now.."}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-[#FED852] font-bold drop-shadow-md"
          >
            {isAr
              ? "تواصل مع مستشارك السياحي"
              : "Contact your travel consultant"}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-8 flex flex-col items-center text-center border border-gray-100 md:col-span-1"
          >
            <div className="bg-[#EBF3FF] p-4 rounded-full text-[#0758AA] mb-6">
              <Phone className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {isAr ? "الخط الساخن/ الواتساب" : "Hotline / WhatsApp"}
            </h3>
            <a
              href="https://wa.me/201208222245"
              dir="ltr"
              className="text-2xl text-[#0758AA] font-bold hover:underline"
            >
              201208222245
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-8 flex flex-col items-center text-center border border-gray-100 md:col-span-1"
          >
            <div className="bg-[#EBF3FF] p-4 rounded-full text-[#0758AA] mb-6">
              <Mail className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {isAr ? "للدعم والاستفسارات" : "Support & Inquiries"}
            </h3>
            <a
              href="mailto:info@sa2awisa2a.com"
              className="text-lg text-gray-600 hover:text-[#0758AA] hover:underline"
              dir="ltr"
            >
              info@sa2awisa2a.com
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-8 flex flex-col items-center text-center border border-gray-100 md:col-span-1"
          >
            <div className="bg-[#EBF3FF] p-4 rounded-full text-[#0758AA] mb-6">
              <MapPin className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {isAr ? "المقر الرئيسي" : "Headquarters"}
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              {isAr
                ? "2 ش عمر حفني، أمام مسجد بلال، خلف مصر للطيران، عباس العقاد، مدينة نصر , Cairo, Egypt"
                : "2 Omar Hefny St., in front of Bilal Mosque, behind EgyptAir, Abbas El Akkad, Nasr City, Cairo, Egypt"}
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-[#0758AA] rounded-2xl p-8 md:p-12 text-center text-white"
        >
          <h3 className="text-2xl font-bold mb-8">
            {isAr ? "تابعونا على منصاتنا" : "Follow us on our platforms"}
          </h3>
          <div className="flex justify-center items-center gap-6">
            <a
              href="#"
              className="bg-white/10 p-4 rounded-full text-white hover:bg-white hover:text-[#0758AA] transition-all hover:-translate-y-1"
              aria-label="Facebook"
            >
              <Facebook className="w-6 h-6 md:w-8 md:h-8" />
            </a>
            <a
              href="#"
              className="bg-white/10 p-4 rounded-full text-white hover:bg-white hover:text-[#0758AA] transition-all hover:-translate-y-1"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6 md:w-8 md:h-8" />
            </a>
            <a
              href="#"
              className="bg-white/10 p-4 rounded-full text-white hover:bg-white hover:text-[#0758AA] transition-all hover:-translate-y-1"
              aria-label="Twitter"
            >
              <Twitter className="w-6 h-6 md:w-8 md:h-8" />
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
