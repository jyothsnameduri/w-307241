import React from 'react';
import TicketStatsWidget from '@/components/dashboard/TicketStatsWidget';
import ActivityFeedWidget from '@/components/dashboard/ActivityFeedWidget';
import ChartWidget from '@/components/dashboard/ChartWidget';
import DashboardWidget from '@/components/dashboard/DashboardWidget';
import WidgetContainer from '@/components/dashboard/WidgetContainer';
import AIInsightsPanel from '@/components/dashboard/AIInsightsPanel';
import InteractiveChart from '@/components/dashboard/InteractiveChart';
import RealTimeMetrics from '@/components/dashboard/RealTimeMetrics';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, BookOpen, MessageSquare, HelpCircle, Brain, Target } from 'lucide-react';

const EmployeeDashboard = () => {
  const myTicketStats = {
    open: 3,
    inProgress: 2,
    resolved: 15,
    overdue: 1
  };

  const ticketTrendData = [
    { name: 'Mon', value: 2, category: 'IT' },
    { name: 'Tue', value: 1, category: 'HR' },
    { name: 'Wed', value: 3, category: 'IT' },
    { name: 'Thu', value: 2, category: 'General' },
    { name: 'Fri', value: 4, category: 'IT' },
    { name: 'Sat', value: 1, category: 'HR' },
    { name: 'Sun', value: 0, category: 'General' }
  ];

  const productivityData = [
    { name: 'Knowledge Base Usage', value: 85 },
    { name: 'Self-Resolution Rate', value: 65 },
    { name: 'Response Time', value: 78 },
    { name: 'Satisfaction Score', value: 92 }
  ];

  const myTickets = [
    { id: 'HD-001', title: 'Login issues with new system', status: 'Open', priority: 'High', updated: '2 hours ago' },
    { id: 'HD-003', title: 'Email not syncing properly', status: 'In Progress', priority: 'Medium', updated: '1 day ago' },
    { id: 'HD-005', title: 'Printer connection problem', status: 'Open', priority: 'Low', updated: '3 hours ago' }
  ];

  const quickHelp = [
    { title: 'How to reset password', category: 'Account', views: 1234 },
    { title: 'VPN setup guide', category: 'Network', views: 856 },
    { title: 'Email configuration', category: 'Email', views: 742 },
    { title: 'Software installation', category: 'Software', views: 623 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-frappe-dark">My Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your tickets and get personalized assistance</p>
        </div>
        <Button className="bg-frappe-primary hover:bg-frappe-primary/90 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Create Ticket
        </Button>
      </div>

      {/* Real-time Metrics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <RealTimeMetrics role="Employee" />
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Tickets Overview */}
        <div className="lg:col-span-2">
          <TicketStatsWidget title="My Tickets" stats={myTicketStats} />
        </div>

        {/* Quick Actions */}
        <WidgetContainer title="Quick Actions" onSettings={() => {}}>
          <div className="space-y-3">
            <Button className="w-full justify-start bg-frappe-primary hover:bg-frappe-primary/90 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create New Ticket
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <BookOpen className="h-4 w-4 mr-2" />
              Knowledge Base
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <MessageSquare className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <HelpCircle className="h-4 w-4 mr-2" />
              FAQ
            </Button>
          </div>
        </WidgetContainer>
      </div>

      {/* Analytics and Insights Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InteractiveChart 
          title="My Ticket Activity (This Week)" 
          type="area" 
          data={ticketTrendData} 
          dataKey="value" 
          xAxisKey="name"
          enableDrillDown={true}
          showTrend={true}
          onDrillDown={(dataPoint) => console.log('Drill down:', dataPoint)}
        />

        <InteractiveChart 
          title="Personal Productivity Metrics" 
          type="bar" 
          data={productivityData} 
          dataKey="value" 
          xAxisKey="name"
          colors={['#4C5BD4', '#28A745', '#FFC107', '#DC3545']}
          showTrend={true}
        />
      </div>

      {/* Smart Assistance and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI-Powered Smart Assistance */}
        <WidgetContainer title="Smart Assistance" aiInsights={true} onRefresh={() => {}}>
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <Brain className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-900">Quick Answer</span>
                <Badge className="bg-blue-100 text-blue-800 text-xs">92% confident</Badge>
              </div>
              <p className="text-sm text-blue-800">
                For password reset issues, try the self-service portal first. It resolves 90% of login problems instantly.
              </p>
              <Button size="sm" variant="outline" className="mt-2 text-blue-600 border-blue-600">
                Try Self-Service
              </Button>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Recommended Articles</h4>
              {[
                { title: 'VPN Setup Guide', relevance: 95, category: 'Network' },
                { title: 'Email Configuration', relevance: 87, category: 'Email' },
                { title: 'Software Installation', relevance: 78, category: 'Software' }
              ].map((article, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
                  <div>
                    <span className="text-sm font-medium">{article.title}</span>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">{article.category}</Badge>
                      <span className="text-xs text-gray-500">{article.relevance}% relevant</span>
                    </div>
                  </div>
                  <BookOpen className="h-4 w-4 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        </WidgetContainer>

        {/* Activity Feed */}
        <ActivityFeedWidget />
      </div>

      {/* AI Insights Panel */}
      <AIInsightsPanel role="Employee" />
    </div>
  );
};

export default EmployeeDashboard;
