import { Navigation } from "@/components/Navigation";
import { ProblemCard } from "@/components/ProblemCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  SearchIcon, 
  FilterIcon, 
  SortAscIcon,
  CalendarIcon,
  TagIcon
} from "lucide-react";
import { mockProblems } from "@/lib/mockData";
import { useState } from "react";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [selectedUrgency, setSelectedUrgency] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const categories = ["all", "Business", "Technical", "Marketing", "Productivity", "Financial"];
  const platforms = ["all", "Reddit", "HackerNews", "Forums"];
  const urgencyLevels = ["all", "high", "medium", "low"];
  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "urgency", label: "Highest Urgency" },
    { value: "engagement", label: "Most Engagement" },
    { value: "potential", label: "Business Potential" }
  ];

  // Filter and sort problems based on current selections
  const filteredProblems = mockProblems.filter(problem => {
    const matchesSearch = searchQuery === "" || 
      problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || problem.category === selectedCategory;
    const matchesPlatform = selectedPlatform === "all" || problem.source_platform === selectedPlatform;
    
    let matchesUrgency = true;
    if (selectedUrgency === "high") matchesUrgency = problem.urgency_score >= 80;
    else if (selectedUrgency === "medium") matchesUrgency = problem.urgency_score >= 60 && problem.urgency_score < 80;
    else if (selectedUrgency === "low") matchesUrgency = problem.urgency_score < 60;

    return matchesSearch && matchesCategory && matchesPlatform && matchesUrgency;
  }).sort((a, b) => {
    switch (sortBy) {
      case "urgency":
        return b.urgency_score - a.urgency_score;
      case "engagement":
        return b.upvotes - a.upvotes;
      case "potential":
        return b.business_potential - a.business_potential;
      default: // newest
        return new Date(b.date_discovered).getTime() - new Date(a.date_discovered).getTime();
    }
  });

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedPlatform("all");
    setSelectedUrgency("all");
    setSortBy("newest");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation isAuthenticated={true} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Search Business Problems
          </h1>
          <p className="text-muted-foreground">
            Discover emerging problems and market opportunities across platforms
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SearchIcon className="h-5 w-5" />
              Search & Filter
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for business problems, pain points, keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Platform</label>
                <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {platforms.map(platform => (
                      <SelectItem key={platform} value={platform}>
                        {platform === "all" ? "All Platforms" : platform}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Urgency Level</label>
                <Select value={selectedUrgency} onValueChange={setSelectedUrgency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {urgencyLevels.map(level => (
                      <SelectItem key={level} value={level}>
                        {level === "all" ? "All Levels" : `${level.charAt(0).toUpperCase() + level.slice(1)} Urgency`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active Filters & Actions */}
            <div className="flex flex-wrap items-center gap-2">
              {searchQuery && (
                <Badge variant="secondary">
                  <SearchIcon className="h-3 w-3 mr-1" />
                  "{searchQuery}"
                </Badge>
              )}
              {selectedCategory !== "all" && (
                <Badge variant="secondary">
                  <TagIcon className="h-3 w-3 mr-1" />
                  {selectedCategory}
                </Badge>
              )}
              {selectedPlatform !== "all" && (
                <Badge variant="secondary">
                  <FilterIcon className="h-3 w-3 mr-1" />
                  {selectedPlatform}
                </Badge>
              )}
              {selectedUrgency !== "all" && (
                <Badge variant="secondary">
                  <CalendarIcon className="h-3 w-3 mr-1" />
                  {selectedUrgency} urgency
                </Badge>
              )}
              {(searchQuery || selectedCategory !== "all" || selectedPlatform !== "all" || selectedUrgency !== "all") && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              {filteredProblems.length} Problem{filteredProblems.length !== 1 ? 's' : ''} Found
            </h2>
            <div className="flex items-center gap-2">
              <SortAscIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Sorted by {sortOptions.find(opt => opt.value === sortBy)?.label}
              </span>
            </div>
          </div>
        </div>

        {/* Problems Grid */}
        {filteredProblems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredProblems.map((problem) => (
              <ProblemCard key={problem.id} problem={problem} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <SearchIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No problems found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or clearing some filters
              </p>
              <Button onClick={clearFilters}>Clear All Filters</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Search;