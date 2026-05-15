'use client';

// Same as new page for the simulation but mapped to specific hotel
import React, { useState, use } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { ArrowLeft, ArrowRight, Save, Image as ImageIcon, MapPin, Building, BedDouble, Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';

export default function AdminEditHotelPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const router = useRouter();

  const [images, setImages] = useState<string[]>([]);
  const [rooms, setRooms] = useState([
    { id: '1', type: 'Standard Room', price: 150, capacity: 2, count: 45 },
    { id: '2', type: 'Deluxe Suite', price: 300, capacity: 4, count: 12 }
  ]);

  const hotel = {
    id,
    name: id === 'HOT-001' ? 'Palm Hotel & Resort' : 'Grand Plaza',
    description: 'A luxurious resort with amazing views, multiple pools, and private beach access.',
    city: id === 'HOT-001' ? 'Dubai' : 'Riyadh',
    country: id === 'HOT-001' ? 'UAE' : 'KSA',
    status: 'Active',
  };

  const t = {
    back: isAr ? 'العودة إلى الفندق' : 'Back to Hotel',
    editHotel: isAr ? 'تعديل الفندق' : 'Edit Hotel',
    basicInfo: isAr ? 'المعلومات الأساسية' : 'Basic Information',
    hotelName: isAr ? 'اسم الفندق' : 'Hotel Name',
    description: isAr ? 'الوصف' : 'Description',
    location: isAr ? 'الموقع والعنوان' : 'Location & Address',
    city: isAr ? 'المدينة' : 'City',
    country: isAr ? 'البلد' : 'Country',
    address: isAr ? 'العنوان التفصيلي' : 'Full Address',
    images: isAr ? 'صور الفندق' : 'Hotel Images',
    uploadImages: isAr ? 'رفع صور' : 'Upload Images',
    roomTypes: isAr ? 'أنواع الغرف والتسعير' : 'Room Types & Pricing',
    addRoomType: isAr ? 'إضافة نوع غرفة' : 'Add Room Type',
    roomName: isAr ? 'اسم الغرفة' : 'Room Name',
    pricePerNight: isAr ? 'السعر لليلة (${})' : 'Price per Night ($)',
    capacity: isAr ? 'السعة (أشخاص)' : 'Capacity (Persons)',
    numberOfRooms: isAr ? 'عدد الغرف' : 'Number of Rooms',
    saveChanges: isAr ? 'حفظ التغييرات' : 'Save Changes',
    cancel: isAr ? 'إلغاء' : 'Cancel',
    status: isAr ? 'الحالة' : 'Status',
    active: isAr ? 'نشط' : 'Active',
    inactive: isAr ? 'غير نشط' : 'Inactive',
    facilities: isAr ? 'المرافق' : 'Facilities',
    wifi: isAr ? 'واي فاي مجاني' : 'Free WiFi',
    pool: isAr ? 'مسبح' : 'Swimming Pool',
    parking: isAr ? 'موقف سيارات' : 'Parking',
    gym: isAr ? 'صالة رياضية' : 'Gym',
    restaurant: isAr ? 'مطعم' : 'Restaurant',
  };

  const facilitiesList = [
    { id: 'wifi', label: t.wifi, checked: true },
    { id: 'pool', label: t.pool, checked: true },
    { id: 'parking', label: t.parking, checked: false },
    { id: 'gym', label: t.gym, checked: true },
    { id: 'restaurant', label: t.restaurant, checked: true },
  ];

  const handleAddRoom = () => {
    setRooms([...rooms, { id: Date.now().toString(), type: '', price: 0, capacity: 1, count: 1 }]);
  };

  const handleRemoveRoom = (roomId: string) => {
    setRooms(rooms.filter(room => room.id !== roomId));
  };

  return (
    <div className="pb-10 max-w-5xl mx-auto" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push(`/admin/hotels/${id}`)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-[#0071c2] hover:border-[#0071c2] transition-colors shadow-sm"
            aria-label={t.back}
          >
            {isAr ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t.editHotel} <span className="text-gray-400 font-normal ml-2">#{id}</span></h1>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="font-bold border-gray-300 text-gray-700 bg-white"
            onClick={() => router.push(`/admin/hotels/${id}`)}
          >
            {t.cancel}
          </Button>
          <Button 
            className="font-bold bg-[#0071c2] hover:bg-[#005999] text-white flex gap-2 items-center"
          >
            <Save className="w-4 h-4" />
            {t.saveChanges}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="p-2 bg-blue-50 text-[#0071c2] rounded-lg">
                <Building className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">{t.basicInfo}</h2>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">{t.hotelName}</label>
                <Input defaultValue={hotel.name} className="bg-gray-50 h-12 rounded-xl border-gray-200" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">{t.description}</label>
                <Textarea 
                  defaultValue={hotel.description}
                  className="bg-gray-50 min-h-[120px] rounded-xl border-gray-200 resize-none p-4" 
                />
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
             <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                  <BedDouble className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">{t.roomTypes}</h2>
              </div>
              <Button 
                onClick={handleAddRoom}
                variant="outline"
                size="sm"
                className="font-bold border-gray-200 text-[#0071c2] hover:bg-blue-50"
              >
                <Plus className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
                {t.addRoomType}
              </Button>
            </div>
            
            <div className="space-y-4">
              {rooms.map((room, index) => (
                <div key={room.id} className="p-4 rounded-xl border border-gray-200 bg-gray-50 relative group">
                  <button 
                    onClick={() => handleRemoveRoom(room.id)}
                    className="absolute top-4 right-4 rtl:left-4 rtl:right-auto text-gray-400 hover:text-red-600 transition-colors bg-white rounded-full p-1.5 shadow-sm border border-gray-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div className="space-y-2 md:col-span-2 pr-12 rtl:pr-0 rtl:pl-12">
                      <label className="text-sm font-bold text-gray-700">{t.roomName}</label>
                      <Input 
                        value={room.type}
                        onChange={(e) => {
                          const newRooms = [...rooms];
                          newRooms[index].type = e.target.value;
                          setRooms(newRooms);
                        }}
                        className="bg-white h-11 border-gray-200" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">{t.pricePerNight}</label>
                      <div className="relative">
                        <span className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                        <Input 
                          type="number"
                          value={room.price}
                          onChange={(e) => {
                            const newRooms = [...rooms];
                            newRooms[index].price = Number(e.target.value);
                            setRooms(newRooms);
                          }}
                          className="bg-white h-11 border-gray-200 pl-8 rtl:pr-8 rtl:pl-3" 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">{t.capacity}</label>
                      <Input 
                        type="number"
                        min="1"
                        value={room.capacity}
                        onChange={(e) => {
                          const newRooms = [...rooms];
                          newRooms[index].capacity = Number(e.target.value);
                          setRooms(newRooms);
                        }}
                        className="bg-white h-11 border-gray-200" 
                      />
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-bold text-gray-700">{t.numberOfRooms}</label>
                      <Input 
                        type="number"
                        min="1"
                        value={room.count}
                        onChange={(e) => {
                          const newRooms = [...rooms];
                          newRooms[index].count = Number(e.target.value);
                          setRooms(newRooms);
                        }}
                        className="bg-white h-11 border-gray-200" 
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
             <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                <MapPin className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">{t.location}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">{t.city}</label>
                <Input defaultValue={hotel.city} className="bg-gray-50 h-11 border-gray-200" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">{t.country}</label>
                <Input defaultValue={hotel.country} className="bg-gray-50 h-11 border-gray-200" />
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">{t.status}</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                <input type="radio" name="status" defaultChecked={hotel.status === 'Active'} className="w-4 h-4 text-[#0071c2] focus:ring-[#0071c2]" />
                <span className="font-medium text-gray-900">{t.active}</span>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                <input type="radio" name="status" defaultChecked={hotel.status === 'Inactive'} className="w-4 h-4 text-[#0071c2] focus:ring-[#0071c2]" />
                <span className="font-medium text-gray-900">{t.inactive}</span>
              </label>
            </div>

            <h2 className="text-lg font-bold text-gray-900 mt-8 mb-4">{t.facilities}</h2>
            <div className="space-y-3">
              {facilitiesList.map(facility => (
                <label key={facility.id} className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked={facility.checked} className="w-4 h-4 rounded border-gray-300 text-[#0071c2] focus:ring-[#0071c2]" />
                  <span className="text-gray-700 font-medium text-sm">{facility.label}</span>
                </label>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">{t.images}</h2>
            
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-gray-50 hover:bg-blue-50/50 hover:border-[#0071c2]/50 transition-colors cursor-pointer group">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 mb-4 group-hover:scale-110 transition-transform">
                <ImageIcon className="w-8 h-8 text-gray-400 group-hover:text-[#0071c2]" />
              </div>
              <p className="font-bold text-gray-900 mb-1">{t.uploadImages}</p>
              <Button size="sm" variant="outline" className="font-bold bg-white text-gray-700 mt-2">
                {t.uploadImages}
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
