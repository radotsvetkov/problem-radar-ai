import { Navigation } from "@/components/Navigation";
import { MetricCard } from "@/components/MetricCard";
import { ProblemCard } from "@/components/ProblemCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUpIcon, 
  AlertTriangleIcon, 
  TargetIcon,
  PlusIcon,
  BarChart3Icon,
  LineChartIcon
} from "lucide-react";
import { mockDashboardMetrics, mockProblems, mockUser } from "@/lib/mockData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const recentProblems = mockProblems.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navigation isAuthenticated={true} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {mockUser.name}! 👋
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening in the problem discovery world today.
          </p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MetricCard
            title="New Problems Today"
            value={mockDashboardMetrics.new_problems_today}
            description="Discovered in the last 24 hours"
            icon={TrendingUpIcon}
            trend={{ value: 12, isPositive: true }}
          />
          <MetricCard
            title="High Urgency Issues"
            value={mockDashboardMetrics.high_urgency_issues}
            description="Requiring immediate attention"
            icon={AlertTriangleIcon}
            trend={{ value: 8, isPositive: false }}
          />
          <MetricCard
            title="Trending Categories"
            value={mockDashboardMetrics.trending_categories[0]?.category || 'Business'}
            description={`${mockDashboardMetrics.trending_categories[0]?.count || 0} problems this week`}
            icon={TargetIcon}
            trend={{ value: 25, isPositive: true }}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Problem Trends Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChartIcon className="h-5 w-5" />
                Problem Discovery Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockDashboardMetrics.problem_trends}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="date" 
                    className="text-muted-foreground"
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <YAxis className="text-muted-foreground" />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3Icon className="h-5 w-5" />
                Category Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockDashboardMetrics.category_distribution}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="category" 
                    className="text-muted-foreground"
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis className="text-muted-foreground" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar 
                    dataKey="count" 
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="hero">
              <PlusIcon className="h-4 w-4 mr-2" />
              Create New Alert
            </Button>
            <Button variant="outline">
              Search Problems
            </Button>
            <Button variant="outline">
              Export Data
            </Button>
          </div>
        </div>

        {/* Recent Problems */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Recent High-Priority Problems</h2>
            <Button variant="ghost">View All</Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {recentProblems.map((problem) => (
              <ProblemCard key={problem.id} problem={problem} />
            ))}
          </div>
        </div>

        {/* Subscription Status */}
        <Card>
          <CardHeader>
            <CardTitle>Your Subscription</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Badge variant="default" className="text-sm px-3 py-1">
                  {mockUser.subscription_tier} Plan
                </Badge>
                <div className="text-sm text-muted-foreground">
                  {mockUser.usage_limits.searches_per_day - 23} searches remaining today
                </div>
              </div>
              <Button variant="outline">Manage Subscription</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;