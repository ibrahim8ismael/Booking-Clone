'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from './LanguageProvider';
import { Command, CommandItem, CommandList, CommandEmpty, CommandGroup } from '@/components/ui/command';
import { BedDouble, Calendar as CalendarIcon, User, Minus, Plus, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { arSA, enUS } from 'date-fns/locale';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

export function Hero() {
  const { t, language } = useLanguage();
  const router = useRouter();

  const [destination, setDestination] = useState('');
  const [openDest, setOpenDest] = useState(false);
  const destRef = useRef<HTMLDivElement>(null);
  const places = [
    { value: 'cairo', label: 'Cairo, Egypt', arLabel: 'القاهرة، مصر' },
    { value: 'alex', label: 'Alexandria, Egypt', arLabel: 'الإسكندرية، مصر' },
    { value: 'sharm', label: 'Sharm El Sheikh, Egypt', arLabel: 'شرم الشيخ، مصر' },
    { value: 'hurghada', label: 'Hurghada, Egypt', arLabel: 'الغردقة، مصر' },
    { value: 'luxor', label: 'Luxor, Egypt', arLabel: 'الأقصر، مصر' },
    { value: 'aswan', label: 'Aswan, Egypt', arLabel: 'أسوان، مصر' },
  ];

  const [date, setDate] = useState<{ from?: Date; to?: Date }>({});
  const [isOpen, setIsOpen] = useState(false);
  
  const [guests, setGuests] = useState({ adults: 2, children: 0, rooms: 1 });
  const [showGuests, setShowGuests] = useState(false);

  const guestRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (guestRef.current && !guestRef.current.contains(event.target as Node)) {
        setShowGuests(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [guestRef]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const updateGuests = (type: keyof typeof guests, change: number) => {
    setGuests(prev => {
      const newVal = prev[type] + change;
      if (type === 'adults' && newVal < 1) return prev;
      if (type === 'children' && newVal < 0) return prev;
      if (type === 'rooms' && newVal < 1) return prev;
      return { ...prev, [type]: newVal };
    });
  };

  const getGuestsText = () => {
    if (language === 'ar') {
      return `${guests.adults} بالغون · ${guests.children} أطفال · ${guests.rooms} غرفة`;
    }
    return `${guests.adults} Adults · ${guests.children} Children · ${guests.rooms} Rooms`;
  };

  const locale = language === 'ar' ? arSA : enUS;

  return (
    <div className="relative mb-12 sm:mb-16 md:mb-20">
      <div className="bg-[#FED852] text-[#0758AA] pt-10 pb-12 md:pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold mb-3"
          >
            {t.hero.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl mb-6 md:mb-10 font-bold"
          >
            {t.hero.subtitle}
          </motion.p>
        </div>
      </div>

      {/* Search Bar - Flow on mobile, Absolute on desktop overlaying the bottom edge */}
      <div className="w-full flex justify-center -mt-6 md:mt-0 md:absolute md:left-0 md:right-0 md:bottom-0 md:translate-y-1/2 px-4 z-20">
        <div className="w-full max-w-6xl">
          <form 
            onSubmit={handleSearch}
            className="w-full bg-[#f2f2f2] p-1 rounded-sm flex flex-col md:flex-row gap-1 shadow-md border border-[#FED852] md:border-none md:ring-[3px] md:ring-[#FED852]"
          >
            {/* Destination */}
            <div className="flex-[1.2] relative block z-50 overflow-visible" ref={destRef}>
              <div 
                className="bg-white flex items-center px-4 py-3 rounded-sm gap-3 cursor-text h-full hover:bg-gray-50 transition-colors border-none"
                onClick={() => setOpenDest(true)}
              >
                <BedDouble className="text-gray-400 w-6 h-6 flex-shrink-0" />
                <input 
                  type="text" 
                  placeholder={t.hero.searchPlaceholder}
                  className="w-full outline-none text-gray-900 placeholder:text-gray-500 bg-transparent text-sm font-medium h-6"
                  value={destination}
                  onChange={(e) => {
                    setDestination(e.target.value);
                    setOpenDest(true);
                  }}
                  onFocus={() => setOpenDest(true)}
                />
              </div>

              <AnimatePresence>
                {openDest && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-[calc(100%+8px)] w-full sm:min-w-[300px] bg-white rounded-lg shadow-2xl z-[100] border border-gray-200 right-auto rtl:right-0 ltr:left-0 max-h-[300px] overflow-hidden flex flex-col"
                  >
                    <Command className="bg-white w-full border-none" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                      <CommandList className="max-h-[300px] overflow-y-auto w-full">
                        {places.filter(p => !destination || p.label.toLowerCase().includes(destination.toLowerCase()) || p.arLabel.includes(destination)).length === 0 ? (
                          <CommandEmpty className="py-6 text-center text-sm text-gray-500">
                            {language === 'ar' ? 'لا يوجد نتائج.' : 'No results found.'}
                          </CommandEmpty>
                        ) : (
                          <CommandGroup heading={language === 'ar' ? 'الوجهات الشهيرة' : 'Popular Destinations'}>
                            {places.filter(p => !destination || p.label.toLowerCase().includes(destination.toLowerCase()) || p.arLabel.includes(destination)).map((place) => (
                              <CommandItem
                                key={place.value}
                                value={place.value}
                                onSelect={() => {
                                  setDestination(language === 'ar' ? place.arLabel : place.label);
                                  setOpenDest(false);
                                }}
                                className="px-4 py-3 hover:bg-[#EBF3FF] cursor-pointer flex items-center gap-3 transition-colors m-1"
                              >
                                <div className="bg-gray-100 p-2 rounded-md shrink-0">
                                  <MapPin className="text-gray-500 w-5 h-5" />
                                </div>
                                <div className="flex flex-col text-left rtl:text-right">
                                  <span className="text-sm font-bold text-gray-900">{language === 'ar' ? place.arLabel : place.label}</span>
                                  <span className="text-xs text-gray-500">{language === 'ar' ? 'مدينة في مصر' : 'City, Egypt'}</span>
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        )}
                      </CommandList>
                    </Command>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Date Range Picker (Combines Check-In and Check-Out) */}
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger className="flex-[1.5] w-full flex flex-col md:flex-row items-center gap-1 cursor-pointer outline-none bg-transparent m-0 p-0 border-none font-sans">
                  <div className="flex-1 bg-white rounded-sm w-full h-full flex items-center px-4 py-3 gap-3 hover:bg-gray-50 transition-colors">
                    <CalendarIcon className="text-gray-400 w-6 h-6 flex-shrink-0" />
                    <div className="flex flex-col w-full text-left rtl:text-right">
                       <span className="text-xs text-gray-500 font-medium">{t.hero.checkIn}</span>
                       <span className={cn("text-sm font-medium h-5 flex items-center", date.from ? "text-gray-900" : "text-gray-400")}>
                         {date.from ? format(date.from, 'E, MMM d', { locale }) : '- -- ----'}
                       </span>
                    </div>
                  </div>
                  
                  <div className="flex-1 bg-white rounded-sm w-full h-full flex items-center px-4 py-3 gap-3 hover:bg-gray-50 transition-colors">
                    <CalendarIcon className="text-gray-400 w-6 h-6 flex-shrink-0" />
                    <div className="flex flex-col w-full text-left rtl:text-right">
                       <span className="text-xs text-gray-500 font-medium">{t.hero.checkOut}</span>
                       <span className={cn("text-sm font-medium h-5 flex items-center", date.to ? "text-gray-900" : "text-gray-400")}>
                         {date.to ? format(date.to, 'E, MMM d', { locale }) : '- -- ----'}
                       </span>
                    </div>
                  </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 z-[100] bg-white border-gray-200 shadow-xl" align="start">
                <Calendar
                  mode="range"
                  selected={{ from: date.from, to: date.to }}
                  onSelect={(range) => {
                    setDate({ from: range?.from, to: range?.to });
                    if (range?.from && range?.to) {
                      setIsOpen(false);
                    }
                  }}
                  numberOfMonths={2}
                  locale={locale}
                  dir={language === 'ar' ? 'rtl' : 'ltr'}
                />
              </PopoverContent>
            </Popover>

            {/* Guests */}
            <div className="flex-[1] relative" ref={guestRef}>
              <div 
                className="bg-white flex items-center px-4 py-3 rounded-sm gap-3 cursor-pointer h-full hover:bg-gray-50 transition-colors"
                onClick={() => setShowGuests(!showGuests)}
              >
                <User className="text-gray-400 w-6 h-6 flex-shrink-0" />
                <span className="text-gray-900 text-sm truncate font-medium select-none">{getGuestsText()}</span>
              </div>
              
              <AnimatePresence>
                {showGuests && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full mt-2 w-full min-w-[280px] bg-white rounded-sm shadow-xl p-4 z-50 border border-gray-200 right-auto rtl:right-0 ltr:left-0"
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">{language === 'ar' ? 'البالغون' : 'Adults'}</span>
                        <div className="flex items-center gap-3 border border-gray-300 rounded-sm p-1">
                          <button type="button" onClick={() => updateGuests('adults', -1)} className="p-1 hover:bg-gray-100 disabled:opacity-50"><Minus className="w-4 h-4 text-[#0758AA]" /></button>
                          <span className="w-4 text-center">{guests.adults}</span>
                          <button type="button" onClick={() => updateGuests('adults', 1)} className="p-1 hover:bg-gray-100"><Plus className="w-4 h-4 text-[#0758AA]" /></button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">{language === 'ar' ? 'الأطفال' : 'Children'}</span>
                        <div className="flex items-center gap-3 border border-gray-300 rounded-sm p-1">
                          <button type="button" onClick={() => updateGuests('children', -1)} className="p-1 hover:bg-gray-100 disabled:opacity-50"><Minus className="w-4 h-4 text-[#0758AA]" /></button>
                          <span className="w-4 text-center">{guests.children}</span>
                          <button type="button" onClick={() => updateGuests('children', 1)} className="p-1 hover:bg-gray-100"><Plus className="w-4 h-4 text-[#0758AA]" /></button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">{language === 'ar' ? 'الغرف' : 'Rooms'}</span>
                        <div className="flex items-center gap-3 border border-gray-300 rounded-sm p-1">
                          <button type="button" onClick={() => updateGuests('rooms', -1)} className="p-1 hover:bg-gray-100 disabled:opacity-50"><Minus className="w-4 h-4 text-[#0758AA]" /></button>
                          <span className="w-4 text-center">{guests.rooms}</span>
                          <button type="button" onClick={() => updateGuests('rooms', 1)} className="p-1 hover:bg-gray-100"><Plus className="w-4 h-4 text-[#0758AA]" /></button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Search Button */}
            <button 
              type="submit"
              className="bg-[#0758AA] hover:bg-[#064a91] text-white font-bold text-xl px-8 py-3 rounded-sm transition-colors md:w-auto w-full flex-[0.5]"
            >
              {t.hero.search}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
