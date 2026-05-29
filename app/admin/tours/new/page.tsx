'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { ArrowLeft, ArrowRight, Save, Image as ImageIcon, MapPin, Building, BedDouble, Plus, Trash2, FileText, CheckSquare, Utensils, Percent, Users, ShieldAlert, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';

export default function AdminTourFormPage() {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const router = useRouter();

  const [images, setImages] = useState<string[]>([]);
  const [groups, setGroups] = useState([
    { id: '1', name: 'Group 1', startDate: '2026-05-01', endDate: '2026-05-05', price: 150, adultCap: 20, childCap: 10, count: 1 },
  ]);

  const [childRules, setChildRules] = useState([
    { id: '1', ageFrom: 0, ageTo: 5.99, policy: 'Free', discount: 100 },
    { id: '2', ageFrom: 6, ageTo: 11.99, policy: 'Percentage', discount: 50 },
  ]);

  const t = {
    back: isAr ? 'العودة إلى الرحلات' : 'Back to Tours',
    addNewTour: isAr ? 'إضافة رحلة جديدة' : 'Add New Tour',
    basicInfo: isAr ? 'المعلومات الأساسية' : 'Basic Information',
    tourName: isAr ? 'اسم الرحلة' : 'Tour Name',
    starRating: isAr ? 'التصنيف/المستوى' : 'Rating/Level',
    description: isAr ? 'الوصف ومسار الرحلة' : 'Description & Itinerary',
    location: isAr ? 'الوجهة الرئيسية' : 'Main Destination',
    city: isAr ? 'المدينة' : 'City',
    country: isAr ? 'البلد' : 'Country',
    address: isAr ? 'نقطة التجمع / الانطلاق' : 'Meeting Point',
    images: isAr ? 'صور الرحلة' : 'Tour Images',
    uploadImages: isAr ? 'رفع صور' : 'Upload Images',
    groupInventory: isAr ? 'المجموعات والمواعيد' : 'Groups & Dates',
    addGroup: isAr ? 'إضافة مجموعة وقتية' : 'Add Time Group',
    groupName: isAr ? 'اسم المجموعة' : 'Group Name',
    startDate: isAr ? 'تاريخ البدء' : 'Start Date',
    endDate: isAr ? 'تاريخ الانتهاء' : 'End Date',
    pricePerPerson: isAr ? 'السعر للفرد ($)' : 'Price per person ($)',
    adultCap: isAr ? 'سعة البالغين' : 'Adult Cap',
    childCap: isAr ? 'سعة الأطفال' : 'Child Cap',
    numberOfGroups: isAr ? 'عدد المجموعات المتاحة' : 'Available Slots',
    childPolicies: isAr ? 'سياسات وتسعير الأطفال' : 'Child Pricing & Policies',
    addChildRule: isAr ? 'إضافة قاعدة أعمار' : 'Add Age Rule',
    ageFrom: isAr ? 'من عمر' : 'Age From',
    ageTo: isAr ? 'إلى عمر' : 'Age To',
    discountPercentage: isAr ? 'نسبة الخصم (%)' : 'Discount (%)',
    features: isAr ? 'مميزات وتفاصيل الرحلة' : 'Tour Features & Details',
    cancellationRules: isAr ? 'سياسات الإلغاء' : 'Cancellation Policies',
    cancellationDesc: isAr ? 'حدد أيام الإلغاء ونسب الغرامة...' : 'Specify days before trip and penalty %',
    saveTour: isAr ? 'حفظ الرحلة' : 'Save Tour',
    cancel: isAr ? 'إلغاء' : 'Cancel',
    status: isAr ? 'الحالة' : 'Status',
    active: isAr ? 'نشط' : 'Active',
    inactive: isAr ? 'غير نشط' : 'Inactive',
  };

  const featuresList = [
    { id: 'wifi', label: isAr ? 'واي فاي مجاني ضمن الفندق' : 'Free WiFi in Hotel' },
    { id: 'parking', label: isAr ? 'موقف سيارات مجاني' : 'Free Parking' },
    { id: 'transportation', label: isAr ? 'انتقالات داخلية' : 'Internal Transportation' },
    { id: 'guide', label: isAr ? 'مرشد سياحي مرافق' : 'Tour Guide' },
    { id: 'meals', label: isAr ? 'وجبات (إفطار أو غيرها)' : 'Meals Included' },
    { id: 'insurance', label: isAr ? 'تأمين سفر' : 'Travel Insurance' },
  ];

  const handleAddGroup = () => {
    setGroups([...groups, { id: Date.now().toString(), name: '', startDate: '', endDate: '', price: 0, adultCap: 20, childCap: 10, count: 1 }]);
  };

  const handleRemoveGroup = (id: string) => {
    setGroups(groups.filter(g => g.id !== id));
  };

  const handleAddChildRule = () => {
    setChildRules([...childRules, { id: Date.now().toString(), ageFrom: 0, ageTo: 0, policy: 'Percentage', discount: 0 }]);
  };

  const handleRemoveChildRule = (id: string) => {
    setChildRules(childRules.filter(rule => rule.id !== id));
  };

  return (
    <div className="pb-10 max-w-6xl mx-auto" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push('/admin/tours')}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-[#0071c2] hover:border-[#0071c2] transition-colors shadow-sm shrink-0"
            aria-label={t.back}
          >
            {isAr ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t.addNewTour}</h1>
            <p className="text-gray-500 text-sm mt-1">{isAr ? 'قم بتهيئة رحلة جديدة وإضافة تفاصيل الفندق والمجموعات' : 'Configure a new tour and set up hotel details and groups'}</p>
          </div>
        </div>
        
        <div className="flex gap-3 shrink-0">
          <Button 
            variant="outline" 
            className="font-bold border-gray-300 text-gray-700 bg-white"
            onClick={() => router.push('/admin/tours')}
          >
            {t.cancel}
          </Button>
          <Button 
            className="font-bold bg-[#0071c2] hover:bg-[#005999] text-white flex gap-2 items-center"
          >
            <Save className="w-4 h-4" />
            {t.saveTour}
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
                  <label className="text-sm font-bold text-gray-700">{t.tourName}</label>
                  <Input placeholder={isAr ? 'مثال: رحلة شرم الشيخ ٤ أيام' : 'e.g. Sharm El Sheikh 4 Days Trip'} className="bg-gray-50 h-11 border-gray-200" />
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
                  placeholder={isAr ? 'وصف تفصيلي للرحلة وبرنامجها...' : 'Detailed description and itinerary...'} 
                  className="bg-gray-50 min-h-[100px] border-gray-200 resize-y" 
                />
              </div>
            </div>
          </section>

          {/* Group Inventory */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                  <BedDouble className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">{t.groupInventory}</h2>
              </div>
              <Button onClick={handleAddGroup} variant="outline" size="sm" className="font-bold border-gray-200 text-[#0071c2] hover:bg-blue-50">
                <Plus className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
                {t.addGroup}
              </Button>
            </div>
            
            <div className="space-y-4">
              {groups.map((group, index) => (
                <div key={group.id} className="p-5 rounded-xl border border-gray-200 bg-gray-50 relative group">
                  <button 
                    onClick={() => handleRemoveGroup(group.id)}
                    className="absolute top-4 right-4 rtl:left-4 rtl:right-auto text-gray-400 hover:text-red-600 transition-colors bg-white rounded-full p-2 shadow-sm border border-gray-100"
                    title="Remove group"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pr-12 rtl:pr-0 rtl:pl-12">
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-bold text-gray-700">{t.groupName}</label>
                      <Input 
                        value={group.name} onChange={(e) => { const n = [...groups]; n[index].name = e.target.value; setGroups(n); }}
                        placeholder={isAr ? 'مثال: الفوج الأول' : 'e.g. Group 1'} 
                        className="bg-white h-11 border-gray-200" 
                      />
                    </div>
                    
                    <div className="space-y-2 md:col-span-1">
                      <label className="text-sm font-bold text-gray-700">{t.startDate}</label>
                      <Input 
                        type="date"
                        value={group.startDate} onChange={(e) => { const n = [...groups]; n[index].startDate = e.target.value; setGroups(n); }}
                        className="bg-white h-11 border-gray-200" 
                      />
                    </div>

                    <div className="space-y-2 md:col-span-1">
                      <label className="text-sm font-bold text-gray-700">{t.endDate}</label>
                      <Input 
                        type="date"
                        value={group.endDate} onChange={(e) => { const n = [...groups]; n[index].endDate = e.target.value; setGroups(n); }}
                        className="bg-white h-11 border-gray-200" 
                      />
                    </div>

                    <div className="space-y-2 md:col-span-1">
                      <label className="text-sm font-bold text-gray-700">{t.pricePerPerson}</label>
                      <Input 
                        type="number" value={group.price} onChange={(e) => { const n = [...groups]; n[index].price = Number(e.target.value); setGroups(n); }}
                        className="bg-white h-11 border-gray-200" 
                      />
                    </div>
                    
                    <div className="space-y-2 md:col-span-1">
                      <label className="text-sm font-bold text-gray-700">{t.adultCap}</label>
                      <Input 
                        type="number" min="1" value={group.adultCap} onChange={(e) => { const n = [...groups]; n[index].adultCap = Number(e.target.value); setGroups(n); }}
                        className="bg-white h-11 border-gray-200" 
                      />
                    </div>
                    
                    <div className="space-y-2 md:col-span-1">
                      <label className="text-sm font-bold text-gray-700">{t.childCap}</label>
                      <Input 
                        type="number" min="0" value={group.childCap} onChange={(e) => { const n = [...groups]; n[index].childCap = Number(e.target.value); setGroups(n); }}
                        className="bg-white h-11 border-gray-200" 
                      />
                    </div>

                    <div className="space-y-2 md:col-span-1">
                      <label className="text-sm font-bold text-gray-700">{t.numberOfGroups}</label>
                      <Input 
                        type="number" min="1" value={group.count} onChange={(e) => { const n = [...groups]; n[index].count = Number(e.target.value); setGroups(n); }}
                        className="bg-white h-11 border-gray-200" 
                      />
                    </div>
                    
                  </div>
                </div>
              ))}
              
              {groups.length === 0 && (
                <div className="text-center py-8 text-gray-500 bg-gray-50 border border-dashed border-gray-200 rounded-xl">
                  {isAr ? 'لم يتم إضافة أي مجموعات بعد.' : 'No groups added yet.'}
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
                <input type="radio" name="status" defaultChecked className="w-4 h-4 text-[#0071c2] focus:ring-[#0071c2]" />
                <span className="font-medium text-gray-900">{t.active}</span>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                <input type="radio" name="status" className="w-4 h-4 text-[#0071c2] focus:ring-[#0071c2]" />
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
                <Input placeholder={isAr ? 'المدينة' : 'City'} className="bg-gray-50 h-11 border-gray-200" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">{t.country}</label>
                <Input placeholder={isAr ? 'البلد' : 'Country'} className="bg-gray-50 h-11 border-gray-200" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">{t.address}</label>
                <Textarea placeholder={isAr ? 'العنوان التفصيلي' : 'Full street address'} className="bg-gray-50 h-20 border-gray-200 resize-none" />
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-yellow-400" />
              <h2 className="text-lg font-bold text-gray-900">{t.features}</h2>
            </div>
            <div className="space-y-3">
              {featuresList.map(feature => (
                <label key={feature.id} className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-yellow-500 focus:ring-yellow-500" />
                  <span className="text-gray-700 font-medium text-sm">{feature.label}</span>
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

