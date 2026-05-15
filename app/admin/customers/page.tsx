'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { Search, Eye, Edit, Trash2, Mail, Phone, Calendar, Users, Star, UserPlus } from 'lucide-react';
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

export default function AdminCustomersPage() {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<string | null>(null);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [customerToEdit, setCustomerToEdit] = useState<any | null>(null);

  const t = {
    customers: isAr ? 'العملاء' : 'Customers',
    searchPlaceholder: isAr ? 'البحث بالاسم، البريد الإلكتروني، أو الهاتف...' : 'Search by name, email, or phone...',
    name: isAr ? 'الاسم' : 'Name',
    email: isAr ? 'البريد الإلكتروني' : 'Email Address',
    phone: isAr ? 'الهاتف' : 'Phone',
    totalBookings: isAr ? 'إجمالي الحجوزات' : 'Total Bookings',
    joinDate: isAr ? 'تاريخ الانضمام' : 'Join Date',
    actions: isAr ? 'الإجراءات' : 'Actions',
    allCustomers: isAr ? 'جميع العملاء' : 'All Customers',
    primeCustomers: isAr ? 'العملاء المميزين' : 'Prime Customers',
    newCustomers: isAr ? 'العملاء الجدد' : 'New Customers',
    deleteConfirmTitle: isAr ? 'تأكيد الحذف' : 'Confirm Deletion',
    deleteConfirmDesc: isAr ? 'هل أنت متأكد من أنك تريد حذف هذا العميل؟ هذا الإجراء لا يمكن التراجع عنه.' : 'Are you sure you want to delete this customer? This action cannot be undone.',
    deleteRecord: isAr ? 'حذف السجل' : 'Delete Record',
    cancel: isAr ? 'إلغاء' : 'Cancel',
    editCustomer: isAr ? 'تعديل العميل' : 'Edit Customer',
    saveChanges: isAr ? 'حفظ التغييرات' : 'Save Changes',
  };

  const initialCustomers = [
    { id: 'CUST-001', name: 'Ibrahim Ismael', email: 'ibrahim.ismael204@gmail.com', phone: '+971 50 123 4567', totalBookings: 5, joinDate: '2025-10-12', avatar: 'I' },
    { id: 'CUST-002', name: 'Sarah Johnson', email: 'sarah.j@example.com', phone: '+1 234 567 8900', totalBookings: 2, joinDate: '2026-01-15', avatar: 'S' },
    { id: 'CUST-003', name: 'Ahmed Ali', email: 'ahmed.ali@example.com', phone: '+966 50 987 6543', totalBookings: 8, joinDate: '2024-11-05', avatar: 'A' },
    { id: 'CUST-004', name: 'Emma Wilson', email: 'emma.w@example.co.uk', phone: '+44 7700 900077', totalBookings: 1, joinDate: '2026-03-22', avatar: 'E' },
    { id: 'CUST-005', name: 'Mohammed R.', email: 'mohammed.r@example.com', phone: '+971 55 444 3333', totalBookings: 3, joinDate: '2025-08-19', avatar: 'M' },
    { id: 'CUST-006', name: 'John Doe', email: 'john.doe@example.com', phone: '+1 555 123 4567', totalBookings: 0, joinDate: '2026-05-10', avatar: 'J' },
  ];

  const [customers, setCustomers] = useState(initialCustomers);

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const handleDelete = () => {
    if (customerToDelete) {
      setCustomers(customers.filter(c => c.id !== customerToDelete));
      setIsDeleteDialogOpen(false);
      setCustomerToDelete(null);
    }
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customerToEdit) {
      setCustomers(customers.map(c => c.id === customerToEdit.id ? customerToEdit : c));
      setIsEditDialogOpen(false);
      setCustomerToEdit(null);
    }
  };

  const primeCustomersCount = customers.filter(c => c.totalBookings >= 3).length;
  const newCustomersCount = customers.filter(c => c.totalBookings === 0 || c.totalBookings === 1).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">{t.customers}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">{t.allCustomers}</p>
            <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
            <Star className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">{t.primeCustomers}</p>
            <p className="text-2xl font-bold text-gray-900">{primeCustomersCount}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
            <UserPlus className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">{t.newCustomers}</p>
            <p className="text-2xl font-bold text-gray-900">{newCustomersCount}</p>
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
            className={`w-full ${isAr ? 'pr-10' : 'pl-10'} bg-gray-50 border-gray-200 h-11`}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left" dir={isAr ? 'rtl' : 'ltr'}>
            <thead className="bg-gray-50 text-gray-500 text-sm border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-medium">{t.name}</th>
                <th className="px-6 py-4 font-medium">{t.email}</th>
                <th className="px-6 py-4 font-medium">{t.phone}</th>
                <th className="px-6 py-4 font-medium">{t.totalBookings}</th>
                <th className="px-6 py-4 font-medium">{t.joinDate}</th>
                <th className="px-6 py-4 font-medium text-center">{t.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCustomers.length > 0 ? filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors text-sm">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg shrink-0">
                        {customer.avatar}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{customer.name}</p>
                        <p className="text-gray-500 text-xs">{customer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    <div className="flex items-center gap-2">
                       <Mail className="w-4 h-4 text-gray-400" />
                       {customer.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                     <div className="flex items-center gap-2">
                       <Phone className="w-4 h-4 text-gray-400" />
                       <span dir="ltr">{customer.phone}</span>
                     </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                      {customer.totalBookings}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {customer.joinDate}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => router.push(`/admin/customers/${customer.id}`)}
                          className="p-1.5 text-gray-500 hover:text-[#0071c2] hover:bg-blue-50 rounded transition-colors" 
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => {
                            setCustomerToEdit(customer);
                            setIsEditDialogOpen(true);
                          }}
                          className="p-1.5 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded transition-colors" 
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => {
                            setCustomerToDelete(customer.id);
                            setIsDeleteDialogOpen(true);
                          }}
                          className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors" 
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                     </div>
                  </td>
                </tr>
              )) : (
                <tr>
                   <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      {isAr ? 'لم يتم العثور على عملاء.' : 'No customers found.'}
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

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white" dir={isAr ? 'rtl' : 'ltr'}>
          <DialogHeader className="pb-4 border-b border-gray-100">
            <DialogTitle className={isAr ? 'text-right text-xl font-bold text-[#003580]' : 'text-left text-xl font-bold text-[#003580]'}>
              {t.editCustomer} <span className="text-gray-400 font-medium ml-1">#{customerToEdit?.id}</span>
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleEditSubmit} className="space-y-6 pt-2 pb-4">
            {customerToEdit && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">{t.name}</label>
                  <Input 
                    value={customerToEdit.name} 
                    onChange={e => setCustomerToEdit({...customerToEdit, name: e.target.value})}
                    className="bg-gray-50 h-11"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">{t.email}</label>
                  <Input 
                    type="email"
                    value={customerToEdit.email} 
                    onChange={e => setCustomerToEdit({...customerToEdit, email: e.target.value})}
                    className="bg-gray-50 h-11"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">{t.phone}</label>
                  <Input 
                    value={customerToEdit.phone} 
                    onChange={e => setCustomerToEdit({...customerToEdit, phone: e.target.value})}
                    className="bg-gray-50 h-11 text-left"
                    dir="ltr"
                    required
                  />
                </div>
              </>
            )}
            <DialogFooter className="pt-6 border-t border-gray-100 flex gap-3 sm:justify-end">
              <Button 
                type="button" 
                variant="outline"
                className="font-bold h-11 px-6 border-gray-300"
                onClick={() => setIsEditDialogOpen(false)}
              >
                {t.cancel}
              </Button>
              <Button 
                type="submit" 
                className="bg-[#0071c2] hover:bg-[#005999] text-white font-bold h-11 px-6"
              >
                {t.saveChanges}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
