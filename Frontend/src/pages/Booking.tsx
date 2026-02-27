import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, MapPin, Clock, ArrowLeft, Download } from 'lucide-react';

const Booking = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/booking/${bookingId}`);
        const data = await response.json();
        
        if (response.ok) {
          setBooking(data.booking);
        } else {
          console.error('Booking not found');
        }
      } catch (error) {
        console.error('Error fetching booking:', error);
      } finally {
        setLoading(false);
      }
    };

    if (bookingId) {
      fetchBooking();
    }
  }, [bookingId]);

  const downloadQRCode = () => {
    if (booking?.qrCode) {
      const link = document.createElement('a');
      link.href = booking.qrCode;
      link.download = `booking-${bookingId}.png`;
      link.click();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading booking details...</div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Booking Not Found</h2>
          <Button onClick={() => navigate('/discover')}>
            Back to Discover
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/discover')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Discover
          </Button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
            <p className="text-gray-600">Your booking has been confirmed. Save this QR code for entry.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Booking Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Booking Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Booking ID</label>
                <p className="font-mono text-lg font-semibold">{booking.bookingId}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Attraction</label>
                <p className="text-lg font-semibold">{booking.attractionName}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <div>
                  <label className="text-sm font-medium text-gray-500">Location</label>
                  <p>{booking.attractionLocation}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <div>
                  <label className="text-sm font-medium text-gray-500">Visit Date</label>
                  <p>{new Date(booking.visitDate).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-500" />
                <div>
                  <label className="text-sm font-medium text-gray-500">Number of Visitors</label>
                  <p>{booking.numberOfVisitors}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Total Price</label>
                <p className="text-2xl font-bold text-green-600">₹{booking.totalPrice}</p>
              </div>
              
              <div className="pt-4">
                <Badge 
                  variant={booking.status === 'confirmed' ? 'default' : 'secondary'}
                  className="text-sm"
                >
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* QR Code */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Entry QR Code
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={downloadQRCode}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-4">
                <img 
                  src={booking.qrCode} 
                  alt="Booking QR Code" 
                  className="mx-auto border-2 border-gray-200 rounded-lg"
                  style={{ maxWidth: '300px', width: '100%' }}
                />
              </div>
              <div className="text-sm text-gray-600 space-y-2">
                <p><strong>Important:</strong> Please save this QR code</p>
                <p>Show this QR code at the entrance for entry</p>
                <p>Booking ID: <span className="font-mono">{booking.bookingId}</span></p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/my-bookings')}
          >
            View All Bookings
          </Button>
          <Button onClick={() => navigate('/discover')}>
            Book More Attractions
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Booking;
