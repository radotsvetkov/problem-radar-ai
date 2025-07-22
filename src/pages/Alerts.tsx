import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  PlusIcon, 
  BellIcon, 
  EditIcon, 
  TrashIcon,
  AlertCircleIcon,
  TagIcon
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Alert {
  id: string;
  name: string;
  keywords: string[];
  category?: string;
  platform?: string;
  frequency: 'instant' | 'daily' | 'weekly';
  is_active: boolean;
  created_at: string;
  matches_today: number;
}

const Alerts = () => {
  const { toast } = useToast();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      name: 'SaaS Pricing Problems',
      keywords: ['SaaS pricing', 'subscription cost', 'pricing model'],
      category: 'Business',
      platform: 'Reddit',
      frequency: 'daily',
      is_active: true,
      created_at: '2024-01-15T10:00:00Z',
      matches_today: 3
    },
    {
      id: '2',
      name: 'Remote Work Tools',
      keywords: ['remote work', 'team collaboration', 'productivity tools'],
      category: 'Productivity',
      frequency: 'instant',
      is_active: true,
      created_at: '2024-01-10T14:30:00Z',
      matches_today: 7
    },
    {
      id: '3',
      name: 'Email Marketing Issues',
      keywords: ['email marketing', 'newsletter', 'email automation'],
      category: 'Marketing',
      platform: 'HackerNews',
      frequency: 'weekly',
      is_active: false,
      created_at: '2024-01-05T09:15:00Z',
      matches_today: 0
    }
  ]);

  const [newAlert, setNewAlert] = useState<{
    name: string;
    keywords: string;
    category: string;
    platform: string;
    frequency: 'instant' | 'daily' | 'weekly';
  }>({
    name: '',
    keywords: '',
    category: '',
    platform: '',
    frequency: 'daily'
  });

  const handleCreateAlert = () => {
    if (!newAlert.name || !newAlert.keywords) {
      toast({
        title: "Error",
        description: "Please fill in the alert name and keywords",
        variant: "destructive"
      });
      return;
    }

    const alert: Alert = {
      id: Math.random().toString(36).substr(2, 9),
      name: newAlert.name,
      keywords: newAlert.keywords.split(',').map(k => k.trim()),
      category: newAlert.category || undefined,
      platform: newAlert.platform || undefined,
      frequency: newAlert.frequency,
      is_active: true,
      created_at: new Date().toISOString(),
      matches_today: 0
    };

    setAlerts([alert, ...alerts]);
    setNewAlert({ name: '', keywords: '', category: '', platform: '', frequency: 'daily' });
    setShowCreateForm(false);
    
    toast({
      title: "Alert created",
      description: "Your new alert is now active and monitoring for problems.",
    });
  };

  const toggleAlert = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, is_active: !alert.is_active } : alert
    ));
    
    const alert = alerts.find(a => a.id === id);
    toast({
      title: alert?.is_active ? "Alert disabled" : "Alert enabled",
      description: alert?.is_active ? "This alert will stop monitoring." : "This alert is now monitoring for problems.",
    });
  };

  const deleteAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
    toast({
      title: "Alert deleted",
      description: "The alert has been permanently removed.",
    });
  };

  const getFrequencyBadge = (frequency: string) => {
    const variants = {
      instant: 'success',
      daily: 'default',
      weekly: 'secondary'
    } as const;
    return variants[frequency as keyof typeof variants] || 'default';
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation isAuthenticated={true} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Alert Management
          </h1>
          <p className="text-muted-foreground">
            Set up custom alerts to monitor for specific business problems and opportunities
          </p>
        </div>

        {/* Create Alert Button */}
        <div className="mb-6">
          <Button onClick={() => setShowCreateForm(!showCreateForm)}>
            <PlusIcon className="h-4 w-4 mr-2" />
            Create New Alert
          </Button>
        </div>

        {/* Create Alert Form */}
        {showCreateForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Create New Alert</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="alertName">Alert Name</Label>
                <Input
                  id="alertName"
                  placeholder="e.g., SaaS Pricing Problems"
                  value={newAlert.name}
                  onChange={(e) => setNewAlert({ ...newAlert, name: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="keywords">Keywords (comma-separated)</Label>
                <Input
                  id="keywords"
                  placeholder="e.g., SaaS pricing, subscription cost, pricing model"
                  value={newAlert.keywords}
                  onChange={(e) => setNewAlert({ ...newAlert, keywords: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Category (Optional)</Label>
                  <Select value={newAlert.category} onValueChange={(value) => setNewAlert({ ...newAlert, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any category</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="Technical">Technical</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Productivity">Productivity</SelectItem>
                      <SelectItem value="Financial">Financial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Platform (Optional)</Label>
                  <Select value={newAlert.platform} onValueChange={(value) => setNewAlert({ ...newAlert, platform: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any platform</SelectItem>
                      <SelectItem value="Reddit">Reddit</SelectItem>
                      <SelectItem value="HackerNews">HackerNews</SelectItem>
                      <SelectItem value="Forums">Forums</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Frequency</Label>
                  <Select value={newAlert.frequency} onValueChange={(value) => setNewAlert({ ...newAlert, frequency: value as 'instant' | 'daily' | 'weekly' })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instant">Instant</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleCreateAlert}>
                  Create Alert
                </Button>
                <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Alerts List */}
        <div className="space-y-4">
          {alerts.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <BellIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No alerts created yet</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first alert to start monitoring for business problems
                </p>
                <Button onClick={() => setShowCreateForm(true)}>
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Create Your First Alert
                </Button>
              </CardContent>
            </Card>
          ) : (
            alerts.map((alert) => (
              <Card key={alert.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-semibold">{alert.name}</h3>
                        <Switch
                          checked={alert.is_active}
                          onCheckedChange={() => toggleAlert(alert.id)}
                        />
                        {alert.is_active && alert.matches_today > 0 && (
                          <Badge variant="success" className="flex items-center gap-1">
                            <AlertCircleIcon className="h-3 w-3" />
                            {alert.matches_today} matches today
                          </Badge>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant={getFrequencyBadge(alert.frequency)}>
                          {alert.frequency}
                        </Badge>
                        {alert.category && (
                          <Badge variant="outline">{alert.category}</Badge>
                        )}
                        {alert.platform && (
                          <Badge variant="outline">{alert.platform}</Badge>
                        )}
                        {!alert.is_active && (
                          <Badge variant="secondary">Inactive</Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        <TagIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Keywords:</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {alert.keywords.map((keyword, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>

                      <p className="text-xs text-muted-foreground">
                        Created {new Date(alert.created_at).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <EditIcon className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => deleteAlert(alert.id)}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Usage Information */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Alert Limits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  You have created {alerts.length} out of 10 allowed alerts on your Pro plan
                </p>
              </div>
              <Button variant="outline" size="sm">
                Upgrade Plan
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Alerts;