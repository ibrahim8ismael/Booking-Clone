'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { Search, Filter, Eye, Edit, Trash2, Calendar, MapPin, ChevronDown, CheckCircle, XCircle } from 'lucide-react';
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

export default function AdminBookingsPage() {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [destinationFilter, setDestinationFilter] = useState('All');

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<string | null>(null);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [bookingToEdit, setBookingToEdit] = useState<any | null>(null);

  const t = {
    bookings: isAr ? 'الحجوزات' : 'Bookings',
    searchPlaceholder: isAr ? 'البحث عن طريق المعرف أو العميل أو الفندق' : 'Search by ID, customer, or hotel...',
    status: isAr ? 'الحالة' : 'Status',
    destination: isAr ? 'الوجهة' : 'Destination',
    all: isAr ? 'الكل' : 'All',
    confirmed: isAr ? 'مؤكد' : 'Confirmed',
    pending: isAr ? 'قيد الانتظار' : 'Pending',
    cancelled: isAr ? 'ملغى' : 'Cancelled',
    bookingId: isAr ? 'رقم الحجز' : 'Booking ID',
    customer: isAr ? 'العميل' : 'Customer',
    hotelAndLocation: isAr ? 'الفندق والوجهة' : 'Hotel & Location',
    dates: isAr ? 'التواريخ' : 'Dates',
    price: isAr ? 'السعر' : 'Price',
    actions: isAr ? 'الإجراءات' : 'Actions',
    minPrice: isAr ? 'الحد الأدنى' : 'Min',
    maxPrice: isAr ? 'الحد الأقصى' : 'Max',
    filters: isAr ? 'عوامل التصفية' : 'Filters',
    deleteConfirmTitle: isAr ? 'تأكيد الحذف' : 'Confirm Deletion',
    deleteConfirmDesc: isAr ? 'هل أنت متأكد من أنك تريد حذف هذا الحجز؟ هذا الإجراء لا يمكن التراجع عنه.' : 'Are you sure you want to delete this booking? This action cannot be undone.',
    deleteRecord: isAr ? 'حذف السجل' : 'Delete Record',
    cancel: isAr ? 'إلغاء' : 'Cancel',
    editBooking: isAr ? 'تعديل الحجز' : 'Edit Booking',
    saveChanges: isAr ? 'حفظ التغييرات' : 'Save Changes',
  };

  const initialBookings = [
    { id: 'BK-100234', customer: 'Ibrahim Ismael', hotel: 'Palm Hotel & Resort', location: 'Dubai', checkIn: '2026-06-15', checkOut: '2026-06-20', amount: 1250, status: 'Confirmed' },
    { id: 'BK-100235', customer: 'Sarah Johnson', hotel: 'Serenity Suites', location: 'Riyadh', checkIn: '2026-04-10', checkOut: '2026-04-14', amount: 720, status: 'Pending' },
    { id: 'BK-100236', customer: 'Ahmed Ali', hotel: 'Grand Plaza', location: 'London', checkIn: '2026-07-01', checkOut: '2026-07-05', amount: 450, status: 'Confirmed' },
    { id: 'BK-100237', customer: 'Emma Wilson', hotel: 'Sea View Resort', location: 'Dubai', checkIn: '2026-08-12', checkOut: '2026-08-19', amount: 890, status: 'Cancelled' },
    { id: 'BK-100238', customer: 'Mohammed R.', hotel: 'Oasis Hotel', location: 'Riyadh', checkIn: '2026-05-02', checkOut: '2026-05-06', amount: 320, status: 'Confirmed' },
    { id: 'BK-100239', customer: 'John Doe', hotel: 'Eiffel View', location: 'Paris', checkIn: '2026-09-10', checkOut: '2026-09-15', amount: 1400, status: 'Pending' },
  ];

  const [bookingsList, setBookingsList] = useState(initialBookings);

  const filteredBookings = bookingsList.filter(booking => {
    const matchesSearch = 
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.hotel.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || booking.status === statusFilter;
    const matchesDestination = destinationFilter === 'All' || booking.location === destinationFilter;

    return matchesSearch && matchesStatus && matchesDestination;
  });

  const handleDelete = () => {
    if (bookingToDelete) {
      setBookingsList(bookingsList.filter(b => b.id !== bookingToDelete));
      setIsDeleteDialogOpen(false);
      setBookingToDelete(null);
    }
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingToEdit) {
      setBookingsList(bookingsList.map(b => b.id === bookingToEdit.id ? bookingToEdit : b));
      setIsEditDialogOpen(false);
      setBookingToEdit(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">{t.bookings}</h1>
        <Button className="bg-[#0071c2] hover:bg-[#005999] text-white font-bold">
           {isAr ? '+ إضافة حجز' : '+ Add Booking'}
        </Button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <div className="relative flex-grow">
            <Search className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 ${isAr ? 'right-3' : 'left-3'}`} />
            <Input 
              type="text" 
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full ${isAr ? 'pr-10' : 'pl-10'} bg-gray-50 border-gray-200 h-11`}
            />
          </div>
          
          <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 h-11">
            <MapPin className="w-4 h-4 text-gray-500" />
            <select 
              className="bg-transparent border-none text-sm font-medium text-gray-700 outline-none pr-4"
              value={destinationFilter}
              onChange={(e) => setDestinationFilter(e.target.value)}
            >
              <option value="All">{t.all} {t.destination}</option>
              <option value="Dubai">Dubai</option>
              <option value="Riyadh">Riyadh</option>
              <option value="London">London</option>
              <option value="Paris">Paris</option>
            </select>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 h-11">
            <Filter className="w-4 h-4 text-gray-500" />
            <select 
              className="bg-transparent border-none text-sm font-medium text-gray-700 outline-none pr-4"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">{t.all} {t.status}</option>
              <option value="Confirmed">{t.confirmed}</option>
              <option value="Pending">{t.pending}</option>
              <option value="Wait for Payment">{isAr ? 'في انتظار الدفع' : 'Wait for Payment'}</option>
              <option value="Cancelled">{t.cancelled}</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left" dir={isAr ? 'rtl' : 'ltr'}>
            <thead className="bg-gray-50 text-gray-500 text-sm">
              <tr>
                <th className="px-6 py-4 font-medium">{t.bookingId}</th>
                <th className="px-6 py-4 font-medium">{t.customer}</th>
                <th className="px-6 py-4 font-medium">{t.hotelAndLocation}</th>
                <th className="px-6 py-4 font-medium">{t.dates}</th>
                <th className="px-6 py-4 font-medium">{t.price}</th>
                <th className="px-6 py-4 font-medium">{t.status}</th>
                <th className="px-6 py-4 font-medium text-center">{t.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredBookings.length > 0 ? filteredBookings.map((booking, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors text-sm">
                  <td className="px-6 py-4 font-medium text-gray-900">{booking.id}</td>
                  <td className="px-6 py-4 text-gray-900 font-medium">{booking.customer}</td>
                  <td className="px-6 py-4">
                    <p className="text-gray-900 font-medium">{booking.hotel}</p>
                    <p className="text-gray-500 text-xs mt-1">{booking.location}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-900 mb-1">{booking.checkIn}</p>
                    <p className="text-gray-500">{booking.checkOut}</p>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">${booking.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold inline-block ${
                      booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                      booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      booking.status === 'Wait for Payment' ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {booking.status === 'Confirmed' ? t.confirmed :
                       booking.status === 'Pending' ? t.pending :
                       booking.status === 'Wait for Payment' ? (isAr ? 'في انتظار الدفع' : 'Wait for Payment') :
                       t.cancelled}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => router.push(`/admin/bookings/${booking.id}`)}
                          className="p-1.5 text-gray-500 hover:text-[#0071c2] hover:bg-blue-50 rounded transition-colors" 
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => {
                            setBookingToEdit(booking);
                            setIsEditDialogOpen(true);
                          }}
                          className="p-1.5 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded transition-colors" 
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => {
                            setBookingToDelete(booking.id);
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
                   <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                      {isAr ? 'لم يتم العثور على حجوزات تطابق بحثك.' : 'No bookings found matching your search.'}
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
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto bg-white" dir={isAr ? 'rtl' : 'ltr'}>
          <DialogHeader className="pb-4 border-b border-gray-100">
            <DialogTitle className={isAr ? 'text-right text-xl font-bold text-[#003580]' : 'text-left text-xl font-bold text-[#003580]'}>
              {t.editBooking} <span className="text-gray-400 font-medium ml-1">#{bookingToEdit?.id}</span>
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleEditSubmit} className="space-y-6 pt-2 pb-4">
            {bookingToEdit && (
              <>
                <div className="bg-gray-50 p-4 rounded-lg flex items-start gap-4 mb-2">
                   <div className="bg-white p-2 rounded shadow-sm border border-gray-200 text-[#0071c2]">
                      <Calendar className="w-6 h-6" />
                   </div>
                   <div>
                     <p className="font-semibold text-gray-900">{bookingToEdit.hotel}</p>
                     <p className="text-sm text-gray-500">{bookingToEdit.checkIn} — {bookingToEdit.checkOut}</p>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-2 col-span-2">
                    <label className="text-sm font-bold text-gray-700">{t.customer}</label>
                    <Input 
                      value={bookingToEdit.customer} 
                      onChange={e => setBookingToEdit({...bookingToEdit, customer: e.target.value})}
                      className="bg-gray-50 h-11"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2 col-span-2">
                    <label className="text-sm font-bold text-gray-700">{isAr ? 'الفندق' : 'Hotel'}</label>
                    <select
                      value={bookingToEdit.hotel}
                      onChange={e => setBookingToEdit({...bookingToEdit, hotel: e.target.value})}
                      className="w-full h-11 flex items-center justify-between rounded-md border border-input bg-gray-50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    >
                      <option value="Palm Hotel & Resort">Palm Hotel & Resort</option>
                      <option value="Serenity Suites">Serenity Suites</option>
                      <option value="Grand Plaza">Grand Plaza</option>
                      <option value="Sea View Resort">Sea View Resort</option>
                      <option value="Oasis Hotel">Oasis Hotel</option>
                      <option value="Eiffel View">Eiffel View</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">{t.destination}</label>
                    <select
                      value={bookingToEdit.location}
                      onChange={e => setBookingToEdit({...bookingToEdit, location: e.target.value})}
                      className="w-full h-11 flex items-center justify-between rounded-md border border-input bg-gray-50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    >
                      <option value="Dubai">Dubai</option>
                      <option value="Riyadh">Riyadh</option>
                      <option value="London">London</option>
                      <option value="Paris">Paris</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">{t.price} ($)</label>
                    <Input 
                      type="number"
                      value={bookingToEdit.amount} 
                      onChange={e => setBookingToEdit({...bookingToEdit, amount: parseInt(e.target.value) || 0})}
                      className="bg-gray-100 h-11 cursor-not-allowed text-gray-500"
                      disabled
                      readOnly
                    />
                  </div>

                  <div className="space-y-2 col-span-2">
                    <label className="text-sm font-bold text-gray-700">{t.status}</label>
                    <select
                      value={bookingToEdit.status}
                      onChange={e => setBookingToEdit({...bookingToEdit, status: e.target.value})}
                      className="w-full h-11 flex items-center justify-between rounded-md border border-input bg-gray-50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="Confirmed">{t.confirmed}</option>
                      <option value="Pending">{t.pending}</option>
                      <option value="Wait for Payment">{isAr ? 'في انتظار الدفع' : 'Wait for Payment'}</option>
                      <option value="Cancelled">{t.cancelled}</option>
                    </select>
                  </div>
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
