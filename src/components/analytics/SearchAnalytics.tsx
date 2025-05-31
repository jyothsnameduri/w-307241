
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  TrendingUp, 
  Eye, 
  Brain, 
  Target, 
  Users, 
  BookOpen, 
  Clock,
  Filter,
  Download,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

const SearchAnalytics = () => {
  const [timeRange, setTimeRange] = useState('last-30-days');
  const [searchType, setSearchType] = useState('all');

  const searchMetrics = [
    { name: 'Total Searches', value: '15.2K', change: '+18%', trend: 'up' },
    { name: 'Success Rate', value: '87.3%', change: '+5.2%', trend: 'up' },
    { name: 'Avg Result Clicks', value: '2.4', change: '-0.3', trend: 'down' },
    { name: 'Zero Results', value: '8.7%', change: '-2.1%', trend: 'down' },
  ];

  const topSearchQueries = [
    { 
      query: 'password reset', 
      searches: 1240, 
      success_rate: 94, 
      avg_position: 1.2, 
      trend: 'up',
      ai_enhanced: true 
    },
    { 
      query: 'vpn setup', 
      searches: 890, 
      success_rate: 89, 
      avg_position: 1.8, 
      trend: 'stable',
      ai_enhanced: true 
    },
    { 
      query: 'expense report', 
      searches: 756, 
      success_rate: 92, 
      avg_position: 1.4, 
      trend: 'up',
      ai_enhanced: false 
    },
    { 
      query: 'remote work policy', 
      searches: 645, 
      success_rate: 85, 
      avg_position: 2.1, 
      trend: 'down',
      ai_enhanced: true 
    },
    { 
      query: 'software installation', 
      searches: 523, 
      success_rate: 78, 
      avg_position: 2.8, 
      trend: 'up',
      ai_enhanced: false 
    },
  ];

  const failedSearches = [
    { 
      query: 'printer config', 
      searches: 156, 
      suggested_content: 'Printer Setup Guide', 
      priority: 'high',
      estimated_impact: '25% reduction in tickets'
    },
    { 
      query: 'meeting room booking', 
      searches: 134, 
      suggested_content: 'Room Reservation Process', 
      priority: 'medium',
      estimated_impact: '15% self-service increase'
    },
    { 
      query: 'license renewal', 
      searches: 98, 
      suggested_content: 'Software License Management', 
      priority: 'medium',
      estimated_impact: '20% admin time saved'
    },
  ];

  const aiInsights = [
    {
      type: 'opportunity',
      title: 'Content Gap Identified',
      description: 'AI detected 15+ searches for "mobile device setup" with no relevant results',
      confidence: 92,
      action: 'Create content'
    },
    {
      type: 'optimization',
      title: 'Search Query Expansion',
      description: 'Implementing synonyms for "password" could improve results by 23%',
      confidence: 87,
      action: 'Update search config'
    },
    {
      type: 'trend',
      title: 'Emerging Search Pattern',
      description: 'Security-related searches increased 45% this month',
      confidence: 95,
      action: 'Monitor trend'
    },
  ];

  const searchTrends = [
    { month: 'Jan', searches: 12400, success_rate: 82 },
    { month: 'Feb', searches: 13200, success_rate: 84 },
    { month: 'Mar', searches: 14100, success_rate: 86 },
    { month: 'Apr', searches: 14800, success_rate: 87 },
    { month: 'May', searches: 15200, success_rate: 87 },
  ];

  const userBehavior = [
    { metric: 'Avg. Session Duration', value: '4:32', change: '+12%' },
    { metric: 'Pages per Session', value: '3.2', change: '+8%' },
    { metric: 'Bounce Rate', value: '34%', change: '-15%' },
    { metric: 'Return Visitors', value: '67%', change: '+5%' },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return Target;
      case 'optimization': return TrendingUp;
      case 'trend': return Eye;
      default: return Brain;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-frappe-dark flex items-center">
            <Search className="h-7 w-7 mr-3 text-frappe-primary" />
            Search Analytics & Intelligence
          </h2>
          <p className="text-gray-600 mt-1">Analyze search behavior and optimize content discovery</p>
        </div>
        <div className="flex space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-7-days">Last 7 days</SelectItem>
              <SelectItem value="last-30-days">Last 30 days</SelectItem>
              <SelectItem value="last-90-days">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
          <Button className="bg-frappe-primary hover:bg-frappe-primary/90">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {searchMetrics.map((metric, index) => (
          <Card key={index} className="frappe-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{metric.name}</p>
                  <p className="text-2xl font-bold text-frappe-dark">{metric.value}</p>
                </div>
                <div className="flex items-center space-x-1">
                  {metric.trend === 'up' ? (
                    <ArrowUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <ArrowDown className="h-4 w-4 text-red-600" />
                  )}
                  <Badge className={metric.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {metric.change}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="queries" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="queries">Top Queries</TabsTrigger>
          <TabsTrigger value="failed">Failed Searches</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="behavior">User Behavior</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="queries" className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-frappe-dark">Top Search Queries</h3>
            <Select value={searchType} onValueChange={setSearchType}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Queries</SelectItem>
                <SelectItem value="successful">Successful</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {topSearchQueries.map((query, index) => (
            <Card key={index} className="frappe-shadow hover:frappe-shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl font-bold text-frappe-primary">#{index + 1}</div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-frappe-dark">"{query.query}"</h4>
                        {query.ai_enhanced && (
                          <Badge className="bg-purple-100 text-purple-800">
                            <Brain className="h-3 w-3 mr-1" />
                            AI Enhanced
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{query.searches} searches this month</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {query.trend === 'up' ? (
                      <ArrowUp className="h-4 w-4 text-green-600" />
                    ) : query.trend === 'down' ? (
                      <ArrowDown className="h-4 w-4 text-red-600" />
                    ) : (
                      <div className="h-4 w-4" />
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-500">Success Rate</span>
                      <span className="font-medium">{query.success_rate}%</span>
                    </div>
                    <Progress value={query.success_rate} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-500">Avg. Position</span>
                      <span className="font-medium">{query.avg_position}</span>
                    </div>
                    <Progress value={Math.max(0, 100 - (query.avg_position - 1) * 25)} className="h-2" />
                  </div>
                  <div className="flex items-center justify-center">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="failed" className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Target className="h-6 w-6 text-frappe-primary" />
            <h3 className="text-lg font-semibold text-frappe-dark">Content Opportunities</h3>
            <Badge className="bg-blue-100 text-blue-800">
              {failedSearches.length} opportunities
            </Badge>
          </div>

          {failedSearches.map((search, index) => (
            <Card key={index} className="frappe-shadow hover:frappe-shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold text-frappe-dark">"{search.query}"</h4>
                      <Badge className={getPriorityColor(search.priority)}>
                        {search.priority} priority
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-2">
                      <span className="font-medium">{search.searches}</span> failed searches
                    </p>
                    <p className="text-sm text-gray-500">
                      Suggested content: <span className="font-medium">{search.suggested_content}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-green-700">
                    {search.estimated_impact}
                  </Badge>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      View Searches
                    </Button>
                    <Button size="sm" className="bg-frappe-primary hover:bg-frappe-primary/90">
                      Create Content
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Brain className="h-6 w-6 text-frappe-primary" />
            <h3 className="text-lg font-semibold text-frappe-dark">AI-Powered Search Insights</h3>
          </div>

          {aiInsights.map((insight, index) => {
            const Icon = getInsightIcon(insight.type);
            return (
              <Card key={index} className="frappe-shadow hover:frappe-shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-frappe-primary/10">
                        <Icon className="h-5 w-5 text-frappe-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-frappe-dark">{insight.title}</h4>
                        <p className="text-gray-600 mt-1">{insight.description}</p>
                      </div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">
                      {insight.confidence}% confidence
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="capitalize">
                      {insight.type}
                    </Badge>
                    <Button size="sm" className="bg-frappe-primary hover:bg-frappe-primary/90">
                      {insight.action}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="behavior" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {userBehavior.map((behavior, index) => (
              <Card key={index} className="frappe-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{behavior.metric}</p>
                      <p className="text-2xl font-bold text-frappe-dark">{behavior.value}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      {behavior.change}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card className="frappe-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-frappe-primary" />
                Search Volume & Success Rate Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <TrendingUp className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <p>Interactive chart would be displayed here</p>
                  <p className="text-sm">Showing search trends over time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SearchAnalytics;
