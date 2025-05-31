
import React, { useState, useEffect } from 'react';
import WidgetContainer from './WidgetContainer';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  Users, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Timer,
  Target
} from 'lucide-react';

interface MetricData {
  label: string;
  value: number;
  target?: number;
  unit?: string;
  trend?: number;
  status?: 'good' | 'warning' | 'critical';
  icon: React.ElementType;
}

interface RealTimeMetricsProps {
  role?: 'Employee' | 'Agent' | 'Admin';
  updateInterval?: number;
}

const RealTimeMetrics: React.FC<RealTimeMetricsProps> = ({ 
  role = 'Employee', 
  updateInterval = 30000 
}) => {
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, updateInterval);

    return () => clearInterval(interval);
  }, [updateInterval]);

  const getMetricsForRole = (): MetricData[] => {
    switch (role) {
      case 'Employee':
        return [
          {
            label: 'My Open Tickets',
            value: 3,
            icon: Activity,
            trend: -1,
            status: 'good'
          },
          {
            label: 'Avg Response Time',
            value: 2.4,
            target: 2.0,
            unit: 'hours',
            icon: Clock,
            trend: -5,
            status: 'warning'
          },
          {
            label: 'Resolved This Week',
            value: 8,
            target: 10,
            icon: CheckCircle,
            trend: 15,
            status: 'good'
          },
          {
            label: 'Knowledge Base Views',
            value: 12,
            icon: TrendingUp,
            trend: 25,
            status: 'good'
          }
        ];
      
      case 'Agent':
        return [
          {
            label: 'Active Tickets',
            value: 15,
            target: 20,
            icon: Activity,
            trend: 5,
            status: 'good'
          },
          {
            label: 'Avg Response Time',
            value: 1.8,
            target: 2.0,
            unit: 'hours',
            icon: Timer,
            trend: -12,
            status: 'good'
          },
          {
            label: 'Resolution Rate',
            value: 87,
            target: 85,
            unit: '%',
            icon: Target,
            trend: 3,
            status: 'good'
          },
          {
            label: 'Customer Satisfaction',
            value: 4.6,
            target: 4.5,
            unit: '/5.0',
            icon: TrendingUp,
            trend: 2,
            status: 'good'
          }
        ];
      
      case 'Admin':
        return [
          {
            label: 'System Load',
            value: 68,
            target: 80,
            unit: '%',
            icon: Activity,
            trend: -5,
            status: 'good'
          },
          {
            label: 'Active Users',
            value: 234,
            icon: Users,
            trend: 8,
            status: 'good'
          },
          {
            label: 'Avg Resolution Time',
            value: 4.2,
            target: 4.0,
            unit: 'hours',
            icon: Clock,
            trend: -8,
            status: 'warning'
          },
          {
            label: 'SLA Compliance',
            value: 94,
            target: 95,
            unit: '%',
            icon: Target,
            trend: -2,
            status: 'warning'
          }
        ];
      
      default:
        return [];
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'good': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTrendColor = (trend?: number) => {
    if (!trend) return 'text-gray-500';
    return trend > 0 ? 'text-green-600' : 'text-red-600';
  };

  const metrics = getMetricsForRole();

  return (
    <WidgetContainer 
      title="Real-Time Metrics"
      onRefresh={() => setLastUpdate(new Date())}
      lastUpdated={lastUpdate.toLocaleTimeString()}
    >
      <div className="space-y-4">
        {/* Live Status Indicator */}
        <div className="flex items-center space-x-2 pb-3 border-b">
          <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
          <span className="text-sm text-gray-600">
            {isLive ? 'Live Updates' : 'Offline'}
          </span>
          <Badge variant="outline" className="text-xs ml-auto">
            Updated {Math.floor((Date.now() - lastUpdate.getTime()) / 1000)}s ago
          </Badge>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            const progressValue = metric.target ? (metric.value / metric.target) * 100 : 0;
            
            return (
              <div key={index} className="p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Icon className={`h-4 w-4 ${getStatusColor(metric.status)}`} />
                    <span className="text-sm font-medium text-gray-700">{metric.label}</span>
                  </div>
                  {metric.trend && (
                    <Badge className={`text-xs ${metric.trend > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {metric.trend > 0 ? '+' : ''}{metric.trend}%
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-baseline space-x-1 mb-2">
                  <span className="text-xl font-bold text-frappe-dark">{metric.value}</span>
                  {metric.unit && (
                    <span className="text-sm text-gray-500">{metric.unit}</span>
                  )}
                  {metric.target && (
                    <span className="text-xs text-gray-400 ml-2">
                      / {metric.target}{metric.unit}
                    </span>
                  )}
                </div>
                
                {metric.target && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Progress</span>
                      <span>{Math.round(progressValue)}%</span>
                    </div>
                    <Progress 
                      value={progressValue} 
                      className="h-2"
                      style={{ 
                        backgroundColor: progressValue >= 100 ? '#10B981' : progressValue >= 80 ? '#F59E0B' : '#EF4444' 
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </WidgetContainer>
  );
};

export default RealTimeMetrics;
