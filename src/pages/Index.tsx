import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  RadarIcon, 
  TrendingUpIcon, 
  BrainIcon, 
  ZapIcon,
  CheckIcon,
  StarIcon,
  ArrowRightIcon
} from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  const features = [
    {
      icon: RadarIcon,
      title: "Real-time Problem Discovery",
      description: "Monitor Reddit, HackerNews, and forums 24/7 to catch emerging business problems as they surface."
    },
    {
      icon: BrainIcon,
      title: "AI-Powered Analysis",
      description: "Advanced AI evaluates urgency, sentiment, and business potential of every problem discovered."
    },
    {
      icon: TrendingUpIcon,
      title: "Market Opportunity Insights",
      description: "Identify trends and patterns in business problems before your competitors do."
    },
    {
      icon: ZapIcon,
      title: "Smart Alerts & Monitoring",
      description: "Set custom alerts for specific problem types, keywords, or market segments."
    }
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "/month",
      description: "Perfect for getting started",
      features: [
        "10 searches per day",
        "Basic problem discovery",
        "Limited AI analysis",
        "Email support"
      ],
      cta: "Get Started Free",
      featured: false
    },
    {
      name: "Pro",
      price: "$29",
      period: "/month",
      description: "For serious problem hunters",
      features: [
        "100 searches per day",
        "Advanced AI analysis",
        "10 custom alerts",
        "Priority support",
        "Export capabilities",
        "Trend analytics"
      ],
      cta: "Start Pro Trial",
      featured: true
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "/month",
      description: "For teams and agencies",
      features: [
        "Unlimited searches",
        "Full AI insights",
        "Unlimited alerts",
        "Team collaboration",
        "API access",
        "Custom integrations"
      ],
      cta: "Contact Sales",
      featured: false
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Startup Founder",
      content: "ProblemRadar helped me identify 3 major pain points in the SaaS space before building my product. We launched with perfect market fit.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Product Manager",
      content: "The AI analysis is incredibly accurate. We've found problems that led to 2 successful product launches in 6 months.",
      rating: 5
    },
    {
      name: "Emily Watson",
      role: "Business Consultant",
      content: "My clients love the insights from ProblemRadar. It's become an essential part of our market research process.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Business Intelligence Dashboard" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/60" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Discover Business Problems
              <span className="text-primary block">Before Your Competitors Do</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              AI-powered platform that monitors online channels to identify emerging business problems 
              and market opportunities in real-time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button variant="cta" size="xl">
                  Start Free Trial
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="xl">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Turn Online Discussions Into Business Opportunities
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI continuously monitors thousands of online sources to surface the problems 
              that could become your next big business opportunity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-muted-foreground">
              Start free and scale as you discover more opportunities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <Card 
                key={plan.name} 
                className={`relative ${plan.featured ? 'border-primary shadow-lg scale-105' : ''}`}
              >
                {plan.featured && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-success mr-3" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={plan.featured ? "default" : "outline"}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Trusted by Problem Hunters Worldwide
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name}>
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} className="h-5 w-5 text-warning fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                  <div>
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Discover Your Next Business Opportunity?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of entrepreneurs who use ProblemRadar to stay ahead of the market.
          </p>
          <Link to="/register">
            <Button variant="cta" size="xl">
              Start Your Free Trial Today
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <RadarIcon className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold">ProblemRadar AI</span>
            </div>
            <div className="text-muted-foreground text-sm">
              © 2024 ProblemRadar AI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
