import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, Phone, MapPin, Building, Package, Calendar, User, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

interface InquiryData {
  id: number;
  name?: string;
  email: string;
  phone?: string;
  country?: string;
  requirements?: string;
  inquiry_type: 'buyer' | 'manufacturer' | 'contact';
  created_at: string;
  contact_person?: string;
  company_name?: string;
  product_category?: string;
  quantity?: string;
  production_capacity?: string;
  source_page?: string;
}

export const InquiryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const inquiryType = searchParams.get('type') || '';

  const [inquiry, setInquiry] = useState<InquiryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInquiry();
  }, [id, inquiryType]);

  const loadInquiry = async () => {
    try {
      setLoading(true);
      const url = inquiryType
        ? `/server/inquiries-admin.php?id=${id}&type=${inquiryType}`
        : `/server/inquiries-admin.php?id=${id}`;

      const response = await fetch(url, {
        credentials: 'include'
      });

      const result = await response.json();

      if (result.success) {
        setInquiry(result.data);
      } else {
        toast.error('Failed to load inquiry details');
        navigate('/admin/inquiries');
      }
    } catch (error) {
      toast.error('Error loading inquiry details');
      console.error(error);
      navigate('/admin/inquiries');
    } finally {
      setLoading(false);
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'buyer':
        return 'Buyer Inquiry';
      case 'manufacturer':
        return 'Manufacturer Inquiry';
      case 'contact':
        return 'Contact Inquiry';
      default:
        return type;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!inquiry) {
    return <div className="text-center py-12">Inquiry not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/admin/inquiries')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inquiry Details</h1>
          <p className="text-gray-500 mt-1">{getTypeLabel(inquiry.inquiry_type)}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Contact Information</CardTitle>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${inquiry.inquiry_type === 'buyer'
              ? 'bg-blue-100 text-blue-700'
              : inquiry.inquiry_type === 'manufacturer'
                ? 'bg-green-100 text-green-700'
                : 'bg-purple-100 text-purple-700'
              }`}>
              {getTypeLabel(inquiry.inquiry_type)}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inquiry.name && (
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium text-gray-900">{inquiry.name}</p>
                </div>
              </div>
            )}

            {inquiry.contact_person && (
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Contact Person</p>
                  <p className="font-medium text-gray-900">{inquiry.contact_person}</p>
                </div>
              </div>
            )}

            {inquiry.company_name && (
              <div className="flex items-start gap-3">
                <Building className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Company Name</p>
                  <p className="font-medium text-gray-900">{inquiry.company_name}</p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <a
                  href={`mailto:${inquiry.email}`}
                  className="font-medium text-blue-600 hover:underline"
                >
                  {inquiry.email}
                </a>
              </div>
            </div>

            {inquiry.phone && (
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <a
                    href={`tel:${inquiry.phone}`}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    {inquiry.phone}
                  </a>
                </div>
              </div>
            )}

            {inquiry.country && (
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Country</p>
                  <p className="font-medium text-gray-900">{inquiry.country}</p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Submitted At</p>
                <p className="font-medium text-gray-900">{formatDate(inquiry.created_at)}</p>
              </div>
            </div>

            {inquiry.product_category && (
              <div className="flex items-start gap-3">
                <Package className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Product Category</p>
                  <p className="font-medium text-gray-900">{inquiry.product_category}</p>
                </div>
              </div>
            )}

            {inquiry.quantity && (
              <div className="flex items-start gap-3">
                <Package className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Quantity</p>
                  <p className="font-medium text-gray-900">{inquiry.quantity}</p>
                </div>
              </div>
            )}

            {inquiry.production_capacity && (
              <div className="flex items-start gap-3">
                <Package className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Production Capacity</p>
                  <p className="font-medium text-gray-900">{inquiry.production_capacity}</p>
                </div>
              </div>
            )}

            {inquiry.source_page && (
              <div className="flex items-start gap-3">
                <Package className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Source Page</p>
                  <p className="font-medium text-gray-900">{inquiry.source_page}</p>
                </div>
              </div>
            )}

            {inquiry.requirements && (
              <div className="flex items-start gap-3 md:col-span-2">
                <MessageSquare className="h-5 w-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Message / Requirements</p>
                  <p className="font-medium text-gray-900 whitespace-pre-wrap">{inquiry.requirements.replace(/&#039;/g, "'")}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};