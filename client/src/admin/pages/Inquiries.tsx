import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Search,
  Inbox,
  Download,
  Eye,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Upload,
  Plus
} from 'lucide-react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  country: string;
  requirements: string;
  inquiry_type: 'buyer' | 'manufacturer' | 'contact';
  type_label: string;
  created_at: string;
  status: 'new' | 'contacted' | 'in_progress' | 'closed' | 'dead_lead';
  contact_person?: string;
  company_name?: string;
  product_category?: string;
  quantity?: string;
  production_capacity?: string;
  source_page?: string;
}

export const Inquiries = () => {
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedInquiries, setSelectedInquiries] = useState<Set<string>>(new Set());
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [inquiryToDelete, setInquiryToDelete] = useState<Inquiry | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newInquiry, setNewInquiry] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'contact',
    company: '',
    country: '',
    category: '',
    message: '',
    status: 'new',
    date: new Date().toISOString().split('T')[0] // Today's date in YYYY-MM-DD format
  });
  const itemsPerPage = 10;

  useEffect(() => {
    loadInquiries();
  }, [filterType]);

  const loadInquiries = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/server/inquiries-admin.php?filter=${filterType}`, {
        credentials: 'include'
      });

      const result = await response.json();

      if (result.success) {
        setInquiries(result.data);
      } else {
        toast.error('Failed to load inquiries');
      }
    } catch (error) {
      toast.error('Error loading inquiries');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredInquiries = inquiries.filter(inquiry => {
    const searchLower = searchQuery.toLowerCase();
    const name = inquiry.name?.toLowerCase() || '';
    const email = inquiry.email?.toLowerCase() || '';
    const phone = inquiry.phone?.toLowerCase() || '';
    const typeLabel = inquiry.type_label?.toLowerCase() || '';

    const matchesSearch = name.includes(searchLower) ||
      email.includes(searchLower) ||
      phone.includes(searchLower) ||
      typeLabel.includes(searchLower);

    const matchesStatus = statusFilter === 'all' || inquiry.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredInquiries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedInquiries = filteredInquiries.slice(startIndex, endIndex);

  // Reset to page 1 when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterType, statusFilter]);

  const handleInquiryClick = (inquiry: Inquiry) => {
    navigate(`/admin/inquiries/${inquiry.id}?type=${inquiry.inquiry_type}`);
  };

  const handleStatusChange = async (inquiry: Inquiry, newStatus: string) => {
    try {
      const response = await fetch('/server/inquiries-admin.php', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          id: inquiry.id,
          type: inquiry.inquiry_type,
          status: newStatus
        })
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Status updated successfully');
        // Update local state
        setInquiries(prev => prev.map(inq =>
          inq.id === inquiry.id && inq.inquiry_type === inquiry.inquiry_type
            ? { ...inq, status: newStatus as Inquiry['status'] }
            : inq
        ));
      } else {
        toast.error(result.message || 'Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Error updating status');
    }
  };

  const handleDeleteClick = (inquiry: Inquiry, e: React.MouseEvent) => {
    e.stopPropagation();
    setInquiryToDelete(inquiry);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!inquiryToDelete) return;

    try {
      const response = await fetch('/server/inquiries-admin.php', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          id: inquiryToDelete.id,
          type: inquiryToDelete.inquiry_type
        })
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Inquiry deleted successfully');
        // Remove from local state
        setInquiries(prev => prev.filter(inq =>
          !(inq.id === inquiryToDelete.id && inq.inquiry_type === inquiryToDelete.inquiry_type)
        ));
        setDeleteDialogOpen(false);
        setInquiryToDelete(null);
      } else {
        toast.error(result.message || 'Failed to delete inquiry');
      }
    } catch (error) {
      console.error('Error deleting inquiry:', error);
      toast.error('Error deleting inquiry');
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = paginatedInquiries.map(inq => `${inq.inquiry_type}-${inq.id}`);
      setSelectedInquiries(new Set(allIds));
    } else {
      setSelectedInquiries(new Set());
    }
  };

  const handleSelectInquiry = (inquiry: Inquiry, checked: boolean) => {
    const key = `${inquiry.inquiry_type}-${inquiry.id}`;
    const newSelected = new Set(selectedInquiries);
    if (checked) {
      newSelected.add(key);
    } else {
      newSelected.delete(key);
    }
    setSelectedInquiries(newSelected);
  };

  const handleBulkDelete = async () => {
    if (selectedInquiries.size === 0) {
      toast.error('Please select inquiries to delete');
      return;
    }

    if (!confirm(`Are you sure you want to delete ${selectedInquiries.size} selected inquiries?\n\nEmail notifications will be sent to info@imoexo.com for each deleted inquiry.`)) {
      return;
    }

    try {
      const deletePromises = Array.from(selectedInquiries).map(key => {
        const [type, id] = key.split('-');
        return fetch('/server/inquiries-admin.php', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            id: parseInt(id),
            type: type
          })
        });
      });

      await Promise.all(deletePromises);

      toast.success(`${selectedInquiries.size} inquiries deleted successfully`);
      setSelectedInquiries(new Set());
      loadInquiries();
    } catch (error) {
      console.error('Error deleting inquiries:', error);
      toast.error('Error deleting inquiries');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

  const truncateText = (text: string, maxLength: number = 45) => {
    if (!text) return '—';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      'new': 'New',
      'contacted': 'Contacted',
      'in_progress': 'In Progress',
      'closed': 'Closed',
      'dead_lead': 'Dead Lead'
    };
    return labels[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'new': 'bg-blue-100 text-blue-700 border-blue-200',
      'contacted': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'in_progress': 'bg-purple-100 text-purple-700 border-purple-200',
      'closed': 'bg-green-100 text-green-700 border-green-200',
      'dead_lead': 'bg-gray-100 text-gray-700 border-gray-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const loadXlsx = async () => {
    const module = await import('xlsx');
    return module;
  };

  const exportToExcel = async () => {
    try {
      const XLSX = await loadXlsx();
      const exportData = filteredInquiries.map(inquiry => ({
        'Inquiry ID': `#${inquiry.id}`,
        'Name': inquiry.name,
        'Email': inquiry.email,
        'Phone': inquiry.phone || 'N/A',
        'Inquiry Type': inquiry.type_label,
        'Company Name': inquiry.company_name || 'N/A',
        'Country': inquiry.country || 'N/A',
        'Product Category': inquiry.product_category || 'N/A',
        'Contact Person': inquiry.contact_person || 'N/A',
        'Quantity': inquiry.quantity || 'N/A',
        'Production Capacity': inquiry.production_capacity || 'N/A',
        'Requirements/Message': inquiry.requirements || 'N/A',
        'Status': getStatusLabel(inquiry.status),
        'Source Page': inquiry.source_page || 'N/A',
        'Submitted At': formatDate(inquiry.created_at)
      }));

      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Inquiries');

      const colWidths = [
        { wch: 12 }, { wch: 20 }, { wch: 25 }, { wch: 15 }, { wch: 18 },
        { wch: 20 }, { wch: 15 }, { wch: 20 }, { wch: 20 }, { wch: 15 },
        { wch: 20 }, { wch: 40 }, { wch: 15 }, { wch: 15 }, { wch: 25 }
      ];
      ws['!cols'] = colWidths;

      const fileName = `inquiries_${filterType}_${new Date().toISOString().split('T')[0]}.xlsx`;
      XLSX.writeFile(wb, fileName);

      toast.success(`Exported ${exportData.length} inquiries to Excel`);
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export inquiries');
    }
  };

  const handleImportExcel = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const XLSX = await loadXlsx();
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Map Excel columns to our format
      const mappedData = jsonData.map((row: any) => ({
        name: row.Name || row.name || '',
        email: row.Email || row.email || '',
        phone: row.Phone || row.phone || '',
        type: (row.Type || row.type || 'contact').toLowerCase().replace(' inquiry', ''),
        company: row.Company || row.company || '',
        country: row.Country || row.country || '',
        category: row.Category || row.category || '',
        message: row.Message || row.message || '',
        status: (row.Status || row.status || 'new').toLowerCase().replace(' ', '_')
      }));

      // Send to backend
      const response = await fetch('/server/inquiries-admin.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          action: 'bulk_import',
          data: mappedData
        })
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        loadInquiries();
      } else {
        toast.error(result.message || 'Failed to import inquiries');
      }
    } catch (error) {
      console.error('Import error:', error);
      toast.error('Failed to import Excel file');
    }

    // Reset file input
    e.target.value = '';
  };

  const handleAddInquiry = async () => {
    // Validate required fields
    if (!newInquiry.name || !newInquiry.email) {
      toast.error('Name and Email are required');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newInquiry.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      const response = await fetch('/server/inquiries-admin.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          action: 'create',
          data: newInquiry
        })
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Inquiry added successfully');
        setAddDialogOpen(false);
        // Reset form
        setNewInquiry({
          name: '',
          email: '',
          phone: '',
          type: 'contact',
          company: '',
          country: '',
          category: '',
          message: '',
          status: 'new',
          date: new Date().toISOString().split('T')[0]
        });
        loadInquiries();
      } else {
        toast.error(result.message || 'Failed to add inquiry');
      }
    } catch (error) {
      console.error('Error adding inquiry:', error);
      toast.error('Error adding inquiry');
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  const allSelected = paginatedInquiries.length > 0 &&
    paginatedInquiries.every(inq => selectedInquiries.has(`${inq.inquiry_type}-${inq.id}`));

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Inquiries</h1>
        <p className="text-gray-500 text-sm mt-1">Manage all customer inquiries and submissions</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full sm:w-[180px] h-9 text-sm">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all">All Inquiries</SelectItem>
            <SelectItem value="buyer">Buyer Inquiry</SelectItem>
            <SelectItem value="manufacturer">Manufacturer Inquiry</SelectItem>
            <SelectItem value="contact">Contact Inquiry</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px] h-9 text-sm">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
            <SelectItem value="dead_lead">Dead Lead</SelectItem>
          </SelectContent>
        </Select>

        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search by name, email, phone, or type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-9 text-sm"
          />
        </div>

        {selectedInquiries.size > 0 && (
          <Button
            onClick={handleBulkDelete}
            variant="destructive"
            className="sm:w-auto w-full flex items-center gap-2 h-9 text-sm"
          >
            <Trash2 className="h-4 w-4" />
            Delete Selected ({selectedInquiries.size})
          </Button>
        )}

        <div className="flex gap-2">
          <label htmlFor="excel-upload">
            <Button
              variant="outline"
              className="sm:w-auto w-full flex items-center gap-2 h-9 text-sm cursor-pointer"
              asChild
            >
              <span>
                <Upload className="h-4 w-4" />
                Import
              </span>
            </Button>
          </label>
          <input
            id="excel-upload"
            type="file"
            accept=".xlsx,.xls"
            onChange={handleImportExcel}
            className="hidden"
          />

          <Button
            onClick={() => setAddDialogOpen(true)}
            variant="outline"
            className="sm:w-auto w-full flex items-center gap-2 h-9 text-sm"
          >
            <Plus className="h-4 w-4" />
            Add Inquiry
          </Button>

          <Button
            onClick={exportToExcel}
            variant="outline"
            className="sm:w-auto w-full flex items-center gap-2 h-9 text-sm"
            disabled={filteredInquiries.length === 0}
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {filteredInquiries.length === 0 ? (
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <Inbox className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Inquiries Found</h3>
              <p className="text-gray-500 text-sm">
                {searchQuery ? 'Try adjusting your search terms' : 'No inquiries have been submitted yet'}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-3 py-2 text-left">
                        <Checkbox
                          checked={allSelected}
                          onCheckedChange={handleSelectAll}
                        />
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Company
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Country
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Message
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Submitted
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedInquiries.map((inquiry) => {
                      const isSelected = selectedInquiries.has(`${inquiry.inquiry_type}-${inquiry.id}`);
                      return (
                        <tr
                          key={`${inquiry.inquiry_type}-${inquiry.id}`}
                          onClick={() => handleInquiryClick(inquiry)}
                          className="hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <td className="px-3 py-2" onClick={(e) => e.stopPropagation()}>
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={(checked) => handleSelectInquiry(inquiry, checked as boolean)}
                            />
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-gray-900">
                            #{inquiry.id}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                            {inquiry.name || inquiry.contact_person || '—'}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-xs" onClick={(e) => e.stopPropagation()}>
                            <a href={`mailto:${inquiry.email}`} className="text-blue-600 hover:underline">
                              {inquiry.email}
                            </a>
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-xs" onClick={(e) => e.stopPropagation()}>
                            {inquiry.phone ? (
                              <a href={`tel:${inquiry.phone}`} className="text-blue-600 hover:underline">
                                {inquiry.phone}
                              </a>
                            ) : '—'}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${inquiry.inquiry_type === 'buyer'
                              ? 'bg-blue-100 text-blue-700'
                              : inquiry.inquiry_type === 'manufacturer'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-purple-100 text-purple-700'
                              }`}>
                              {inquiry.type_label}
                            </span>
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-600">
                            {inquiry.company_name || '—'}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-600">
                            {inquiry.country || '—'}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-600">
                            {inquiry.product_category || '—'}
                          </td>
                          <td className="px-3 py-2 text-xs text-gray-600 max-w-xs">
                            {truncateText(inquiry.requirements)}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-600">
                            {formatDate(inquiry.created_at)}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                            <Select
                              value={inquiry.status}
                              onValueChange={(value) => handleStatusChange(inquiry, value)}
                            >
                              <SelectTrigger className={`w-[120px] h-7 text-xs border ${getStatusColor(inquiry.status)}`}>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-white">
                                <SelectItem value="new">New</SelectItem>
                                <SelectItem value="contacted">Contacted</SelectItem>
                                <SelectItem value="in_progress">In Progress</SelectItem>
                                <SelectItem value="closed">Closed</SelectItem>
                                <SelectItem value="dead_lead">Dead Lead</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-xs" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleInquiryClick(inquiry)}
                                className="h-7 px-2 text-xs"
                              >
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => handleDeleteClick(inquiry, e)}
                                className="h-7 px-2 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between text-sm">
              <div className="text-xs text-gray-500">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredInquiries.length)} of {filteredInquiries.length} inquiries
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="h-8 text-xs"
                >
                  <ChevronLeft className="h-3 w-3" />
                  Previous
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    let page;
                    if (totalPages <= 5) {
                      page = i + 1;
                    } else if (currentPage <= 3) {
                      page = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      page = totalPages - 4 + i;
                    } else {
                      page = currentPage - 2 + i;
                    }
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="w-8 h-8 p-0 text-xs"
                      >
                        {page}
                      </Button>
                    );
                  })}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="h-8 text-xs"
                >
                  Next
                  <ChevronRight className="h-3 w-3" />
                </Button>
              </div>
            </div>
          )}

          {totalPages <= 1 && (
            <div className="text-xs text-gray-500 text-center">
              Showing {filteredInquiries.length} of {inquiries.length} inquiries
            </div>
          )}
        </>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the inquiry
              {inquiryToDelete && ` from ${inquiryToDelete.name || inquiryToDelete.email}`}.
              An email notification will be sent to info@imoexo.com.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Add Inquiry Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="bg-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Inquiry</DialogTitle>
            <DialogDescription>
              Fill in the details to manually add a new inquiry to the system.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={newInquiry.name}
                  onChange={(e) => setNewInquiry({ ...newInquiry, name: e.target.value })}
                  placeholder="Enter name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newInquiry.email}
                  onChange={(e) => setNewInquiry({ ...newInquiry, email: e.target.value })}
                  placeholder="Enter email"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newInquiry.phone}
                  onChange={(e) => setNewInquiry({ ...newInquiry, phone: e.target.value })}
                  placeholder="Enter phone number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newInquiry.date}
                  onChange={(e) => setNewInquiry({ ...newInquiry, date: e.target.value })}
                  className="bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Inquiry Type</Label>
                <Select
                  value={newInquiry.type}
                  onValueChange={(value) => setNewInquiry({ ...newInquiry, type: value })}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="contact">Contact Inquiry</SelectItem>
                    <SelectItem value="buyer">Buyer Inquiry</SelectItem>
                    <SelectItem value="manufacturer">Manufacturer Inquiry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={newInquiry.status}
                  onValueChange={(value) => setNewInquiry({ ...newInquiry, status: value })}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                    <SelectItem value="dead_lead">Dead Lead</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={newInquiry.company}
                  onChange={(e) => setNewInquiry({ ...newInquiry, company: e.target.value })}
                  placeholder="Enter company name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={newInquiry.country}
                  onChange={(e) => setNewInquiry({ ...newInquiry, country: e.target.value })}
                  placeholder="Enter country"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={newInquiry.category}
                onChange={(e) => setNewInquiry({ ...newInquiry, category: e.target.value })}
                placeholder="Enter product category"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={newInquiry.message}
                onChange={(e) => setNewInquiry({ ...newInquiry, message: e.target.value })}
                placeholder="Enter inquiry message or requirements"
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setAddDialogOpen(false)}
            >
              Cancel
            </Button>

            <Button
              onClick={handleAddInquiry}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Add Inquiry
            </Button>
          </DialogFooter>

        </DialogContent>
      </Dialog>
    </div>
  );
};
