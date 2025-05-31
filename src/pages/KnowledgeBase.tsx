
import React, { useState } from 'react';
import { Search, BookOpen, Plus, TrendingUp, Lightbulb, Tag, Brain, Share, Star, Clock, Users, Filter, ArrowUp, MessageSquare, Eye, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const KnowledgeBase = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');

  const categories = [
    { id: 1, name: 'IT Support', count: 45, icon: '💻', trending: true },
    { id: 2, name: 'HR Policies', count: 23, icon: '👥', trending: false },
    { id: 3, name: 'Admin Procedures', count: 31, icon: '⚙️', trending: true },
    { id: 4, name: 'General FAQ', count: 67, icon: '❓', trending: false },
    { id: 5, name: 'Software Guides', count: 28, icon: '📱', trending: true },
    { id: 6, name: 'Security', count: 19, icon: '🔒', trending: false },
  ];

  const popularArticles = [
    { 
      id: 1, 
      title: 'How to Reset Your Password', 
      views: 1240, 
      category: 'IT Support', 
      rating: 4.8,
      aiConfidence: 95,
      lastUpdated: '2 days ago',
      author: 'IT Team',
      tags: ['password', 'login', 'security'],
      helpfulVotes: 89,
      readTime: '3 min'
    },
    { 
      id: 2, 
      title: 'Remote Work Policy Guidelines', 
      views: 890, 
      category: 'HR Policies', 
      rating: 4.6,
      aiConfidence: 88,
      lastUpdated: '1 week ago',
      author: 'HR Team',
      tags: ['remote', 'policy', 'guidelines'],
      helpfulVotes: 67,
      readTime: '5 min'
    },
    { 
      id: 3, 
      title: 'Expense Reporting Process', 
      views: 756, 
      category: 'Admin Procedures', 
      rating: 4.7,
      aiConfidence: 92,
      lastUpdated: '3 days ago',
      author: 'Finance Team',
      tags: ['expenses', 'reporting', 'finance'],
      helpfulVotes: 54,
      readTime: '4 min'
    },
    { 
      id: 4, 
      title: 'VPN Connection Setup', 
      views: 645, 
      category: 'IT Support', 
      rating: 4.5,
      aiConfidence: 96,
      lastUpdated: '1 day ago',
      author: 'IT Team',
      tags: ['vpn', 'network', 'connection'],
      helpfulVotes: 43,
      readTime: '6 min'
    },
  ];

  const aiSuggestions = [
    {
      id: 1,
      title: 'Printer Setup Guide',
      reason: 'Based on 15+ recent tickets',
      confidence: 87,
      priority: 'high',
      estimatedImpact: '30% ticket reduction'
    },
    {
      id: 2,
      title: 'Meeting Room Booking Process',
      reason: 'Trending searches this week',
      confidence: 75,
      priority: 'medium',
      estimatedImpact: '20% self-service increase'
    },
    {
      id: 3,
      title: 'Software License Management',
      reason: 'Department knowledge gap',
      confidence: 82,
      priority: 'high',
      estimatedImpact: '25% admin time saved'
    },
  ];

  const recentActivities = [
    { id: 1, type: 'article_created', title: 'New Email Security Guidelines', author: 'IT Team', time: '2 hours ago' },
    { id: 2, type: 'article_updated', title: 'Updated Travel Policy', author: 'HR Team', time: '1 day ago' },
    { id: 3, type: 'feedback', title: 'Positive feedback on VPN Guide', author: 'User', time: '3 hours ago' },
    { id: 4, type: 'ai_suggestion', title: 'AI suggested new content', author: 'System', time: '5 hours ago' },
  ];

  const searchSuggestions = [
    'password reset procedure',
    'vpn connection issues',
    'expense report submission',
    'remote work guidelines',
    'software installation guide'
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'article_created': return Plus;
      case 'article_updated': return Clock;
      case 'feedback': return MessageSquare;
      case 'ai_suggestion': return Brain;
      default: return BookOpen;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-frappe-dark flex items-center">
            <BookOpen className="h-8 w-8 mr-3 text-frappe-primary" />
            Knowledge Base
          </h1>
          <p className="text-gray-600 mt-1">Find answers, guides, and AI-powered assistance</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Brain className="h-4 w-4 mr-2" />
            AI Assistant
          </Button>
          <Button className="bg-frappe-primary hover:bg-frappe-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Create Article
          </Button>
        </div>
      </div>

      {/* Advanced Search Section */}
      <Card className="frappe-shadow">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Ask a question or search for articles..."
                className="pl-10 pr-4 py-3 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2" size="sm">
                <Brain className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="it">IT Support</SelectItem>
                    <SelectItem value="hr">HR Policies</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Quick searches:</span>
                {searchSuggestions.slice(0, 3).map((suggestion, index) => (
                  <Badge key={index} variant="outline" className="cursor-pointer hover:bg-frappe-primary hover:text-white">
                    {suggestion}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="browse" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="browse">Browse</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="ai-suggestions">AI Suggestions</TabsTrigger>
          <TabsTrigger value="recent">Recent Activity</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <Card key={category.id} className="frappe-shadow hover:frappe-shadow-md transition-shadow cursor-pointer relative">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-3xl">{category.icon}</div>
                    {category.trending && (
                      <Badge className="bg-orange-100 text-orange-800">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-semibold text-frappe-dark mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.count} articles</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="popular" className="space-y-4">
          {popularArticles.map((article) => (
            <Card key={article.id} className="frappe-shadow hover:frappe-shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-frappe-dark">{article.title}</h3>
                      <Badge className="bg-blue-100 text-blue-800">
                        <Brain className="h-3 w-3 mr-1" />
                        {article.aiConfidence}%
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {article.views} views
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {article.readTime}
                      </div>
                      <div className="flex items-center">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        {article.helpfulVotes}
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-500" />
                        {article.rating}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mb-3">
                      <Badge variant="outline">{article.category}</Badge>
                      {article.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Updated {article.lastUpdated} by {article.author}
                      </span>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Share className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                        <Button size="sm" className="bg-frappe-primary hover:bg-frappe-primary/90">
                          Read Article
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="ai-suggestions" className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Brain className="h-5 w-5 text-frappe-primary" />
            <h3 className="font-semibold text-frappe-dark">AI-Powered Content Suggestions</h3>
            <Badge className="bg-blue-100 text-blue-800">
              3 suggestions available
            </Badge>
          </div>
          
          {aiSuggestions.map((suggestion) => (
            <Card key={suggestion.id} className="frappe-shadow hover:frappe-shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold text-frappe-dark">{suggestion.title}</h4>
                      <Badge className={getPriorityColor(suggestion.priority)}>
                        {suggestion.priority} priority
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-3">{suggestion.reason}</p>
                    
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">AI Confidence:</span>
                        <Progress value={suggestion.confidence} className="w-20 h-2" />
                        <span className="text-sm font-medium">{suggestion.confidence}%</span>
                      </div>
                      <Badge variant="outline" className="text-green-700">
                        {suggestion.estimatedImpact}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button size="sm" className="bg-frappe-primary hover:bg-frappe-primary/90">
                    <Plus className="h-4 w-4 mr-1" />
                    Create Article
                  </Button>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    Dismiss
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Clock className="h-5 w-5 text-frappe-primary" />
            <h3 className="font-semibold text-frappe-dark">Recent Activity</h3>
          </div>

          {recentActivities.map((activity) => {
            const Icon = getActivityIcon(activity.type);
            return (
              <Card key={activity.id} className="frappe-shadow hover:frappe-shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-frappe-primary/10">
                      <Icon className="h-4 w-4 text-frappe-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-frappe-dark">{activity.title}</h4>
                      <p className="text-sm text-gray-500">by {activity.author} • {activity.time}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="frappe-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Articles</p>
                    <p className="text-2xl font-bold text-frappe-dark">213</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-frappe-primary" />
                </div>
                <Badge className="bg-green-100 text-green-800 mt-2">+12% this month</Badge>
              </CardContent>
            </Card>

            <Card className="frappe-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Monthly Views</p>
                    <p className="text-2xl font-bold text-frappe-dark">24.5K</p>
                  </div>
                  <Eye className="h-8 w-8 text-frappe-primary" />
                </div>
                <Badge className="bg-green-100 text-green-800 mt-2">+8% this month</Badge>
              </CardContent>
            </Card>

            <Card className="frappe-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">AI Accuracy</p>
                    <p className="text-2xl font-bold text-frappe-dark">92.3%</p>
                  </div>
                  <Brain className="h-8 w-8 text-frappe-primary" />
                </div>
                <Badge className="bg-green-100 text-green-800 mt-2">+3% this month</Badge>
              </CardContent>
            </Card>

            <Card className="frappe-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">User Satisfaction</p>
                    <p className="text-2xl font-bold text-frappe-dark">4.7/5</p>
                  </div>
                  <Star className="h-8 w-8 text-frappe-primary" />
                </div>
                <Badge className="bg-green-100 text-green-800 mt-2">+0.2 this month</Badge>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KnowledgeBase;
