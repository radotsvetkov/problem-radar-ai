import { Problem, User, DashboardMetrics } from '@/types';

export const mockProblems: Problem[] = [
  {
    id: '1',
    title: 'Struggling to find affordable CRM for small business',
    description: 'I run a small consulting business with 5 employees and we\'re drowning in spreadsheets. Every CRM I\'ve looked at is either too expensive ($50+ per user/month) or way too complex for our needs. We just need basic contact management, deal tracking, and simple automation. Anyone found something that works for small teams without breaking the bank?',
    source_platform: 'Reddit',
    source_name: 'r/smallbusiness',
    category: 'Business',
    urgency_score: 85,
    sentiment: 'negative',
    business_potential: 90,
    keywords: ['CRM', 'small business', 'affordable', 'contact management', 'deal tracking'],
    upvotes: 342,
    engagement_metrics: {
      comments: 89,
      shares: 23,
      views: 2150
    },
    date_discovered: '2024-01-22T10:30:00Z',
    source_url: 'https://reddit.com/r/smallbusiness/example1',
    ai_analysis: {
      urgency_reasoning: 'High urgency due to operational pain and direct impact on business efficiency. Multiple users expressing similar frustrations.',
      market_opportunity: 'Significant gap in affordable, simple CRM solutions for small businesses. Potential market size of 30M+ small businesses globally.',
      target_audience: 'Small business owners (2-10 employees), consultants, service providers',
      potential_solutions: ['Simplified CRM with tiered pricing', 'Industry-specific CRM solutions', 'Free tier with premium features']
    }
  },
  {
    id: '2',
    title: 'Project management tools are too complex for our team',
    description: 'We\'ve tried Asana, Monday, Notion, and ClickUp but they\'re all overkill for our 8-person startup. We spend more time configuring these tools than actually using them. We need something dead simple - just tasks, deadlines, and who\'s working on what. Why is everything so bloated nowadays?',
    source_platform: 'Reddit',
    source_name: 'r/Entrepreneur',
    category: 'Productivity',
    urgency_score: 70,
    sentiment: 'negative',
    business_potential: 85,
    keywords: ['project management', 'simple', 'startup', 'tasks', 'deadlines'],
    upvotes: 278,
    engagement_metrics: {
      comments: 156,
      shares: 45,
      views: 3420
    },
    date_discovered: '2024-01-21T14:15:00Z',
    source_url: 'https://reddit.com/r/entrepreneur/example2',
    ai_analysis: {
      urgency_reasoning: 'Medium-high urgency as team productivity is being hindered by tool complexity.',
      market_opportunity: 'Clear demand for simplified project management tools. Current solutions are over-engineered for small teams.',
      target_audience: 'Small startups, creative agencies, remote teams under 15 people',
      potential_solutions: ['Minimalist task management app', 'One-click setup project tools', 'Template-based project management']
    }
  },
  {
    id: '3',
    title: 'Email marketing platforms are too expensive for agencies',
    description: 'Running a digital marketing agency and client email costs are killing our margins. Mailchimp wants $300+/month for our client volume, ConvertKit is similar. We need white-label email marketing that we can resell to clients without the crazy per-contact pricing. Building in-house seems like the only option.',
    source_platform: 'Reddit',
    source_name: 'r/marketing',
    category: 'Marketing',
    urgency_score: 90,
    sentiment: 'negative',
    business_potential: 95,
    keywords: ['email marketing', 'white-label', 'agency', 'expensive', 'margins'],
    upvotes: 456,
    engagement_metrics: {
      comments: 234,
      shares: 67,
      views: 5680
    },
    date_discovered: '2024-01-20T09:45:00Z',
    source_url: 'https://reddit.com/r/marketing/example3',
    ai_analysis: {
      urgency_reasoning: 'Very high urgency - directly impacting agency profitability and client relationships.',
      market_opportunity: 'Huge opportunity in white-label email marketing for agencies. Current pricing models don\'t work for resellers.',
      target_audience: 'Digital marketing agencies, consultants, white-label service providers',
      potential_solutions: ['White-label email platform with flat pricing', 'Agency-specific email tools', 'Multi-tenant email infrastructure']
    }
  },
  {
    id: '4',
    title: 'Need better time tracking for freelancers',
    description: 'Toggl is decent but lacks good invoicing integration. Harvest is expensive for what it offers. FreshBooks time tracking is clunky. I need something that accurately tracks time, integrates with invoicing, and doesn\'t cost $30/month for a single freelancer. The current options feel designed for teams, not solo workers.',
    source_platform: 'HackerNews',
    source_name: 'HackerNews',
    category: 'Productivity',
    urgency_score: 65,
    sentiment: 'negative',
    business_potential: 75,
    keywords: ['time tracking', 'freelancer', 'invoicing', 'solo worker', 'integration'],
    upvotes: 189,
    engagement_metrics: {
      comments: 67,
      shares: 12,
      views: 1890
    },
    date_discovered: '2024-01-19T16:20:00Z',
    source_url: 'https://news.ycombinator.com/example4',
    ai_analysis: {
      urgency_reasoning: 'Medium urgency - affects freelancer productivity and billing accuracy.',
      market_opportunity: 'Growing freelancer market needs specialized tools. Current solutions are team-focused.',
      target_audience: 'Solo freelancers, consultants, independent contractors',
      potential_solutions: ['Freelancer-specific time tracking', 'All-in-one freelancer suite', 'Micro-business productivity tools']
    }
  },
  {
    id: '5',
    title: 'Customer support tools missing AI automation',
    description: 'Our support team is overwhelmed with repetitive questions. Zendesk has basic automation but no real AI. Intercom\'s AI is overpriced. We need something that can handle 70% of common questions automatically and only escalate complex issues to humans. Current tools feel like they\'re stuck in 2015.',
    source_platform: 'Reddit',
    source_name: 'r/CustomerSuccess',
    category: 'Business',
    urgency_score: 80,
    sentiment: 'negative',
    business_potential: 88,
    keywords: ['customer support', 'AI automation', 'repetitive questions', 'escalation'],
    upvotes: 312,
    engagement_metrics: {
      comments: 98,
      shares: 34,
      views: 2780
    },
    date_discovered: '2024-01-18T11:10:00Z',
    source_url: 'https://reddit.com/r/customersuccess/example5',
    ai_analysis: {
      urgency_reasoning: 'High urgency due to team burnout and customer satisfaction impact.',
      market_opportunity: 'AI-powered customer support is a rapidly growing market with clear demand.',
      target_audience: 'SMBs with growing support volumes, e-commerce companies, SaaS startups',
      potential_solutions: ['AI-first support platform', 'Smart ticket routing', 'Automated response generation']
    }
  }
];

export const mockUser: User = {
  id: '1',
  email: 'user@example.com',
  name: 'Alex Johnson',
  subscription_tier: 'Pro',
  subscription_status: 'active',
  usage_limits: {
    searches_per_day: 100,
    alerts_count: 10
  },
  created_at: '2024-01-01T00:00:00Z'
};

export const mockDashboardMetrics: DashboardMetrics = {
  new_problems_today: 23,
  high_urgency_issues: 8,
  trending_categories: [
    { category: 'Business', count: 45 },
    { category: 'Marketing', count: 32 },
    { category: 'Productivity', count: 28 },
    { category: 'Technical', count: 19 },
    { category: 'Financial', count: 12 }
  ],
  problem_trends: [
    { date: '2024-01-15', count: 12 },
    { date: '2024-01-16', count: 18 },
    { date: '2024-01-17', count: 15 },
    { date: '2024-01-18', count: 22 },
    { date: '2024-01-19', count: 19 },
    { date: '2024-01-20', count: 28 },
    { date: '2024-01-21', count: 25 },
    { date: '2024-01-22', count: 23 }
  ],
  category_distribution: [
    { category: 'Business', count: 45 },
    { category: 'Marketing', count: 32 },
    { category: 'Productivity', count: 28 },
    { category: 'Technical', count: 19 },
    { category: 'Financial', count: 12 }
  ]
};