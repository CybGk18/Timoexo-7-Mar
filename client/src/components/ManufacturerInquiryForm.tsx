import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { API_BASE_URL } from '@/config/api';

const ManufacturerInquiryForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    country: '',
    products: '',
    capacity: '',
    sector: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/manufacturer_inquiry.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName: formData.company,
          contactPerson: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          productCategory: formData.sector,
          productionCapacity: formData.capacity,
          requirements: formData.message,
          sourcePage: window.location.pathname,
        }),
      });

      const contentType = response.headers.get('content-type') || '';
      const rawText = await response.text();
      const result = contentType.includes('application/json')
        ? JSON.parse(rawText)
        : { success: false, error: rawText || `Server returned ${response.status} ${response.statusText}` };

      if (response.ok && result.success) {
        alert('Manufacturer inquiry submitted successfully!');
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          company: '',
          country: '',
          products: '',
          capacity: '',
          sector: '',
          message: ''
        });
      } else {
        alert(result.error || result.message || 'Failed to submit inquiry. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting manufacturer inquiry:', error);
      alert('Failed to submit inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="z-20 p-4 sm:p-5 text-sm">
      <div className="mb-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Manufacturer Inquiry</h2>
        <p className="text-gray-600 text-xs sm:text-sm">
          Tell us about your products and export goals. We'll connect you with international buyers.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Row 1: Full Name & Company */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
              placeholder="Your Company"
            />
          </div>
        </div>

        {/* Row 2: Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
              placeholder="+1 234 567 8900"
            />
          </div>
        </div>

        {/* Row 3: Country & Sector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Country
            </label>
            <input
              type="text"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
              placeholder="United States"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Sector of Interest
            </label>
            <select
              value={formData.sector}
              onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-sm"
            >
              <option value="">Select a sector</option>
              <option value="automotive">Automotive</option>
              <option value="electronics">Electronics</option>
              <option value="textiles">Textiles</option>
              <option value="machinery">Machinery</option>
              <option value="chemicals">Chemicals</option>
              <option value="food">Food & Beverages</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={3}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none text-sm"
            placeholder="Tell us about your products, manufacturing capacity, and export goals..."
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-md font-medium hover:shadow-lg transition-all text-sm"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
          </button>
          <button
            type="button"
            className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-all text-sm"
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Contact Info */}
      <div className="pt-4 border-t border-gray-200 space-y-1.5 text-gray-600 text-xs">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4" />
          <span> info@imoexo.com</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4" />
          <span>+91 82374 39036</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>Pune, Maharashtra, India</span>
        </div>
        <p className="text-[11px] text-gray-500 pt-1">Response within 24 hours</p>
      </div>
    </div>
  );
};

export default ManufacturerInquiryForm;
