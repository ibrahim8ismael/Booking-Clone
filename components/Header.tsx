"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "./LanguageProvider";
import { useAuth } from "./AuthProvider";
import { BedDouble, Plane, TreePalm, Car, Menu, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";

export function Header() {
  const { language, setLanguage } = useLanguage();
  const { isLoggedIn, logout } = useAuth();
  const pathname = usePathname();

  const toggleLanguage = () => {
    setLanguage(language === "ar" ? "en" : "ar");
  };

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const navItems = [
    {
      name: language === "ar" ? "الرئيسية" : "Home",
      path: "/",
    },
    {
      name: language === "ar" ? "رحلاتنا" : "Tours",
      path: "/tours",
    },
    {
      name: language === "ar" ? "عن الشركة" : "About Us",
      path: "/about",
    },
    {
      name: language === "ar" ? "تواصل معنا" : "Contact Us",
      path: "/contact",
    },
  ];

  return (
    <header className="bg-[#FED852] text-[#0758AA]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="text-xl font-bold md:text-2xl flex items-center gap-2">
            ساعة وساعة
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 font-bold">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                href={item.path}
                className={cn("hover:text-black/70 transition-colors", pathname === item.path && "underline decoration-2 underline-offset-4 border-b-0")}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={toggleLanguage}
              className="p-2 hover:bg-black/5 rounded-sm font-bold"
              title="Change Language"
            >
              {language === "ar" ? "English" : "عربي"}
            </button>

            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/profile"
                  className="bg-[#0758AA] text-white hover:bg-[#064a91] font-bold px-4 py-2 rounded-sm text-sm transition-colors flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {language === "ar" ? "الملف الشخصي" : "Profile"}
                  </span>
                </Link>
                <button
                  onClick={logout}
                  className="bg-transparent text-[#0758AA] hover:bg-black/5 font-bold px-3 sm:px-4 py-2 rounded-sm text-sm transition-colors"
                >
                  <span className="hidden sm:inline">
                    {language === "ar" ? "تسجيل الخروج" : "Logout"}
                  </span>
                  <span className="sm:hidden">
                    {language === "ar" ? "خروج" : "Exit"}
                  </span>
                </button>
              </div>
            ) : (
              <Link
                href="/signin"
                className="bg-[#0758AA] text-white hover:bg-[#064a91] font-bold px-4 sm:px-6 py-2 rounded-sm text-sm transition-colors"
              >
                {language === "ar" ? "دخول" : "Sign in"}
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
