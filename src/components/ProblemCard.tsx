import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Problem } from "@/types";
import { ExternalLinkIcon, ArrowUpIcon, MessageCircleIcon, EyeIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface ProblemCardProps {
  problem: Problem;
}

export const ProblemCard = ({ problem }: ProblemCardProps) => {
  const getUrgencyBadgeVariant = (score: number) => {
    if (score >= 80) return "urgency-high";
    if (score >= 60) return "urgency-medium";
    return "urgency-low";
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">
              <Link 
                to={`/problem/${problem.id}`}
                className="hover:text-primary transition-colors"
              >
                {problem.title}
              </Link>
            </CardTitle>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="outline">{problem.source_name}</Badge>
              <Badge>{problem.category}</Badge>
              <Badge variant={getUrgencyBadgeVariant(problem.urgency_score)}>
                {problem.urgency_score}% Urgent
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {problem.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <ArrowUpIcon className="h-4 w-4" />
              {problem.upvotes}
            </div>
            <div className="flex items-center gap-1">
              <MessageCircleIcon className="h-4 w-4" />
              {problem.engagement_metrics.comments}
            </div>
            <div className="flex items-center gap-1">
              <EyeIcon className="h-4 w-4" />
              {problem.engagement_metrics.views}
            </div>
          </div>
          <span className={getSentimentColor(problem.sentiment)}>
            {problem.sentiment}
          </span>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {problem.keywords.slice(0, 4).map((keyword) => (
            <Badge key={keyword} variant="secondary" className="text-xs">
              {keyword}
            </Badge>
          ))}
          {problem.keywords.length > 4 && (
            <Badge variant="secondary" className="text-xs">
              +{problem.keywords.length - 4} more
            </Badge>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Business Potential: <span className="font-medium">{problem.business_potential}%</span>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <a href={problem.source_url} target="_blank" rel="noopener noreferrer">
              <ExternalLinkIcon className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};