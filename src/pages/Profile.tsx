import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  UserIcon, 
  CreditCardIcon, 
  SettingsIcon,
  CheckIcon,
  DownloadIcon
} from "lucide-react";
import { mockUser } from "@/lib/mockData";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { toast } = useToast();
  const [profileData, setProfileData] = useState({
    name: mockUser.name,
    email: mockUser.email,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleProfileUpdate = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved.",
    });
  };

  const handlePasswordUpdate = () => {
    if (profileData.newPassword !== profileData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords don't match",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Password updated",
      description: "Your password has been successfully changed.",
    });

    setProfileData({
      ...profileData,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "/month",
      current: false,
      features: [
        "10 searches per day",
        "Basic problem discovery",
        "Limited AI analysis",
        "Email support"
      ]
    },
    {
      name: "Pro",
      price: "$29",
      period: "/month",
      current: true,
      features: [
        "100 searches per day",
        "Advanced AI analysis",
        "10 custom alerts",
        "Priority support",
        "Export capabilities",
        "Trend analytics"
      ]
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "/month",
      current: false,
      features: [
        "Unlimited searches",
        "Full AI insights",
        "Unlimited alerts",
        "Team collaboration",
        "API access",
        "Custom integrations"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation isAuthenticated={true} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Profile & Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account settings and subscription
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserIcon className="h-5 w-5" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  />
                </div>
                <Button onClick={handleProfileUpdate}>
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SettingsIcon className="h-5 w-5" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={profileData.currentPassword}
                    onChange={(e) => setProfileData({ ...profileData, currentPassword: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={profileData.newPassword}
                    onChange={(e) => setProfileData({ ...profileData, newPassword: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={profileData.confirmPassword}
                    onChange={(e) => setProfileData({ ...profileData, confirmPassword: e.target.value })}
                  />
                </div>
                <Button onClick={handlePasswordUpdate}>
                  Update Password
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Export</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Export all your saved problems, alerts, and search history.
                </p>
                <Button variant="outline">
                  <DownloadIcon className="h-4 w-4 mr-2" />
                  Export My Data
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Subscription & Usage */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCardIcon className="h-5 w-5" />
                  Current Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <Badge className="text-lg px-4 py-2">
                    {mockUser.subscription_tier} Plan
                  </Badge>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Searches today</span>
                    <span>23 / {mockUser.usage_limits.searches_per_day}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active alerts</span>
                    <span>3 / {mockUser.usage_limits.alerts_count}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status</span>
                    <Badge variant="success" className="text-xs">
                      {mockUser.subscription_status}
                    </Badge>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <Button className="w-full" variant="outline">
                    <CreditCardIcon className="h-4 w-4 mr-2" />
                    Manage Billing
                  </Button>
                  <Button className="w-full" variant="outline">
                    Download Invoice
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upgrade Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pricingPlans.map((plan) => (
                    <div 
                      key={plan.name}
                      className={`border rounded-lg p-4 ${plan.current ? 'border-primary bg-primary/5' : 'border-border'}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{plan.name}</h4>
                          {plan.current && (
                            <Badge variant="default" className="text-xs">Current</Badge>
                          )}
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold">{plan.price}</span>
                          <span className="text-sm text-muted-foreground">{plan.period}</span>
                        </div>
                      </div>
                      
                      <ul className="space-y-1 text-sm text-muted-foreground mb-3">
                        {plan.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <CheckIcon className="h-3 w-3 text-success" />
                            {feature}
                          </li>
                        ))}
                        {plan.features.length > 3 && (
                          <li className="text-xs">+{plan.features.length - 3} more features</li>
                        )}
                      </ul>

                      {!plan.current && (
                        <Button 
                          size="sm" 
                          variant={plan.name === "Enterprise" ? "outline" : "default"}
                          className="w-full"
                        >
                          {plan.name === "Enterprise" ? "Contact Sales" : "Upgrade"}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;