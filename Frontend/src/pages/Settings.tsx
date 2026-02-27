import { useState, useEffect } from 'react';
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  HelpCircle,
  LogOut,
  ChevronRight,
  Moon,
  Sun,
  Volume2,
  Wifi,
  Smartphone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  MapPin,
  Calendar,
  CreditCard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

interface SettingsState {
  darkMode: boolean;
  notifications: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
  locationServices: boolean;
  autoPlay: boolean;
  soundEffects: boolean;
  language: string;
  currency: string;
  privacyMode: boolean;
  dataUsage: boolean;
}

export default function Settings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState<SettingsState>({
    darkMode: false,
    notifications: true,
    emailNotifications: true,
    pushNotifications: true,
    locationServices: true,
    autoPlay: false,
    soundEffects: true,
    language: 'English',
    currency: 'INR',
    privacyMode: false,
    dataUsage: true
  });

  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [email, setEmail] = useState('user@example.com');
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    const savedSettings = localStorage.getItem('settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }

    // Load user data from localStorage
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        setUserName(userData.name || userData.username || 'User');
        setEmail(userData.email || 'user@example.com');
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const handleSettingChange = (key: keyof SettingsState, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('settings', JSON.stringify(newSettings));

    toast({
      title: "Setting Updated",
      description: `${key} has been updated successfully.`,
    });
  };

  const handlePasswordChange = () => {
    if (currentPassword && newPassword) {
      toast({
        title: "Password Changed",
        description: "Your password has been updated successfully.",
      });
      setCurrentPassword('');
      setNewPassword('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const settingsSections = [
    {
      title: 'Account Settings',
      icon: User,
      items: [
        {
          label: 'Profile Information',
          description: 'Update your personal details',
          icon: User,
          action: () => {}
        },
        {
          label: 'Change Password',
          description: 'Update your password',
          icon: Lock,
          action: () => {}
        },
        {
          label: 'Email Preferences',
          description: 'Manage email notifications',
          icon: Mail,
          action: () => {}
        }
      ]
    },
    {
      title: 'Preferences',
      icon: Palette,
      items: [
        {
          label: 'Dark Mode',
          description: 'Toggle dark theme',
          icon: Moon,
          toggle: true,
          value: settings.darkMode,
          onChange: (value: boolean) => handleSettingChange('darkMode', value)
        },
        {
          label: 'Language',
          description: 'Choose your preferred language',
          icon: Globe,
          value: settings.language,
          options: ['English', 'Hindi', 'Gujarati']
        },
        {
          label: 'Currency',
          description: 'Display currency preference',
          icon: CreditCard,
          value: settings.currency,
          options: ['INR', 'USD', 'EUR']
        }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        {
          label: 'Push Notifications',
          description: 'Receive push notifications',
          icon: Smartphone,
          toggle: true,
          value: settings.pushNotifications,
          onChange: (value: boolean) => handleSettingChange('pushNotifications', value)
        },
        {
          label: 'Email Notifications',
          description: 'Receive email updates',
          icon: Mail,
          toggle: true,
          value: settings.emailNotifications,
          onChange: (value: boolean) => handleSettingChange('emailNotifications', value)
        },
        {
          label: 'Location Services',
          description: 'Allow location access',
          icon: MapPin,
          toggle: true,
          value: settings.locationServices,
          onChange: (value: boolean) => handleSettingChange('locationServices', value)
        }
      ]
    },
    {
      title: 'Privacy & Security',
      icon: Shield,
      items: [
        {
          label: 'Privacy Mode',
          description: 'Enhanced privacy protection',
          icon: Eye,
          toggle: true,
          value: settings.privacyMode,
          onChange: (value: boolean) => handleSettingChange('privacyMode', value)
        },
        {
          label: 'Data Usage',
          description: 'Monitor data consumption',
          icon: Wifi,
          toggle: true,
          value: settings.dataUsage,
          onChange: (value: boolean) => handleSettingChange('dataUsage', value)
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your account settings and preferences</p>
      </div>

      {/* Account Overview */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Account Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground">{userName}</h3>
              <p className="text-sm text-muted-foreground">{email}</p>
              <Badge variant="secondary" className="mt-2">Premium Member</Badge>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Member Since</p>
              <p className="font-medium">Jan 2024</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings Sections */}
      <div className="grid gap-6">
        {settingsSections.map((section, index) => (
          <Card key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <section.icon className="w-5 h-5" />
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium text-foreground">{item.label}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.toggle ? (
                      <Switch
                        checked={item.value}
                        onCheckedChange={item.onChange}
                      />
                    ) : item.options ? (
                      <select
                        value={item.value}
                        onChange={(e) => handleSettingChange(item.label.toLowerCase().replace(' ', ''), e.target.value)}
                        className="px-3 py-1 rounded-md border border-border bg-background text-sm"
                      >
                        {item.options.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    ) : (
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Password Change Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Security Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="current-password">Current Password</Label>
            <div className="relative">
              <Input
                id="current-password"
                type={showPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          <div>
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>
          <Button onClick={handlePasswordChange} className="w-full">
            Update Password
          </Button>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <LogOut className="w-5 h-5" />
            Account Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button
              variant="outline"
              onClick={handleLogout}
              className="w-full justify-start"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
            <Button
              variant="destructive"
              className="w-full justify-start"
              onClick={() => {
                toast({
                  title: "Account Deleted",
                  description: "This feature is not yet implemented.",
                  variant: "destructive"
                });
              }}
            >
              <User className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Help & Support */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            Help & Support
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-4 h-4 text-muted-foreground" />
              <div>
                <h4 className="font-medium text-foreground">Help Center</h4>
                <p className="text-sm text-muted-foreground">Get help and support</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <div>
                <h4 className="font-medium text-foreground">Contact Us</h4>
                <p className="text-sm text-muted-foreground">support@visitindore.com</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}