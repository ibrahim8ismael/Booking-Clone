'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { Search, Edit, Trash2, Building, MapPin, Star, Plus, Eye, DoorClosed, CheckCircle, XCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

export default function AdminToursPage() {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [tourToDelete, setTourToDelete] = useState<string | null>(null);

  const t = {
    tours: isAr ? 'الرحلات' : 'Tours',
    addTour: isAr ? 'إضافة رحلة' : 'Add Tour',
    searchPlaceholder: isAr ? 'البحث عن رحلة...' : 'Search tours...',
    allTours: isAr ? 'جميع الرحلات' : 'All Tours',
    totalGroups: isAr ? 'المجموعات الكلية' : 'Total Groups',
    activeTours: isAr ? 'الرحلات النشطة' : 'Active Tours',
    name: isAr ? 'الاسم' : 'Name',
    location: isAr ? 'الوجهة' : 'Location',
    groups: isAr ? 'المجموعات' : 'Groups',
    rating: isAr ? 'التقييم' : 'Rating',
    status: isAr ? 'الحالة' : 'Status',
    actions: isAr ? 'الإجراءات' : 'Actions',
    active: isAr ? 'نشط' : 'Active',
    inactive: isAr ? 'غير نشط' : 'Inactive',
    available: isAr ? 'متاح' : 'Available',
    booked: isAr ? 'محجوز' : 'Booked',
    manageGroups: isAr ? 'إدارة المجموعات' : 'Manage Groups',
    viewDetails: isAr ? 'عرض التفاصيل' : 'View Details',
    edit: isAr ? 'تعديل' : 'Edit',
    delete: isAr ? 'حذف' : 'Delete',
    cancel: isAr ? 'إلغاء' : 'Cancel',
    deleteConfirmTitle: isAr ? 'تأكيد الحذف' : 'Confirm Deletion',
    deleteConfirmDesc: isAr ? 'هل أنت متأكد من أنك تريد حذف هذه الرحلة وجميع مجموعاتها؟ هذا الإجراء لا يمكن التراجع عنه.' : 'Are you sure you want to delete this tour and all its groups? This action cannot be undone.',
    deleteRecord: isAr ? 'حذف السجل' : 'Delete Record',
  };

  const initialTours = [
    {
      id: 'TOUR-001',
      name: 'Sharm El Sheikh Gateway',
      location: 'Sharm El Sheikh, Egypt',
      totalGroups: 4,
      availableGroups: 2,
      rating: 4.8,
      status: 'Active',
      image: 'S'
    },
    {
      id: 'TOUR-002',
      name: 'Luxor & Aswan Cruise',
      location: 'Luxor, Egypt',
      totalGroups: 6,
      availableGroups: 1,
      rating: 4.5,
      status: 'Active',
      image: 'L'
    },
    {
      id: 'TOUR-003',
      name: 'Dahab Adventure',
      location: 'Dahab, Egypt',
      totalGroups: 3,
      availableGroups: 3,
      rating: 4.2,
      status: 'Inactive',
      image: 'D'
    },
    {
      id: 'TOUR-004',
      name: 'Cairo City Tour',
      location: 'Cairo, Egypt',
      totalGroups: 10,
      availableGroups: 4,
      rating: 4.7,
      status: 'Active',
      image: 'C'
    }
  ];

  const [tours, setTours] = useState(initialTours);

  const filteredTours = tours.filter(tour => 
    tour.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tour.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = () => {
    if (tourToDelete) {
      setTours(tours.filter(h => h.id !== tourToDelete));
      setIsDeleteDialogOpen(false);
      setTourToDelete(null);
    }
  };

  const activeToursCount = tours.filter(h => h.status === 'Active').length;
  const totalGroupsCount = tours.reduce((acc, h) => acc + h.totalGroups, 0);
  const availableGroupsCount = tours.reduce((acc, h) => acc + h.availableGroups, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">{t.tours}</h1>
        <Button 
          className="bg-[#0071c2] hover:bg-[#005999] text-white font-bold px-6 shadow-sm rounded-xl h-11"
          onClick={() => router.push('/admin/tours/new')}
        >
          <Plus className={`w-5 h-5 ${isAr ? 'ml-2' : 'mr-2'}`} />
          {t.addTour}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
            <Building className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">{t.allTours}</p>
            <p className="text-2xl font-bold text-gray-900">{tours.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">{t.activeTours}</p>
            <p className="text-2xl font-bold text-gray-900">{activeToursCount}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
            <DoorClosed className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">{t.totalGroups}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-gray-900">{totalGroupsCount}</p>
              <p className="text-sm text-gray-500 font-medium">({availableGroupsCount} {t.available})</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="relative max-w-md w-full">
          <Search className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 ${isAr ? 'right-3' : 'left-3'}`} />
          <Input 
            type="text" 
            placeholder={t.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full ${isAr ? 'pr-10' : 'pl-10'} bg-gray-50 border-gray-200 h-11 rounded-lg`}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left" dir={isAr ? 'rtl' : 'ltr'}>
            <thead className="bg-gray-50 text-gray-500 text-sm border-b border-gray-200 align-bottom">
              <tr>
                <th className="px-6 py-4 font-medium">{t.name}</th>
                <th className="px-6 py-4 font-medium">{t.location}</th>
                <th className="px-6 py-4 font-medium">
                  <div>{t.totalGroups}</div>
                  <div className="text-gray-900 font-bold mt-1 text-lg">{totalGroupsCount}</div>
                </th>
                <th className="px-6 py-4 font-medium">
                  <div>{t.available}</div>
                  <div className="text-green-600 font-bold mt-1 text-lg">{availableGroupsCount}</div>
                </th>
                <th className="px-6 py-4 font-medium">{t.rating}</th>
                <th className="px-6 py-4 font-medium">{t.status}</th>
                <th className="px-6 py-4 font-medium text-center">{t.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTours.length > 0 ? filteredTours.map((tour) => (
                <tr key={tour.id} className="hover:bg-gray-50 transition-colors text-sm">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xl shrink-0">
                        {tour.image}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{tour.name}</p>
                        <p className="text-gray-500 text-xs mt-0.5">{tour.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    <div className="flex items-center gap-2">
                       <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                       {tour.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900 font-medium">
                    {tour.totalGroups}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-green-700 bg-green-50 px-2.5 py-1 rounded-full font-medium">
                      {tour.availableGroups}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="font-bold">{tour.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                      tour.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {tour.status === 'Active' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {tour.status === 'Active' ? t.active : t.inactive}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => router.push(`/admin/tours/${tour.id}`)}
                          className="p-2 text-gray-500 hover:text-[#0071c2] hover:bg-blue-50 rounded-lg transition-colors" 
                          title={t.viewDetails}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => router.push(`/admin/tours/${tour.id}/edit`)}
                          className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" 
                          title={t.edit}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => {
                            setTourToDelete(tour.id);
                            setIsDeleteDialogOpen(true);
                          }}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                          title={t.delete}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                     </div>
                  </td>
                </tr>
              )) : (
                <tr>
                   <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                      {isAr ? 'لم يتم العثور على رحلات.' : 'No tours found.'}
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white border-none shadow-2xl rounded-2xl" dir={isAr ? 'rtl' : 'ltr'} showCloseButton={false}>
          <div className="flex flex-col items-center text-center pt-6 pb-2">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-5 ring-8 ring-red-50/50">
              <Trash2 className="w-8 h-8 text-red-600" />
            </div>
            <DialogHeader className="w-full">
              <DialogTitle className="text-2xl font-bold text-gray-900 mb-1 flex justify-center text-center">
                {t.deleteConfirmTitle}
              </DialogTitle>
            </DialogHeader>
            <p className="text-gray-500 text-sm max-w-[280px] mx-auto leading-relaxed mt-2">{t.deleteConfirmDesc}</p>
          </div>
          <div className="flex gap-3 px-2 pb-2 w-full mt-4">
            <Button 
              type="button" 
              variant="outline"
              className="flex-1 font-bold h-12 rounded-xl text-gray-700 bg-white border-gray-200 hover:bg-gray-50 hover:text-gray-900"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              {t.cancel}
            </Button>
            <Button 
              type="button" 
              variant="destructive"
              onClick={handleDelete}
              className="flex-1 font-bold h-12 rounded-xl bg-red-600 hover:bg-red-700 text-white"
            >
              {t.deleteRecord}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
