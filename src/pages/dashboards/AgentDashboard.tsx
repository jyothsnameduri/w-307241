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
import { Progress } from '@/components/ui/progress';
import { Target, Clock, TrendingUp, Users, MessageSquare, Brain, Zap, AlertTriangle } from 'lucide-react';

const AgentDashboard = () => {
  const myWorkloadStats = {
    open: 12,
    inProgress: 8,
    resolved: 45,
    overdue: 3
  };

  const performanceData = [
    { name: 'Mon', value: 8, resolved: 8, assigned: 10, responseTime: 2.1 },
    { name: 'Tue', value: 12, resolved: 12, assigned: 14, responseTime: 1.8 },
    { name: 'Wed', value: 10, resolved: 10, assigned: 12, responseTime: 2.3 },
    { name: 'Thu', value: 15, resolved: 15, assigned: 16, responseTime: 1.6 },
    { name: 'Fri', value: 9, resolved: 9, assigned: 11, responseTime: 2.0 },
  ];

  const categoryDistribution = [
    { name: 'IT Issues', value: 45 },
    { name: 'HR Requests', value: 25 },
    { name: 'General Support', value: 20 },
    { name: 'Admin Tasks', value: 10 }
  ];

  const responseTimeData = [
    { name: 'Last Week', value: 2.8 },
    { name: 'This Week', value: 2.4 },
    { name: 'Target', value: 2.0 },
  ];

  const urgentTickets = [
    { id: 'HD-012', title: 'Server downtime affecting production', assignee: 'Me', created: '30 mins ago', priority: 'Critical', aiSuggestion: 'Check server logs first' },
    { id: 'HD-013', title: 'Database connection timeout', assignee: 'Me', created: '1 hour ago', priority: 'High', aiSuggestion: 'Similar to HD-008' },
    { id: 'HD-014', title: 'Email server configuration error', assignee: 'Unassigned', created: '2 hours ago', priority: 'High', aiSuggestion: 'Restart email service' },
  ];

  const aiSuggestions = [
    { ticket: 'HD-015', suggestion: 'Similar to HD-008. Try restarting the email service.', confidence: 92, impact: 'High' },
    { ticket: 'HD-016', suggestion: 'User needs password reset. Direct to self-service portal.', confidence: 87, impact: 'Medium' },
    { ticket: 'HD-017', suggestion: 'Hardware issue. Escalate to IT hardware team.', confidence: 78, impact: 'Low' },
  ];

  const todayTargets = {
    ticketsToResolve: 12,
    ticketsResolved: 8,
    avgResponseTime: '2.4h',
    targetResponseTime: '2.0h',
    customerSatisfaction: 4.6
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-frappe-dark">Agent Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor your workload and performance metrics</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Brain className="h-4 w-4 mr-2" />
            AI Assist
          </Button>
          <Button className="bg-frappe-primary hover:bg-frappe-primary/90 text-white">
            <MessageSquare className="h-4 w-4 mr-2" />
            Quick Reply
          </Button>
        </div>
      </div>

      {/* Real-time Performance Metrics */}
      <RealTimeMetrics role="Agent" />

      {/* Today's Performance Overview */}
      <WidgetContainer title="Today's Performance" trend="up" onRefresh={() => {}}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 rounded-lg bg-blue-50">
            <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">8/12</div>
            <div className="text-sm text-gray-600">Tickets Resolved</div>
            <Progress value={67} className="mt-2" />
          </div>
          <div className="text-center p-4 rounded-lg bg-green-50">
            <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">1.8h</div>
            <div className="text-sm text-gray-600">Avg Response Time</div>
            <div className="text-xs text-green-600 mt-1">↓ 15% better</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-yellow-50">
            <Users className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-600">4.7/5.0</div>
            <div className="text-sm text-gray-600">Customer Satisfaction</div>
            <div className="text-xs text-green-600 mt-1">↗ +0.1 from yesterday</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-purple-50">
            <Zap className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">94%</div>
            <div className="text-sm text-gray-600">AI Accuracy</div>
            <div className="text-xs text-green-600 mt-1">↗ +2% this week</div>
          </div>
        </div>
      </WidgetContainer>

      {/* Workload and Urgent Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TicketStatsWidget title="My Assigned Tickets" stats={myWorkloadStats} />
        </div>

        {/* Enhanced Urgent Queue */}
        <WidgetContainer title="Urgent Queue" alertCount={3} onRefresh={() => {}}>
          <div className="space-y-3">
            {[
              { id: 'HD-012', title: 'Server downtime affecting production', priority: 'Critical', created: '30 mins ago', aiSuggestion: 'Check server logs first' },
              { id: 'HD-013', title: 'Database connection timeout', priority: 'High', created: '1 hour ago', aiSuggestion: 'Similar to HD-008' },
              { id: 'HD-014', title: 'Email server configuration error', priority: 'High', created: '2 hours ago', aiSuggestion: 'Restart email service' }
            ].map((ticket) => (
              <div key={ticket.id} className="p-3 rounded-lg border border-red-200 bg-red-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-frappe-primary">{ticket.id}</span>
                  <Badge className="bg-red-100 text-red-800">{ticket.priority}</Badge>
                </div>
                <h4 className="font-medium text-frappe-dark text-sm mb-1">{ticket.title}</h4>
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>{ticket.created}</span>
                </div>
                {ticket.aiSuggestion && (
                  <div className="flex items-center space-x-1 text-xs text-blue-600 mb-2">
                    <Brain className="h-3 w-3" />
                    <span>{ticket.aiSuggestion}</span>
                  </div>
                )}
                <Button size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white">
                  Handle Now
                </Button>
              </div>
            ))}
          </div>
        </WidgetContainer>
      </div>

      {/* Advanced Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InteractiveChart 
          title="Resolution Performance Trend" 
          type="line" 
          data={performanceData} 
          dataKey="resolved" 
          xAxisKey="name"
          enableDrillDown={true}
          showTrend={true}
        />

        <InteractiveChart 
          title="Ticket Category Distribution" 
          type="pie" 
          data={categoryDistribution} 
          dataKey="value" 
          xAxisKey="name"
          enableDrillDown={true}
        />
      </div>

      {/* AI-Enhanced Workload Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WidgetContainer title="AI Response Suggestions" aiInsights={true} onRefresh={() => {}}>
          <div className="space-y-3">
            {[
              { ticket: 'HD-015', suggestion: 'Similar to HD-008. Try restarting the email service.', confidence: 92, impact: 'High' },
              { ticket: 'HD-016', suggestion: 'User needs password reset. Direct to self-service portal.', confidence: 87, impact: 'Medium' },
              { ticket: 'HD-017', suggestion: 'Hardware issue. Escalate to IT hardware team.', confidence: 78, impact: 'Low' }
            ].map((suggestion, index) => (
              <div key={index} className="p-3 rounded-lg border border-blue-200 bg-blue-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-frappe-primary">{suggestion.ticket}</span>
                  <div className="flex space-x-1">
                    <Badge className="bg-blue-100 text-blue-800 text-xs">{suggestion.confidence}%</Badge>
                    <Badge className={`text-xs ${suggestion.impact === 'High' ? 'bg-red-100 text-red-800' : suggestion.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                      {suggestion.impact}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-2">{suggestion.suggestion}</p>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="text-xs text-blue-600 border-blue-600">
                    Use Suggestion
                  </Button>
                  <Button size="sm" variant="ghost" className="text-xs">
                    Dismiss
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </WidgetContainer>

        <ActivityFeedWidget />
      </div>

      {/* Comprehensive AI Insights */}
      <AIInsightsPanel role="Agent" />
    </div>
  );
};

export default AgentDashboard;
