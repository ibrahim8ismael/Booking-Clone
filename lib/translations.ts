export type Language = 'en' | 'ar';

export interface Translations {
  hero: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    checkIn: string;
    checkOut: string;
    guests: string;
    search: string;
  };
  uniqueStays: {
    title: string;
    subtitle: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    hero: {
      title: 'Find your next stay',
      subtitle: 'Search deals on hotels, homes, and much more...',
      searchPlaceholder: 'Where are you going?',
      checkIn: 'Check-in',
      checkOut: 'Check-out',
      guests: 'Guests',
      search: 'Search',
    },
    uniqueStays: {
      title: 'Unique stays',
      subtitle: 'Homes people love',
    },
  },
  ar: {
    hero: {
      title: 'ابحث عن إقامتك القادمة',
      subtitle: 'ابحث عن عروض على الفنادق والبيوت والمزيد...',
      searchPlaceholder: 'إلى أين أنت ذاهب؟',
      checkIn: 'تسجيل الوصول',
      checkOut: 'المغادرة',
      guests: 'الضيوف',
      search: 'بحث',
    },
    uniqueStays: {
      title: 'أماكن إقامة فريدة',
      subtitle: 'أماكن إقامة محببة',
    },
  },
};
