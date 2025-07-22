export interface Problem {
  id: string;
  title: string;
  description: string;
  source_platform: 'Reddit' | 'HackerNews' | 'Forums';
  source_name: string; // e.g., "r/Entrepreneur", "HackerNews"
  category: 'Business' | 'Technical' | 'Marketing' | 'Productivity' | 'Financial';
  urgency_score: number; // 0-100
  sentiment: 'negative' | 'neutral' | 'positive';
  business_potential: number; // 0-100
  keywords: string[];
  upvotes: number;
  engagement_metrics: {
    comments: number;
    shares: number;
    views: number;
  };
  date_discovered: string;
  source_url: string;
  ai_analysis: {
    urgency_reasoning: string;
    market_opportunity: string;
    target_audience: string;
    potential_solutions: string[];
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  subscription_tier: 'Free' | 'Pro' | 'Enterprise';
  subscription_status: 'active' | 'inactive' | 'trial';
  usage_limits: {
    searches_per_day: number;
    alerts_count: number;
  };
  created_at: string;
}

export interface Alert {
  id: string;
  user_id: string;
  keywords: string[];
  category?: string;
  platform?: string;
  frequency: 'instant' | 'daily' | 'weekly';
  is_active: boolean;
  created_at: string;
}

export interface DashboardMetrics {
  new_problems_today: number;
  high_urgency_issues: number;
  trending_categories: { category: string; count: number }[];
  problem_trends: { date: string; count: number }[];
  category_distribution: { category: string; count: number }[];
}