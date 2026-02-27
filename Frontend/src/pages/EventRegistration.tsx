import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Users, Clock, User, Mail, Phone, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface Event {
  id: number;
  name: string;
  date: string;
  time: string;
  location: string;
  category: string;
  attendees: number;
  description: string;
}

interface RegistrationData {
  fullName: string;
  email: string;
  phone: string;
  age: string;
  address: string;
  emergencyContact: string;
  specialRequirements: string;
}

const events: Event[] = [
  {
    id: 1,
    name: "Rangoli Utsav",
    date: "Jan 15, 2025",
    time: "9:00 AM",
    location: "Rajwada Palace",
    category: "Cultural",
    attendees: 1500,
    description: "Annual rangoli competition showcasing artistic talent",
  },
  {
    id: 2,
    name: "Food Festival",
    date: "Feb 5-7, 2025",
    time: "5:00 PM",
    location: "Chhappan Dukan",
    category: "Food",
    attendees: 5000,
    description: "Celebrate Indore's street food culture",
  },
  {
    id: 3,
    name: "Classical Music Night",
    date: "Jan 26, 2025",
    time: "7:00 PM",
    location: "Devi Ahilya Utsav Ground",
    category: "Music",
    attendees: 800,
    description: "Evening of classical ragas and performances",
  },
  {
    id: 4,
    name: "Heritage Walk",
    date: "Every Sunday",
    time: "6:30 AM",
    location: "Starting from Rajwada",
    category: "Tourism",
    attendees: 50,
    description: "Guided walking tour through historic Indore",
  },
  {
    id: 5,
    name: "Craft Fair",
    date: "Mar 1-3, 2025",
    time: "10:00 AM",
    location: "Lal Bagh Palace",
    category: "Art",
    attendees: 2000,
    description: "Traditional handicrafts and artisan showcase",
  },
];

export default function EventRegistration() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  
  const [formData, setFormData] = useState<RegistrationData>({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    address: '',
    emergencyContact: '',
    specialRequirements: ''
  });

  useEffect(() => {
    const eventId = parseInt(id || '0');
    const foundEvent = events.find(e => e.id === eventId);
    setEvent(foundEvent || null);
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.fullName.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your full name",
        variant: "destructive"
      });
      return false;
    }
    
    if (!formData.email.trim() || !formData.email.includes('@')) {
      toast({
        title: "Validation Error", 
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return false;
    }
    
    if (!formData.phone.trim() || formData.phone.length < 10) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid phone number",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call to backend
      const response = await fetch('http://localhost:5000/api/events/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          eventId: event?.id,
          ...formData
        })
      });
      
      if (response.ok) {
        const result = await response.json();
        
        toast({
          title: "Registration Successful!",
          description: `You have successfully registered for ${event?.name}`,
        });
        
        setIsRegistered(true);
        
        // Store registration in localStorage for demo purposes
        const registrations = JSON.parse(localStorage.getItem('eventRegistrations') || '[]');
        registrations.push({
          eventId: event?.id,
          eventName: event?.name,
          registrationData: formData,
          registrationDate: new Date().toISOString()
        });
        localStorage.setItem('eventRegistrations', JSON.stringify(registrations));
        
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }
      
    } catch (error) {
      console.error('Registration error:', error);
      
      // Fallback for demo - store in localStorage
      const registrations = JSON.parse(localStorage.getItem('eventRegistrations') || '[]');
      registrations.push({
        eventId: event?.id,
        eventName: event?.name,
        registrationData: formData,
        registrationDate: new Date().toISOString()
      });
      localStorage.setItem('eventRegistrations', JSON.stringify(registrations));
      
      toast({
        title: "Registration Successful!",
        description: `You have successfully registered for ${event?.name}`,
      });
      
      setIsRegistered(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Event Not Found</h2>
          <Button onClick={() => navigate('/events')}>
            Back to Events
          </Button>
        </div>
      </div>
    );
  }

  if (isRegistered) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Registration Confirmed!</h2>
              <p className="text-muted-foreground mb-6">
                You have successfully registered for {event.name}
              </p>
              <div className="space-y-2 text-sm text-muted-foreground bg-muted p-4 rounded-lg">
                <p><strong>Event:</strong> {event.name}</p>
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Time:</strong> {event.time}</p>
                <p><strong>Location:</strong> {event.location}</p>
              </div>
              <Button onClick={() => navigate('/events')} className="w-full mt-6">
                Back to Events
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="mb-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/events')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Events
        </Button>
        
        <h1 className="text-3xl font-bold text-foreground mb-2">Event Registration</h1>
        <p className="text-muted-foreground">Register for {event.name}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Event Details */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground text-lg mb-2">{event.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{event.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-primary" />
                    <span>{event.attendees}+ attending</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {event.category}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Registration Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={handleInputChange}
                      placeholder="25"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleTextAreaChange}
                    placeholder="Enter your complete address"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 min-h-[100px] resize-none"
                  />
                </div>

                <div>
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input
                    id="emergencyContact"
                    name="emergencyContact"
                    type="tel"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    placeholder="Emergency contact number"
                  />
                </div>

                <div>
                  <Label htmlFor="specialRequirements">Special Requirements</Label>
                  <textarea
                    id="specialRequirements"
                    name="specialRequirements"
                    value={formData.specialRequirements}
                    onChange={handleTextAreaChange}
                    placeholder="Any special requirements or accommodations needed"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 min-h-[100px] resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Registering...' : 'Complete Registration'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
