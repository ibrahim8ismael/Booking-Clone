"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { Footer } from "@/components/Footer";
import Image from "next/image";
import {
  MapPin,
  Check,
  Info,
  Users,
  Baby,
  Link as LinkIcon,
  Utensils,
  BedDouble,
  Coffee,
  Wifi,
  Mountain,
  ParkingCircle,
  Clock,
  Heart,
} from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";

export default function BookPage() {
  const params = useParams();
  const router = useRouter();
  const { language } = useLanguage();
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // Mock data, in real app would fetch based on params.id
  const isHOT001 = params.id === "HOT-001";
  const stay = {
    id: params.id,
    name: isHOT001 ? "Palm Hotel & Resort" : "Grand Plaza",
    type: language === "ar" ? "منتجع" : "Resort",
    stars: 5,
    location:
      language === "ar" ? "دبي، الإمارات العربية المتحدة" : "Dubai, UAE",
    address: "123 Palm Jumeirah Street, Dubai",
    rating: 8.6,
    ratingText: language === "ar" ? "رائع" : "Fabulous",
    reviews: 2728,
    image: "https://picsum.photos/seed/stay12/1200/600",
    description:
      language === "ar"
        ? "منتجع فاخر يوفر إطلالات مذهلة مع حمامات سباحة متعددة وشاطئ خاص. يقع هذا المنتجع في قلب منطقة جميرا ويوفر تجربة لا تُنسى للعائلات والأزواج مع مطاعم عالمية وخدمات استثنائية."
        : "A luxurious resort with amazing views, multiple pools, and private beach access. Located in the heart of Jumeirah, it offers an unforgettable experience for families and couples with world-class restaurants and exceptional services.",
    facilities: [
      {
        icon: "wifi",
        label: language === "ar" ? "واي فاي مجاني" : "Free WiFi",
      },
      { icon: "kids", label: language === "ar" ? "منطقة أطفال" : "Kids Area" },
      {
        icon: "pool",
        label: language === "ar" ? "مسبح خارجي" : "Outdoor Pool",
      },
      {
        icon: "beach",
        label: language === "ar" ? "شاطئ خاص" : "Private Beach",
      },
      {
        icon: "restaurant",
        label: language === "ar" ? "مطاعم فاخرة" : "Fine Dining",
      },
      {
        icon: "gym",
        label: language === "ar" ? "صالة رياضية" : "Fitness Center",
      },
    ],
    mealPlans: ["BB (Bed & Breakfast)", "HB (Half Board)"],
    rooms: [
      {
        id: "1",
        type: language === "ar" ? "غرفة قياسية" : "Standard Room",
        price: 150,
        adultCap: 2,
        childCap: 1,
        view: language === "ar" ? "إطلالة مدينة" : "City View",
        connectedReady: false,
        count: 5,
      },
      {
        id: "2",
        type: language === "ar" ? "جناح ديلوكس" : "Deluxe Suite",
        price: 300,
        adultCap: 4,
        childCap: 2,
        view: language === "ar" ? "إطلالة بحر" : "Sea View",
        connectedReady: true,
        count: 2,
      },
    ],
    childRules: [
      { ageFrom: 0, ageTo: 5.99, discount: 100 },
      { ageFrom: 6, ageTo: 11.99, discount: 50 },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow max-w-5xl w-full mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-[#0758AA] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {stay.type}
            </span>
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">
            {stay.name}
          </h1>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-5 h-5 text-[#0758AA]" />
            <span className="font-medium">{stay.location}</span>
          </div>
        </div>

        {/* Hero Image Gallery */}
        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[250px] md:h-[400px] mb-6 md:mb-8"
          onClick={() => setIsGalleryOpen(true)}
        >
          <div className="col-span-1 md:col-span-2 md:row-span-2 relative rounded-lg md:rounded-none rtl:md:rounded-r-lg ltr:md:rounded-l-lg overflow-hidden cursor-pointer group">
            <Image
              src={stay.image}
              fill
              alt={stay.name}
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="md:hidden absolute bottom-3 rtl:left-3 ltr:right-3 bg-black/70 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">
              +12 {language === "ar" ? "صور" : "Photos"}
            </div>
          </div>
          <div className="hidden md:block relative overflow-hidden cursor-pointer group">
            <Image
              src="https://picsum.photos/seed/stay12_room/600/400"
              fill
              alt="Room 1"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="hidden md:block relative overflow-hidden rtl:rounded-tl-lg ltr:rounded-tr-lg cursor-pointer group">
            <Image
              src="https://picsum.photos/seed/stay12_view/600/400"
              fill
              alt="View"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="hidden md:block relative overflow-hidden cursor-pointer group">
            <Image
              src="https://picsum.photos/seed/stay12_pool/600/400"
              fill
              alt="Pool"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="hidden md:flex relative overflow-hidden rtl:rounded-bl-lg ltr:rounded-br-lg cursor-pointer group items-center justify-center">
            <Image
              src="https://picsum.photos/seed/stay12_bath/600/400"
              fill
              alt="Bathroom"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
              <span className="text-white font-bold text-lg">
                +12 {language === "ar" ? "صور" : "Photos"}
              </span>
            </div>
          </div>
        </div>

        {/* Gallery Dialog */}
        <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
          <DialogContent className="max-w-5xl h-[80vh] flex flex-col p-0 gap-0 overflow-hidden bg-black border-none">
            <DialogHeader className="sr-only">
              <DialogTitle>Photo Gallery</DialogTitle>
              <DialogDescription>
                Browse all photos of the property
              </DialogDescription>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="col-span-full h-[400px] relative rounded-lg overflow-hidden">
                  <Image
                    src={stay.image}
                    fill
                    alt="Main"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-[4/3] relative rounded-lg overflow-hidden"
                  >
                    <Image
                      src={`https://picsum.photos/seed/stay12_gall_${i}/800/600`}
                      fill
                      alt={`Gallery ${i}`}
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Main Content */}
          <div className="flex-[2] flex flex-col gap-8 w-full">
            {/* Property Highlights */}
            <section>
              <h2 className="text-xl font-bold mb-4">
                {language === "ar"
                  ? "ميزات مكان الإقامة"
                  : "Property Highlights"}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center justify-center text-center gap-3 p-4 border border-gray-200 rounded-xl bg-white shadow-sm flex-col">
                  <div className="text-[#0758AA] bg-[#EBF3FF] p-3 rounded-full">
                    <Coffee className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block font-bold text-sm text-gray-900">
                      {language === "ar" ? "إفطار" : "Breakfast"}
                    </span>
                    <span className="block text-xs text-gray-500 mt-1">
                      {language === "ar" ? "إفطار جيد" : "Good Breakfast"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-center text-center gap-3 p-4 border border-gray-200 rounded-xl bg-white shadow-sm flex-col">
                  <div className="text-[#0758AA] bg-[#EBF3FF] p-3 rounded-full">
                    <Wifi className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block font-bold text-sm text-gray-900">
                      {language === "ar" ? "واي فاي مجاني" : "Free WiFi"}
                    </span>
                    <span className="block text-xs text-gray-500 mt-1">
                      {language === "ar" ? "واي فاي مجاني" : "Free WiFi"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-center text-center gap-3 p-4 border border-gray-200 rounded-xl bg-white shadow-sm flex-col">
                  <div className="text-[#0758AA] bg-[#EBF3FF] p-3 rounded-full">
                    <Mountain className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block font-bold text-sm text-gray-900">
                      {language === "ar" ? "الإطلالات" : "Views"}
                    </span>
                    <span className="block text-xs text-gray-500 mt-1">
                      {language === "ar" ? "إطلالة على معلم" : "Landmark view"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-center text-center gap-3 p-4 border border-gray-200 rounded-xl bg-white shadow-sm flex-col">
                  <div className="text-[#0758AA] bg-[#EBF3FF] p-3 rounded-full">
                    <ParkingCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block font-bold text-sm text-gray-900">
                      {language === "ar" ? "مواقف السيارات" : "Parking"}
                    </span>
                    <span className="block text-xs text-gray-500 mt-1">
                      {language === "ar" ? "مواقف مجانية" : "Free parking"}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <p className="text-gray-900 leading-relaxed font-medium">
                {stay.description}
              </p>
            </section>

            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold mb-6">
                {language === "ar"
                  ? "أكثر المرافق رواجاً"
                  : "Most Popular Facilities"}
              </h2>
              <ul className="flex flex-wrap gap-x-8 gap-y-4">
                {stay.facilities.map((facility, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-sm font-bold text-gray-900"
                  >
                    <Check className="w-5 h-5 text-green-600 shrink-0" />
                    {facility.label}
                  </li>
                ))}
              </ul>
            </section>

            {/* Pricing Details */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-[#EBF3FF] p-3 rounded-xl border border-[#0758AA]/10 text-[#0758AA]">
                  <Info className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                  {language === "ar"
                    ? "معلومات الأسعار والسياسات"
                    : "Pricing & Policies Information"}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Adult pricing details */}
                <div className="relative overflow-hidden bg-gradient-to-br from-[#f8f9fa] to-white p-6 rounded-2xl border border-gray-200 hover:border-[#0758AA]/30 hover:shadow-md transition-all group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#0758AA]/5 rounded-bl-full -z-10 group-hover:bg-[#0758AA]/10 transition-colors" />
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-white p-2.5 rounded-lg shadow-sm border border-gray-100 text-[#0758AA]">
                      <Users className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900">
                      {language === "ar" ? "سياسة البالغين" : "Adults Policy"}
                    </h3>
                  </div>
                  <ul className="space-y-4 text-sm font-medium text-gray-600">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 shrink-0" />
                      <span className="leading-relaxed">
                        {language === "ar"
                          ? "السعر الأساسي للغرفة يشمل شخصين بالغين."
                          : "Base room price includes 2 adults."}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 shrink-0" />
                      <span className="leading-relaxed">
                        {language === "ar"
                          ? "تطبق رسوم إضافية بقيمة 40$ لليلة لكل شخص بالغ إضافي."
                          : "Additional charge of $40 per night applies for each extra adult."}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 shrink-0" />
                      <span className="leading-relaxed">
                        {language === "ar"
                          ? "الحد الأقصى للبالغين يعتمد على نوع الغرفة المختارة."
                          : "Maximum adults depend on the selected room type."}
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Kids pricing details */}
                <div className="relative overflow-hidden bg-gradient-to-br from-[#fff5f7] to-white p-6 rounded-2xl border border-pink-100 hover:border-pink-300 hover:shadow-md transition-all group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/5 rounded-bl-full -z-10 group-hover:bg-pink-500/10 transition-colors" />
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-white p-2.5 rounded-lg shadow-sm border border-pink-50 text-pink-500">
                      <Baby className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900">
                      {language === "ar" ? "سياسة الأطفال" : "Children Policy"}
                    </h3>
                  </div>

                  <div className="space-y-4 text-sm font-medium">
                    <div className="space-y-2">
                      {stay.childRules.map((rule, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center bg-white p-3 border border-pink-50 rounded-xl shadow-sm"
                        >
                          <span className="text-gray-700">
                            {language === "ar"
                              ? `الأعمار من ${rule.ageFrom} إلى ${rule.ageTo} سنة`
                              : `Ages ${rule.ageFrom} to ${rule.ageTo} years`}
                          </span>
                          <span className="text-pink-600 font-bold bg-pink-50 px-3 py-1 rounded-lg text-sm">
                            {rule.discount === 100
                              ? language === "ar"
                                ? "إقامة مجانية"
                                : "Free Stay"
                              : `خصم ${rule.discount}%`}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-start gap-3 mt-4 pt-4 border-t border-pink-100">
                      <Info className="w-5 h-5 text-pink-500 shrink-0 mt-0.5" />
                      <span className="text-gray-600 leading-relaxed font-medium">
                        {language === "ar"
                          ? "تطبق رسوم بقيمة 25$ لليلة للأطفال خارج الفئات العمرية المشمولة بالخصم المجاني."
                          : "A fee of $25 per night applies for children outside discounted age groups."}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar / Booking Details */}
          <div className="flex-[1] lg:order-last w-full">
            {/* The user screenshot shows "موقع ممتاز" map at top of sidebar, let's add that here maybe, or keep our booking widget. We will keep our widget but maybe restyle it slightly. */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
              <div className="bg-[#EBF3FF] p-4 flex items-center justify-between border-b border-[#0758AA]/10">
                <div>
                  <h3 className="font-bold text-gray-900">
                    {language === "ar"
                      ? "موقع ممتاز: نقاط تقييم مرتفعة"
                      : "Excellent Location"}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {language === "ar"
                      ? "من ضيوف حديثين (9.4)"
                      : "From recent guests (9.4)"}
                  </p>
                </div>
                <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full text-[#0758AA] shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
              </div>
              <div className="p-4 bg-gray-50 flex items-start gap-3 border-b border-gray-100">
                <Coffee className="w-5 h-5 text-gray-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-gray-900">
                    {language === "ar"
                      ? "معلومات حول الإفطار"
                      : "Breakfast Information"}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    {language === "ar"
                      ? "كونتيننتال، و نباتي، و نباتي صرف، و حلال"
                      : "Continental, Vegetarian, Vegan, Halal"}
                  </p>
                </div>
              </div>
              <div className="p-4 bg-gray-50 flex items-start gap-3">
                <ParkingCircle className="w-5 h-5 text-gray-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    {language === "ar"
                      ? "يتوفر موقف سيارات خاص مجاني في الموقع"
                      : "Free private parking available on site"}
                  </h4>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 sticky top-8">
              <h3 className="font-bold text-2xl text-gray-900 mb-2">
                {language === "ar" ? "تفاصيل الحجز" : "Booking Details"}
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                {language === "ar"
                  ? "أدخل تفاصيل إقامتك في الصفحة التالية"
                  : "Enter your stay details on the next page"}
              </p>

              <div className="flex justify-between items-end mb-6 pb-6 border-b border-gray-100">
                <span className="text-gray-700 font-bold">
                  {language === "ar" ? "تبدأ من" : "Starting from"}
                </span>
                <div>
                  <span className="text-4xl font-black text-[#0758AA] text-right block">
                    ${stay.rooms[0].price}
                  </span>
                  <span className="text-xs text-gray-500 block text-right mt-1">
                    {language === "ar" ? "للشخص / ليلة" : "per person / night"}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => router.push(`/checkout/${params.id}`)}
                  className="w-full bg-[#0758AA] hover:bg-[#064a91] text-white font-bold text-lg py-4 rounded-xl transition-all shadow-sm block text-center shadow-[#0758AA]/20 hover:shadow-md hover:-translate-y-0.5"
                >
                  {language === "ar" ? "احجز الآن" : "Reserve Now"}
                </button>
                <Link
                  href="/policies"
                  className="block text-center text-sm text-[#0758AA] hover:underline font-medium"
                >
                  {language === "ar"
                    ? "مراجعة سياسات الفندق والإلغاء"
                    : "Review hotel & cancellation policies"}
                </Link>
                <p className="text-center text-xs text-gray-400 mt-2 leading-relaxed">
                  {language === "ar"
                    ? "لن يتم خصم أي مبلغ الآن. يمكنك اختيار الغرف وعدد الأشخاص في الخطوة التالية."
                    : "You won't be charged yet. You can select rooms and guests in the next step."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
