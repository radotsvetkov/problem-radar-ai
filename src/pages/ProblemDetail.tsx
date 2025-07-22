import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeftIcon,
  ExternalLinkIcon,
  ArrowUpIcon,
  MessageCircleIcon,
  EyeIcon,
  CalendarIcon,
  BrainIcon,
  TrendingUpIcon,
  UsersIcon,
  LightbulbIcon,
  BookmarkIcon
} from "lucide-react";
import { mockProblems } from "@/lib/mockData";
import { useParams, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ProblemDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const problem = mockProblems.find(p => p.id === id);

  if (!problem) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation isAuthenticated={true} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardContent className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">Problem Not Found</h2>
              <p className="text-muted-foreground mb-4">
                The problem you're looking for doesn't exist or has been removed.
              </p>
              <Link to="/search">
                <Button>Back to Search</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const getUrgencyBadgeVariant = (score: number) => {
    if (score >= 80) return "urgency-high";
    if (score >= 60) return "urgency-medium";
    return "urgency-low";
  };

  const handleSaveToFavorites = () => {
    toast({
      title: "Saved to favorites",
      description: "This problem has been added to your favorites list.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation isAuthenticated={true} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/search">
            <Button variant="ghost" className="mb-4">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Search
            </Button>
          </Link>
        </div>

        {/* Problem Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-2xl mb-4">{problem.title}</CardTitle>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">{problem.source_name}</Badge>
                  <Badge>{problem.category}</Badge>
                  <Badge variant={getUrgencyBadgeVariant(problem.urgency_score)}>
                    {problem.urgency_score}% Urgent
                  </Badge>
                  <Badge variant="secondary" className="capitalize">
                    {problem.sentiment}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleSaveToFavorites}>
                  <BookmarkIcon className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href={problem.source_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLinkIcon className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <ArrowUpIcon className="h-4 w-4 text-muted-foreground" />
                <span>{problem.upvotes} upvotes</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MessageCircleIcon className="h-4 w-4 text-muted-foreground" />
                <span>{problem.engagement_metrics.comments} comments</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <EyeIcon className="h-4 w-4 text-muted-foreground" />
                <span>{problem.engagement_metrics.views} views</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <span>{new Date(problem.date_discovered).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="text-lg leading-relaxed text-foreground">
              {problem.description}
            </div>
          </CardContent>
        </Card>

        {/* AI Analysis */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BrainIcon className="h-5 w-5" />
              AI Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <TrendingUpIcon className="h-4 w-4" />
                Urgency Assessment
              </h4>
              <p className="text-muted-foreground">{problem.ai_analysis.urgency_reasoning}</p>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <TrendingUpIcon className="h-4 w-4" />
                Market Opportunity
              </h4>
              <p className="text-muted-foreground">{problem.ai_analysis.market_opportunity}</p>
              <div className="mt-2">
                <Badge variant="outline">
                  Business Potential: {problem.business_potential}%
                </Badge>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <UsersIcon className="h-4 w-4" />
                Target Audience
              </h4>
              <p className="text-muted-foreground">{problem.ai_analysis.target_audience}</p>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <LightbulbIcon className="h-4 w-4" />
                Potential Solutions
              </h4>
              <ul className="space-y-2">
                {problem.ai_analysis.potential_solutions.map((solution, index) => (
                  <li key={index} className="flex items-start gap-2 text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    {solution}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Keywords */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Keywords & Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {problem.keywords.map((keyword) => (
                <Badge key={keyword} variant="secondary">
                  {keyword}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Related Problems */}
        <Card>
          <CardHeader>
            <CardTitle>Related Problems</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockProblems
                .filter(p => p.id !== problem.id && p.category === problem.category)
                .slice(0, 3)
                .map((relatedProblem) => (
                  <div key={relatedProblem.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <Link to={`/problem/${relatedProblem.id}`} className="block">
                      <h4 className="font-medium mb-2 hover:text-primary transition-colors">
                        {relatedProblem.title}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Badge variant="outline" className="text-xs">
                          {relatedProblem.source_name}
                        </Badge>
                        <Badge variant={getUrgencyBadgeVariant(relatedProblem.urgency_score)} className="text-xs">
                          {relatedProblem.urgency_score}% Urgent
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {relatedProblem.description}
                      </p>
                    </Link>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProblemDetail;