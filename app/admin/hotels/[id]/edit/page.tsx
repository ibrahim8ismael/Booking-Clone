'use client';

// Same as new page for the simulation but mapped to specific hotel
import React, { useState, use } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { ArrowLeft, ArrowRight, Save, Image as ImageIcon, MapPin, Building, BedDouble, Plus, Trash2, FileText, CheckSquare, Utensils, Percent, Users, ShieldAlert, Star } from 'lucide-react';
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
    { id: '1', type: 'Standard Room', price: 150, adultCap: 2, childCap: 1, view: 'City View', connectedReady: false, count: 45 },
    { id: '2', type: 'Deluxe Suite', price: 300, adultCap: 4, childCap: 2, view: 'Sea View', connectedReady: true, count: 12 }
  ]);

  const [childRules, setChildRules] = useState([
    { id: '1', ageFrom: 0, ageTo: 5.99, policy: 'Free', discount: 100 },
    { id: '2', ageFrom: 6, ageTo: 11.99, policy: 'Percentage', discount: 50 },
  ]);

  const hotel = {
    id,
    name: id === 'HOT-001' ? 'Palm Hotel & Resort' : 'Grand Plaza',
    description: 'A luxurious resort with amazing views, multiple pools, and private beach access.',
    city: id === 'HOT-001' ? 'Dubai' : 'Riyadh',
    country: id === 'HOT-001' ? 'UAE' : 'KSA',
    status: 'Active',
    contactPerson: 'Ahmed Hassan',
    contactPhone: '+971501234567',
    contactEmail: 'sales@palmhotel.com',
    commission: 15,
  };

  const t = {
    back: isAr ? 'العودة إلى الفندق' : 'Back to Hotel',
    editHotel: isAr ? 'تعديل بيانات المورد' : 'Edit Vendor Details',
    basicInfo: isAr ? 'المعلومات الأساسية' : 'Basic Information',
    hotelName: isAr ? 'اسم الفندق' : 'Hotel Name',
    starRating: isAr ? 'تصنيف النجوم' : 'Star Rating',
    description: isAr ? 'الوصف' : 'Description',
    location: isAr ? 'الموقع والعنوان' : 'Location & Address',
    city: isAr ? 'المدينة' : 'City',
    country: isAr ? 'البلد' : 'Country',
    address: isAr ? 'العنوان التفصيلي' : 'Full Address',
    images: isAr ? 'صور الفندق' : 'Hotel Images',
    uploadImages: isAr ? 'رفع صور' : 'Upload Images',
    contractDetails: isAr ? 'تفاصيل التعاقد' : 'Contract Details',
    contactPerson: isAr ? 'مسؤول التواصل' : 'Contact Person',
    contactPhone: isAr ? 'رقم الهاتف' : 'Phone Number',
    contactEmail: isAr ? 'البريد الإلكتروني' : 'Email Address',
    commissionRate: isAr ? 'نسبة العمولة الأساسية (%)' : 'Base Commission Rate (%)',
    roomInventory: isAr ? 'أنواع ومخزون الغرف' : 'Room Types & Inventory',
    addRoomType: isAr ? 'إضافة نوع غرفة' : 'Add Room Type',
    roomName: isAr ? 'اسم الغرفة' : 'Room Name',
    viewType: isAr ? 'الإطلالة' : 'View Type',
    connectedReady: isAr ? 'يدعم الغرف المتصلة؟' : 'Connected Room Ready?',
    pricePerNight: isAr ? 'السعر الأساسي ($)' : 'Base Price ($)',
    adultCap: isAr ? 'سعة البالغين' : 'Adult Cap',
    childCap: isAr ? 'سعة الأطفال' : 'Child Cap',
    numberOfRooms: isAr ? 'عدد الغرف (المخزون)' : 'Inventory Count',
    childPolicies: isAr ? 'سياسات وتسعير الأطفال' : 'Child Pricing & Policies',
    addChildRule: isAr ? 'إضافة قاعدة أعمار' : 'Add Age Rule',
    ageFrom: isAr ? 'من عمر' : 'Age From',
    ageTo: isAr ? 'إلى عمر' : 'Age To',
    discountPercentage: isAr ? 'نسبة الخصم (%)' : 'Discount (%)',
    mealPlans: isAr ? 'خطط الوجبات المدعومة' : 'Supported Meal Plans',
    cancellationRules: isAr ? 'سياسات الإلغاء' : 'Cancellation Policies',
    cancellationDesc: isAr ? 'حدد أيام الإلغاء ونسب الغرامة...' : 'Specify days before check-in and penalty %',
    saveChanges: isAr ? 'حفظ التغييرات' : 'Save Changes',
    cancel: isAr ? 'إلغاء' : 'Cancel',
    status: isAr ? 'الحالة' : 'Status',
    active: isAr ? 'نشط' : 'Active',
    inactive: isAr ? 'غير نشط' : 'Inactive',
    facilities: isAr ? 'المرافق الأبرز' : 'Main Facilities',
  };

  const mealPlansList = [
    { id: 'bb', label: 'BB (Bed & Breakfast)', checked: true },
    { id: 'hb', label: 'HB (Half Board)', checked: true },
    { id: 'fb', label: 'FB (Full Board)', checked: false },
    { id: 'sai', label: 'Soft All Inclusive', checked: false },
    { id: 'uai', label: 'Ultra All Inclusive', checked: false }
  ];

  const handleAddRoom = () => {
    setRooms([...rooms, { id: Date.now().toString(), type: '', price: 0, adultCap: 2, childCap: 1, view: '', connectedReady: false, count: 1 }]);
  };

  const handleRemoveRoom = (roomId: string) => {
    setRooms(rooms.filter(room => room.id !== roomId));
  };

  const handleAddChildRule = () => {
    setChildRules([...childRules, { id: Date.now().toString(), ageFrom: 0, ageTo: 0, policy: 'Percentage', discount: 0 }]);
  };

  const handleRemoveChildRule = (ruleId: string) => {
    setChildRules(childRules.filter(rule => rule.id !== ruleId));
  };

  return (
    <div className="pb-10 max-w-6xl mx-auto" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push(`/admin/hotels/${id}`)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-[#0071c2] hover:border-[#0071c2] transition-colors shadow-sm shrink-0"
            aria-label={t.back}
          >
            {isAr ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t.editHotel} <span className="text-gray-400 font-normal ml-2">#{id}</span></h1>
            <p className="text-gray-500 text-sm mt-1">{isAr ? 'تعديل بيانات مورد الفندق وتحديث العقود والأسعار' : 'Update hotel vendor details, contracts, and pricing'}</p>
          </div>
        </div>
        
        <div className="flex gap-3 shrink-0">
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
        
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Basic Info */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="p-2 bg-blue-50 text-[#0071c2] rounded-lg">
                <Building className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">{t.basicInfo}</h2>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="space-y-2 md:col-span-3">
                  <label className="text-sm font-bold text-gray-700">{t.hotelName}</label>
                  <Input defaultValue={hotel.name} className="bg-gray-50 h-11 border-gray-200" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">{t.starRating}</label>
                  <select className="flex h-11 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0071c2]">
                    <option value="5">5 {isAr ? 'نجوم' : 'Stars'}</option>
                    <option value="4">4 {isAr ? 'نجوم' : 'Stars'}</option>
                    <option value="3">3 {isAr ? 'نجوم' : 'Stars'}</option>
                    <option value="boutique">Boutique</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">{t.description}</label>
                <Textarea 
                  defaultValue={hotel.description}
                  className="bg-gray-50 min-h-[100px] border-gray-200 resize-y" 
                />
              </div>
            </div>
          </section>

          {/* Contract & Vendor Info */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <FileText className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">{t.contractDetails}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">{t.contactPerson}</label>
                <Input defaultValue={hotel.contactPerson} className="bg-gray-50 h-11 border-gray-200" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">{t.contactPhone}</label>
                <Input defaultValue={hotel.contactPhone} className="bg-gray-50 h-11 border-gray-200" dir="ltr" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">{t.contactEmail}</label>
                <Input type="email" defaultValue={hotel.contactEmail} className="bg-gray-50 h-11 border-gray-200" dir="ltr" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">{t.commissionRate}</label>
                <div className="relative">
                  <span className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 -translate-y-1/2 text-gray-500 font-medium">%</span>
                  <Input type="number" defaultValue={hotel.commission} className="bg-gray-50 h-11 border-gray-200 pl-8 rtl:pr-8 rtl:pl-3" />
                </div>
              </div>
            </div>
          </section>

          {/* Room Inventory */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                  <BedDouble className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">{t.roomInventory}</h2>
              </div>
              <Button onClick={handleAddRoom} variant="outline" size="sm" className="font-bold border-gray-200 text-[#0071c2] hover:bg-blue-50">
                <Plus className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
                {t.addRoomType}
              </Button>
            </div>
            
            <div className="space-y-4">
              {rooms.map((room, index) => (
                <div key={room.id} className="p-5 rounded-xl border border-gray-200 bg-gray-50 relative group">
                  <button 
                    onClick={() => handleRemoveRoom(room.id)}
                    className="absolute top-4 right-4 rtl:left-4 rtl:right-auto text-gray-400 hover:text-red-600 transition-colors bg-white rounded-full p-2 shadow-sm border border-gray-100"
                    title="Remove room type"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pr-12 rtl:pr-0 rtl:pl-12">
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-bold text-gray-700">{t.roomName}</label>
                      <Input 
                        value={room.type} onChange={(e) => { const n = [...rooms]; n[index].type = e.target.value; setRooms(n); }}
                        placeholder={isAr ? 'مثال: غرفة قياسية مزدوجة' : 'e.g. Standard Double Room'} 
                        className="bg-white h-11 border-gray-200" 
                      />
                    </div>
                    
                    <div className="space-y-2 md:col-span-1">
                      <label className="text-sm font-bold text-gray-700">{t.viewType}</label>
                      <Input 
                        value={room.view} onChange={(e) => { const n = [...rooms]; n[index].view = e.target.value; setRooms(n); }}
                        placeholder={isAr ? 'مثال: إطلالة بحر' : 'e.g. Sea View'} 
                        className="bg-white h-11 border-gray-200" 
                      />
                    </div>

                    <div className="space-y-2 md:col-span-1">
                      <label className="text-sm font-bold text-gray-700">{t.pricePerNight}</label>
                      <Input 
                        type="number" value={room.price} onChange={(e) => { const n = [...rooms]; n[index].price = Number(e.target.value); setRooms(n); }}
                        className="bg-white h-11 border-gray-200" 
                      />
                    </div>
                    
                    <div className="space-y-2 md:col-span-1">
                      <label className="text-sm font-bold text-gray-700">{t.adultCap}</label>
                      <Input 
                        type="number" min="1" value={room.adultCap} onChange={(e) => { const n = [...rooms]; n[index].adultCap = Number(e.target.value); setRooms(n); }}
                        className="bg-white h-11 border-gray-200" 
                      />
                    </div>
                    
                    <div className="space-y-2 md:col-span-1">
                      <label className="text-sm font-bold text-gray-700">{t.childCap}</label>
                      <Input 
                        type="number" min="0" value={room.childCap} onChange={(e) => { const n = [...rooms]; n[index].childCap = Number(e.target.value); setRooms(n); }}
                        className="bg-white h-11 border-gray-200" 
                      />
                    </div>

                    <div className="space-y-2 md:col-span-1">
                      <label className="text-sm font-bold text-gray-700">{t.numberOfRooms}</label>
                      <Input 
                        type="number" min="1" value={room.count} onChange={(e) => { const n = [...rooms]; n[index].count = Number(e.target.value); setRooms(n); }}
                        className="bg-white h-11 border-gray-200" 
                      />
                    </div>

                    <div className="space-y-2 md:col-span-1 flex items-end pb-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-[#0071c2]" checked={room.connectedReady} onChange={(e) => { const n = [...rooms]; n[index].connectedReady = e.target.checked; setRooms(n); }} />
                        <span className="text-sm font-bold text-gray-700">{t.connectedReady}</span>
                      </label>
                    </div>
                    
                  </div>
                </div>
              ))}
              
              {rooms.length === 0 && (
                <div className="text-center py-8 text-gray-500 bg-gray-50 border border-dashed border-gray-200 rounded-xl">
                  {isAr ? 'لم يتم إضافة أي أنواع غرف بعد.' : 'No room types added yet.'}
                </div>
              )}
            </div>
          </section>

          {/* Child Policies */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-pink-50 text-pink-600 rounded-lg">
                  <Users className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">{t.childPolicies}</h2>
              </div>
              <Button onClick={handleAddChildRule} variant="outline" size="sm" className="font-bold border-gray-200 text-pink-600 hover:bg-pink-50">
                <Plus className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
                {t.addChildRule}
              </Button>
            </div>
            
            <div className="space-y-4">
              {childRules.map((rule, index) => (
                <div key={rule.id} className="p-4 rounded-xl border border-gray-200 bg-gray-50 flex flex-wrap lg:flex-nowrap gap-4 items-end relative">
                   <div className="space-y-2 flex-1 min-w-[120px]">
                      <label className="text-sm font-bold text-gray-700">{t.ageFrom}</label>
                      <Input type="number" step="0.01" value={rule.ageFrom} onChange={(e) => { const n = [...childRules]; n[index].ageFrom = Number(e.target.value); setChildRules(n); }} className="bg-white h-11 border-gray-200" />
                   </div>
                   <div className="space-y-2 flex-1 min-w-[120px]">
                      <label className="text-sm font-bold text-gray-700">{t.ageTo}</label>
                      <Input type="number" step="0.01" value={rule.ageTo} onChange={(e) => { const n = [...childRules]; n[index].ageTo = Number(e.target.value); setChildRules(n); }} className="bg-white h-11 border-gray-200" />
                   </div>
                   <div className="space-y-2 flex-1 min-w-[120px]">
                      <label className="text-sm font-bold text-gray-700">{t.discountPercentage}</label>
                      <Input type="number" value={rule.discount} onChange={(e) => { const n = [...childRules]; n[index].discount = Number(e.target.value); setChildRules(n); }} className="bg-white h-11 border-gray-200" />
                   </div>
                   <button 
                      onClick={() => handleRemoveChildRule(rule.id)}
                      className="h-11 w-11 flex items-center justify-center text-gray-400 hover:text-red-600 transition-colors bg-white rounded-lg shadow-sm border border-gray-100 shrink-0"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                </div>
              ))}
            </div>
          </section>

          {/* Cancellation Policies */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">{t.cancellationRules}</h2>
            </div>
            
            <Textarea 
              placeholder={t.cancellationDesc}
              className="bg-gray-50 min-h-[100px] border-gray-200 resize-y" 
            />
          </section>

        </div>

        {/* Sidebar Options Area */}
        <div className="space-y-8">
          
          {/* Status */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
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
          </section>

           {/* Location */}
           <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-gray-400" />
              <h2 className="text-lg font-bold text-gray-900">{t.location}</h2>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">{t.city}</label>
                <Input defaultValue={hotel.city} className="bg-gray-50 h-11 border-gray-200" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">{t.country}</label>
                <Input defaultValue={hotel.country} className="bg-gray-50 h-11 border-gray-200" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">{t.address}</label>
                <Textarea placeholder={isAr ? 'العنوان التفصيلي' : 'Full street address'} className="bg-gray-50 h-20 border-gray-200 resize-none" />
              </div>
            </div>
          </section>

          {/* Supported Meal Plans */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
             <div className="flex items-center gap-2 mb-4">
              <Utensils className="w-5 h-5 text-orange-400" />
              <h2 className="text-lg font-bold text-gray-900">{t.mealPlans}</h2>
            </div>
            <div className="space-y-3">
              {mealPlansList.map(plan => (
                <label key={plan.id} className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked={plan.checked} className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                  <span className="text-gray-700 font-medium text-sm">{plan.label}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Image Upload */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
            <h2 className="text-lg font-bold text-gray-900 mb-4">{t.images}</h2>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-center bg-gray-50 hover:bg-blue-50/50 hover:border-[#0071c2]/50 transition-colors cursor-pointer group">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 mb-3 group-hover:scale-110 transition-transform">
                <ImageIcon className="w-6 h-6 text-gray-400 group-hover:text-[#0071c2]" />
              </div>
              <p className="font-bold text-gray-900 text-sm mb-1">{t.uploadImages}</p>
              <p className="text-xs text-gray-500 mb-3">Max size: 5MB</p>
              <Button size="sm" variant="outline" className="font-bold bg-white text-gray-700 w-full">
                {t.uploadImages}
              </Button>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
