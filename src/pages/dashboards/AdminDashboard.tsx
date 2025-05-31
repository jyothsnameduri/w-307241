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
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  Clock, 
  DollarSign,
  Server,
  Brain,
  Target,
  Zap
} from 'lucide-react';

const AdminDashboard = () => {
  const systemStats = {
    open: 156,
    inProgress: 89,
    resolved: 1247,
    overdue: 23
  };

  const departmentData = [
    { name: 'IT', tickets: 89, resolved: 67 },
    { name: 'HR', tickets: 45, resolved: 38 },
    { name: 'Admin', tickets: 32, resolved: 28 },
    { name: 'General', tickets: 78, resolved: 65 },
  ];

  const volumeTrendData = [
    { name: 'Jan', tickets: 145, resolved: 132 },
    { name: 'Feb', tickets: 167, resolved: 154 },
    { name: 'Mar', tickets: 189, resolved: 178 },
    { name: 'Apr', tickets: 234, resolved: 221 },
    { name: 'May', tickets: 198, resolved: 189 },
    { name: 'Jun', tickets: 213, resolved: 205 },
  ];

  const agentPerformance = [
    { name: 'Sarah Wilson', resolved: 45, satisfaction: 4.8, responseTime: 1.8 },
    { name: 'Mike Johnson', resolved: 38, satisfaction: 4.6, responseTime: 2.1 },
    { name: 'John Doe', resolved: 32, satisfaction: 4.5, responseTime: 2.3 },
    { name: 'Jane Smith', resolved: 29, satisfaction: 4.7, responseTime: 1.9 },
  ];

  const systemHealth = {
    cpuUsage: 68,
    memoryUsage: 74,
    diskUsage: 45,
    activeUsers: 234,
    avgResponseTime: 1.2,
    uptime: 99.8
  };

  const costAnalysis = {
    totalCost: 45780,
    costPerTicket: 29.50,
    aiSavings: 12340,
    efficiencyGain: 23
  };

  const predictiveData = [
    { name: 'Current Week', tickets: 245, predicted: 245, accuracy: 98 },
    { name: 'Next Week', tickets: 0, predicted: 267, accuracy: 85 },
    { name: 'Week +2', tickets: 0, predicted: 289, accuracy: 78 },
    { name: 'Week +3', tickets: 0, predicted: 301, accuracy: 72 }
  ];

  const departmentEfficiency = [
    { name: 'IT', efficiency: 87, cost: 12500, satisfaction: 4.6 },
    { name: 'HR', efficiency: 92, cost: 8900, satisfaction: 4.8 },
    { name: 'Admin', efficiency: 85, cost: 6700, satisfaction: 4.5 },
    { name: 'General', efficiency: 78, cost: 9800, satisfaction: 4.3 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-frappe-dark">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">System overview and strategic analytics</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-frappe-primary hover:bg-frappe-primary/90 text-white">
            <Server className="h-4 w-4 mr-2" />
            System Settings
          </Button>
        </div>
      </div>

      {/* Real-time System Metrics */}
      <RealTimeMetrics role="Admin" />

      {/* Strategic KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <WidgetContainer title="System Health" className="text-center">
          <div className="space-y-2">
            <Server className="h-8 w-8 text-green-600 mx-auto" />
            <div className="text-2xl font-bold text-green-600">99.8%</div>
            <div className="text-sm text-gray-600">Uptime</div>
            <Progress value={99.8} className="h-2" />
          </div>
        </WidgetContainer>

        <WidgetContainer title="Active Users" className="text-center">
          <div className="space-y-2">
            <Users className="h-8 w-8 text-blue-600 mx-auto" />
            <div className="text-2xl font-bold text-blue-600">234</div>
            <div className="text-sm text-gray-600">Currently Online</div>
            <div className="text-xs text-green-600">↗ +15% from yesterday</div>
          </div>
        </WidgetContainer>

        <WidgetContainer title="Avg Response" className="text-center">
          <div className="space-y-2">
            <Clock className="h-8 w-8 text-yellow-600 mx-auto" />
            <div className="text-2xl font-bold text-yellow-600">1.2h</div>
            <div className="text-sm text-gray-600">Response Time</div>
            <div className="text-xs text-green-600">↓ -12% improvement</div>
          </div>
        </WidgetContainer>

        <WidgetContainer title="AI Efficiency" className="text-center">
          <div className="space-y-2">
            <Brain className="h-8 w-8 text-purple-600 mx-auto" />
            <div className="text-2xl font-bold text-purple-600">94%</div>
            <div className="text-sm text-gray-600">AI Accuracy</div>
            <div className="text-xs text-green-600">+2% this month</div>
          </div>
        </WidgetContainer>

        <WidgetContainer title="Cost Savings" className="text-center">
          <div className="space-y-2">
            <DollarSign className="h-8 w-8 text-green-600 mx-auto" />
            <div className="text-2xl font-bold text-green-600">$12.3K</div>
            <div className="text-sm text-gray-600">This Month</div>
            <div className="text-xs text-green-600">+23% efficiency</div>
          </div>
        </WidgetContainer>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TicketStatsWidget title="System-wide Tickets" stats={systemStats} showActions={false} />
        </div>

        {/* System Resources with AI Monitoring */}
        <WidgetContainer title="System Resources" aiInsights={true} alertCount={1}>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>CPU Usage</span>
                <span>68%</span>
              </div>
              <Progress value={68} className="h-2" />
              <div className="text-xs text-gray-500 mt-1">AI Optimization: -12% vs last month</div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Memory Usage</span>
                <span>74%</span>
              </div>
              <Progress value={74} className="h-2" />
              <div className="text-xs text-yellow-600 mt-1">AI Alert: Consider scaling</div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Disk Usage</span>
                <span>45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
          </div>
        </WidgetContainer>
      </div>

      {/* Advanced Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InteractiveChart 
          title="Predictive Ticket Volume Analysis" 
          type="area" 
          data={predictiveData} 
          dataKey="predicted" 
          xAxisKey="name"
          enableDrillDown={true}
          showTrend={true}
          colors={['#8B5CF6', '#06B6D4']}
        />

        <InteractiveChart 
          title="Department Efficiency Matrix" 
          type="bar" 
          data={departmentEfficiency} 
          dataKey="efficiency" 
          xAxisKey="name"
          enableDrillDown={true}
          showTrend={true}
        />
      </div>

      {/* Operational Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WidgetContainer title="AI-Powered Insights" aiInsights={true}>
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-900">Pattern Detection</span>
                <Badge className="bg-blue-100 text-blue-800 text-xs">98% confident</Badge>
              </div>
              <p className="text-sm text-blue-800 mb-2">
                IT department shows 15% increase in password reset requests. Suggest implementing SSO.
              </p>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="text-blue-600 border-blue-600">
                  Implement SSO
                </Button>
                <Badge className="bg-green-100 text-green-800 text-xs">Est. $3.2K/month savings</Badge>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <span className="font-medium text-yellow-900">Capacity Alert</span>
                <Badge className="bg-yellow-100 text-yellow-800 text-xs">Action needed</Badge>
              </div>
              <p className="text-sm text-yellow-800">
                Projected 25% volume increase next month. Consider adding 2 agents.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-green-50 border border-green-200">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-900">Optimization Success</span>
                <Badge className="bg-green-100 text-green-800 text-xs">Completed</Badge>
              </div>
              <p className="text-sm text-green-800">
                AI routing reduced average response time by 23% this month.
              </p>
            </div>
          </div>
        </WidgetContainer>

        {/* Activity Feed */}
        <ActivityFeedWidget />
      </div>

      {/* Comprehensive AI Strategic Insights */}
      <AIInsightsPanel role="Admin" />
    </div>
  );
};

export default AdminDashboard;
