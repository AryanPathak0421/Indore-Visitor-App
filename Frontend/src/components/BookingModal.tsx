import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, Users, IndianRupee } from 'lucide-react';

interface BookingModalProps {
  attraction: {
    id: number;
    name: string;
    distance: string;
    category: string;
    rating: number;
    timing: string;
    description: string;
  };
  children: React.ReactNode;
}

const BookingModal = ({ attraction, children }: BookingModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    visitDate: '',
    numberOfVisitors: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Base price per person (you can make this dynamic based on attraction)
  const basePrice = 100;
  const totalPrice = basePrice * formData.numberOfVisitors;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.visitDate) {
      setError('Please select a visit date');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // Redirect to login if no token
        window.location.href = '/login';
        return;
      }

      const response = await fetch('http://localhost:5000/api/booking/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          attractionName: attraction.name,
          attractionLocation: attraction.distance,
          visitDate: formData.visitDate,
          numberOfVisitors: formData.numberOfVisitors,
          totalPrice: totalPrice
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to booking confirmation page
        window.location.href = `/booking/${data.booking.bookingId}`;
      } else {
        setError(data.message || 'Booking failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'numberOfVisitors' ? parseInt(value) || 1 : value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Book Your Visit</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Attraction Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg">{attraction.name}</h3>
            <p className="text-sm text-gray-600">{attraction.description}</p>
            <p className="text-sm text-gray-600 mt-1">
              <span className="font-medium">Timing:</span> {attraction.timing}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="visitDate">
                <Calendar className="w-4 h-4 inline mr-2" />
                Visit Date
              </Label>
              <Input
                id="visitDate"
                name="visitDate"
                type="date"
                value={formData.visitDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="numberOfVisitors">
                <Users className="w-4 h-4 inline mr-2" />
                Number of Visitors
              </Label>
              <Input
                id="numberOfVisitors"
                name="numberOfVisitors"
                type="number"
                min="1"
                max="10"
                value={formData.numberOfVisitors}
                onChange={handleChange}
                required
              />
            </div>

            {/* Price Summary */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Base Price per person:</span>
                <span className="text-sm">₹{basePrice}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Number of visitors:</span>
                <span className="text-sm">{formData.numberOfVisitors}</span>
              </div>
              <div className="border-t pt-2 flex justify-between items-center">
                <span className="font-semibold flex items-center">
                  <IndianRupee className="w-4 h-4 mr-1" />
                  Total Price:
                </span>
                <span className="font-bold text-lg text-green-600">₹{totalPrice}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1"
              >
                {loading ? 'Booking...' : 'Confirm Booking'}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
