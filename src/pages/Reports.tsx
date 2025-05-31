
import React, { useState } from 'react';
import { BarChart, Download, Filter, Calendar, Users, Target, TrendingUp, PieChart, Brain, Shield, Database, Zap, Settings, ArrowUp, ArrowDown, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import ChartWidget from '@/components/dashboard/ChartWidget';
import InteractiveChart from '@/components/dashboard/InteractiveChart';

const Reports = () => {
  const [dateRange, setDateRange] = useState('last-30-days');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [reportType, setReportType] = useState('overview');

  const reportCategories = [
    { id: 'performance', name: 'Performance Reports', count: 12, icon: TrendingUp, aiEnhanced: true },
    { id: 'tickets', name: 'Ticket Analytics', count: 8, icon: BarChart, aiEnhanced: true },
    { id: 'agents', name: 'Agent Reports', count: 6, icon: Users, aiEnhanced: false },
    { id: 'satisfaction', name: 'Satisfaction', count: 4, icon: Target, aiEnhanced: true },
    { id: 'ai-insights', name: 'AI Insights', count: 10, icon: Brain, aiEnhanced: true },
    { id: 'security', name: 'Security Reports', count: 5, icon: Shield, aiEnhanced: false },
  ];

  const prebuiltReports = [
    {
      id: 1,
      name: 'AI-Enhanced Performance Dashboard',
      description: 'Comprehensive performance analysis with predictive insights and optimization recommendations',
      category: 'performance',
      lastRun: '2 hours ago',
      schedule: 'Real-time',
      format: ['PDF', 'Excel', 'Dashboard'],
      aiFeatures: ['Predictive Analytics', 'Anomaly Detection', 'Recommendations'],
      popularity: 95,
      accuracy: 92
    },
    {
      id: 2,
      name: 'Intelligent Ticket Volume Forecasting',
      description: 'ML-powered ticket volume predictions with resource planning recommendations',
      category: 'tickets',
      lastRun: '1 hour ago',
      schedule: 'Daily',
      format: ['PDF', 'Dashboard', 'API'],
      aiFeatures: ['Volume Prediction', 'Seasonality Analysis', 'Resource Planning'],
      popularity: 88,
      accuracy: 89
    },
    {
      id: 3,
      name: 'Customer Satisfaction Predictor',
      description: 'Real-time CSAT prediction with intervention recommendations',
      category: 'satisfaction',
      lastRun: '30 minutes ago',
      schedule: 'Real-time',
      format: ['Dashboard', 'Alerts', 'API'],
      aiFeatures: ['Sentiment Analysis', 'Churn Prediction', 'Intervention Triggers'],
      popularity: 92,
      accuracy: 87
    },
    {
      id: 4,
      name: 'Automated SLA Compliance Monitor',
      description: 'Intelligent SLA monitoring with breach prediction and escalation automation',
      category: 'performance',
      lastRun: '15 minutes ago',
      schedule: 'Real-time',
      format: ['Dashboard', 'Alerts', 'Email'],
      aiFeatures: ['Breach Prediction', 'Auto-escalation', 'Performance Optimization'],
      popularity: 85,
      accuracy: 94
    }
  ];

  const aiInsights = [
    {
      id: 1,
      type: 'pattern',
      title: 'Peak Hours Optimization Opportunity',
      description: 'AI detected 23% efficiency improvement possible by redistributing workload during 10-11 AM peak',
      confidence: 94,
      impact: 'high',
      category: 'performance',
      estimatedSavings: '$3,200/month',
      actionRequired: true
    },
    {
      id: 2,
      type: 'prediction',
      title: 'Ticket Volume Spike Predicted',
      description: 'ML model predicts 35% increase in IT tickets next week due to system update deployment',
      confidence: 87,
      impact: 'medium',
      category: 'capacity',
      estimatedSavings: 'Resource planning',
      actionRequired: true
    },
    {
      id: 3,
      type: 'anomaly',
      title: 'Unusual Response Time Pattern',
      description: 'Anomaly detection identified 40% increase in response times for Agent Smith in Network category',
      confidence: 91,
      impact: 'medium',
      category: 'performance',
      estimatedSavings: 'Quality improvement',
      actionRequired: false
    }
  ];

  const kpiMetrics = [
    { 
      name: 'Total Tickets', 
      value: '2,847', 
      change: '+12%', 
      trend: 'up',
      aiPrediction: '3,200 next month',
      confidence: 89
    },
    { 
      name: 'Resolution Rate', 
      value: '94.2%', 
      change: '+3.1%', 
      trend: 'up',
      aiPrediction: '95.8% achievable',
      confidence: 92
    },
    { 
      name: 'Avg Response Time', 
      value: '2.4h', 
      change: '-18%', 
      trend: 'down',
      aiPrediction: '1.8h possible',
      confidence: 85
    },
    { 
      name: 'CSAT Score', 
      value: '4.6/5', 
      change: '+0.2', 
      trend: 'up',
      aiPrediction: '4.8/5 target',
      confidence: 88
    },
  ];

  const predictiveData = [
    { name: 'Jan', actual: 245, predicted: 242, confidence: 95 },
    { name: 'Feb', actual: 267, predicted: 265, confidence: 93 },
    { name: 'Mar', actual: 289, predicted: 285, confidence: 91 },
    { name: 'Apr', actual: 312, predicted: 315, confidence: 89 },
    { name: 'May', actual: 298, predicted: 302, confidence: 92 },
    { name: 'Jun', actual: null, predicted: 334, confidence: 87 },
    { name: 'Jul', actual: null, predicted: 356, confidence: 84 },
  ];

  const aiPerformanceData = [
    { name: 'Auto-routing', accuracy: 94, usage: 78, impact: 'high' },
    { name: 'Response Suggestions', accuracy: 87, usage: 65, impact: 'medium' },
    { name: 'Sentiment Analysis', accuracy: 91, usage: 82, impact: 'high' },
    { name: 'Escalation Prediction', accuracy: 89, usage: 54, impact: 'medium' },
  ];

  const systemHealth = [
    { metric: 'AI Model Performance', value: 94, status: 'excellent', trend: 'up' },
    { metric: 'Data Quality Score', value: 88, status: 'good', trend: 'stable' },
    { metric: 'Integration Health', value: 96, status: 'excellent', trend: 'up' },
    { metric: 'Response Latency', value: 92, status: 'good', trend: 'down' },
  ];

  const getCategoryIcon = (category: string) => {
    const icons = {
      performance: TrendingUp,
      tickets: BarChart,
      agents: Users,
      satisfaction: Target,
      'ai-insights': Brain,
      security: Shield,
    };
    return icons[category as keyof typeof icons] || BarChart;
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'pattern': return TrendingUp;
      case 'prediction': return Target;
      case 'anomaly': return AlertTriangle;
      default: return Brain;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-frappe-dark flex items-center">
            <BarChart className="h-8 w-8 mr-3 text-frappe-primary" />
            Advanced Analytics & AI Insights
          </h1>
          <p className="text-gray-600 mt-1">Comprehensive reporting with AI-powered insights and predictions</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Brain className="h-4 w-4 mr-2" />
            AI Assistant
          </Button>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
          <Button className="bg-frappe-primary hover:bg-frappe-primary/90">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Enhanced Filters */}
      <Card className="frappe-shadow">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-7-days">Last 7 days</SelectItem>
                  <SelectItem value="last-30-days">Last 30 days</SelectItem>
                  <SelectItem value="last-90-days">Last 90 days</SelectItem>
                  <SelectItem value="custom">Custom range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-gray-500" />
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="it">IT Support</SelectItem>
                  <SelectItem value="hr">Human Resources</SelectItem>
                  <SelectItem value="admin">Administration</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Brain className="h-4 w-4 text-gray-500" />
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="overview">Overview</SelectItem>
                  <SelectItem value="predictive">Predictive</SelectItem>
                  <SelectItem value="ai-enhanced">AI Enhanced</SelectItem>
                  <SelectItem value="real-time">Real-time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced KPI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiMetrics.map((metric, index) => (
          <Card key={index} className="frappe-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm text-gray-600">{metric.name}</p>
                  <p className="text-2xl font-bold text-frappe-dark">{metric.value}</p>
                </div>
                <Badge className={metric.trend === 'up' ? 'bg-green-100 text-green-800' : metric.trend === 'down' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}>
                  {metric.change}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">AI Prediction:</span>
                  <span className="font-medium">{metric.aiPrediction}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={metric.confidence} className="flex-1 h-2" />
                  <span className="text-xs text-gray-500">{metric.confidence}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="ai-insights" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
          <TabsTrigger value="predictive">Predictive</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="real-time">Real-time</TabsTrigger>
          <TabsTrigger value="system">System Health</TabsTrigger>
          <TabsTrigger value="custom">Custom</TabsTrigger>
        </TabsList>

        <TabsContent value="ai-insights" className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-frappe-primary" />
              <h3 className="text-lg font-semibold text-frappe-dark">AI-Powered Insights</h3>
              <Badge className="bg-blue-100 text-blue-800">
                {aiInsights.length} insights available
              </Badge>
            </div>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Configure AI Models
            </Button>
          </div>

          {aiInsights.map((insight) => {
            const Icon = getInsightIcon(insight.type);
            return (
              <Card key={insight.id} className="frappe-shadow hover:frappe-shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-frappe-primary/10">
                        <Icon className="h-5 w-5 text-frappe-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-frappe-dark">{insight.title}</h4>
                        <p className="text-gray-600 mt-1">{insight.description}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Badge className="bg-blue-100 text-blue-800">
                        {insight.confidence}% confident
                      </Badge>
                      <Badge className={insight.impact === 'high' ? 'bg-red-100 text-red-800' : insight.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}>
                        {insight.impact} impact
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Category: {insight.category}</span>
                      <span>Savings: {insight.estimatedSavings}</span>
                    </div>
                    <div className="flex space-x-2">
                      {insight.actionRequired && (
                        <Button size="sm" className="bg-frappe-primary hover:bg-frappe-primary/90">
                          Take Action
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="predictive" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <InteractiveChart
              title="Ticket Volume Prediction"
              type="line"
              data={predictiveData}
              dataKey="predicted"
              xAxisKey="name"
              showTrend={true}
              colors={['#4C5BD4', '#28A745']}
            />
            
            <Card className="frappe-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-frappe-primary" />
                  AI Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {aiPerformanceData.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{item.name}</span>
                      <Badge className={item.impact === 'high' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                        {item.impact} impact
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Accuracy</span>
                          <span>{item.accuracy}%</span>
                        </div>
                        <Progress value={item.accuracy} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Usage</span>
                          <span>{item.usage}%</span>
                        </div>
                        <Progress value={item.usage} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {reportCategories.map((category) => {
              const Icon = getCategoryIcon(category.id);
              return (
                <Card key={category.id} className="frappe-shadow hover:frappe-shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center relative">
                    {category.aiEnhanced && (
                      <Badge className="absolute top-2 right-2 bg-purple-100 text-purple-800">
                        <Brain className="h-3 w-3 mr-1" />
                        AI
                      </Badge>
                    )}
                    <Icon className="h-8 w-8 mx-auto mb-3 text-frappe-primary" />
                    <h3 className="font-semibold text-frappe-dark mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.count} reports</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {prebuiltReports.map((report) => (
            <Card key={report.id} className="frappe-shadow hover:frappe-shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold text-frappe-dark">{report.name}</h4>
                      <Badge className="bg-purple-100 text-purple-800">
                        <Brain className="h-3 w-3 mr-1" />
                        AI Enhanced
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-3">{report.description}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <span>Last run: {report.lastRun}</span>
                      <span>Schedule: {report.schedule}</span>
                      <span>Popularity: {report.popularity}%</span>
                      <span>Accuracy: {report.accuracy}%</span>
                    </div>

                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-sm text-gray-500">AI Features:</span>
                      {report.aiFeatures.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Badge variant="outline">{report.category}</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    {report.format.map((format) => (
                      <Badge key={format} variant="outline" className="text-xs">
                        {format}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    <Button size="sm" className="bg-frappe-primary hover:bg-frappe-primary/90">
                      Run Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <div className="flex items-center space-x-2 mb-4">
            <Database className="h-6 w-6 text-frappe-primary" />
            <h3 className="text-lg font-semibold text-frappe-dark">System Health & Performance</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {systemHealth.map((item, index) => (
              <Card key={index} className="frappe-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-frappe-dark">{item.metric}</h4>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-medium ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                      {item.trend === 'up' ? (
                        <ArrowUp className="h-4 w-4 text-green-600" />
                      ) : item.trend === 'down' ? (
                        <ArrowDown className="h-4 w-4 text-red-600" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-frappe-dark">{item.value}%</span>
                      <Badge className={item.status === 'excellent' ? 'bg-green-100 text-green-800' : item.status === 'good' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}>
                        {item.status}
                      </Badge>
                    </div>
                    <Progress value={item.value} className="h-3" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="custom" className="space-y-6">
          <Card className="frappe-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="h-5 w-5 mr-2 text-frappe-primary" />
                AI-Powered Report Builder
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center py-12">
                <Brain className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Build Custom Reports with AI</h3>
                <p className="text-gray-500 mb-4">Create tailored reports with drag-and-drop interface and AI-powered insights</p>
                <div className="flex justify-center space-x-2">
                  <Button className="bg-frappe-primary hover:bg-frappe-primary/90">
                    <Brain className="h-4 w-4 mr-2" />
                    Launch AI Builder
                  </Button>
                  <Button variant="outline">
                    <PieChart className="h-4 w-4 mr-2" />
                    Traditional Builder
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
