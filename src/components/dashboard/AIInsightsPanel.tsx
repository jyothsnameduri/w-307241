
import React from 'react';
import WidgetContainer from './WidgetContainer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Lightbulb, 
  Target,
  Clock,
  Users,
  Zap
} from 'lucide-react';

interface AIInsight {
  id: string;
  type: 'pattern' | 'prediction' | 'recommendation' | 'alert' | 'optimization';
  title: string;
  description: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  actionable: boolean;
  priority: 'critical' | 'high' | 'medium' | 'low';
  estimatedSavings?: string;
  estimatedTime?: string;
}

interface AIInsightsPanelProps {
  insights?: AIInsight[];
  role?: 'Employee' | 'Agent' | 'Admin';
}

const AIInsightsPanel: React.FC<AIInsightsPanelProps> = ({ 
  insights = [], 
  role = 'Employee' 
}) => {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'pattern': return TrendingUp;
      case 'prediction': return Target;
      case 'recommendation': return Lightbulb;
      case 'alert': return AlertTriangle;
      case 'optimization': return Zap;
      default: return Brain;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'bg-green-100 text-green-800';
    if (confidence >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const roleSpecificInsights = [
    {
      id: '1',
      type: 'pattern',
      title: role === 'Employee' ? 'Your Peak Activity Hours' : role === 'Agent' ? 'Response Time Patterns' : 'System Load Patterns',
      description: role === 'Employee' 
        ? 'You typically create tickets between 9-11 AM. Consider preparing questions in advance.'
        : role === 'Agent'
        ? 'Your fastest responses are in the morning. Consider scheduling complex tasks then.'
        : 'Peak system load occurs at 10 AM and 2 PM. Consider load balancing.',
      confidence: 92,
      impact: 'medium',
      actionable: true,
      priority: 'medium'
    },
    {
      id: '2',
      type: 'recommendation',
      title: role === 'Employee' ? 'Self-Service Opportunities' : role === 'Agent' ? 'Knowledge Base Updates' : 'Process Optimization',
      description: role === 'Employee'
        ? '40% of your tickets could be resolved using our knowledge base. Try searching first.'
        : role === 'Agent' 
        ? 'Creating guides for top 5 issues could reduce workload by 30%.'
        : 'Implementing auto-routing could reduce response time by 25%.',
      confidence: 88,
      impact: 'high',
      actionable: true,
      priority: 'high',
      estimatedSavings: role === 'Admin' ? '$2,400/month' : undefined,
      estimatedTime: '15 min/ticket'
    },
    {
      id: '3',
      type: 'prediction',
      title: role === 'Employee' ? 'Upcoming IT Changes' : role === 'Agent' ? 'Workload Forecast' : 'Capacity Planning',
      description: role === 'Employee'
        ? 'System update next week may affect login process. Prepare alternative access.'
        : role === 'Agent'
        ? 'Expected 20% increase in tickets next week due to system updates.'
        : 'Need 2 additional agents to handle projected Q4 volume increase.',
      confidence: 76,
      impact: 'medium',
      actionable: false,
      priority: 'medium'
    }
  ];

  const allInsights = insights.length > 0 ? insights : roleSpecificInsights;

  return (
    <WidgetContainer 
      title="AI Insights & Recommendations" 
      aiInsights={true}
      onRefresh={() => {}}
      onExport={() => {}}
      onSettings={() => {}}
    >
      <div className="space-y-4">
        {allInsights.map((insight) => {
          const Icon = getInsightIcon(insight.type);
          return (
            <div key={insight.id} className="p-4 rounded-lg border border-gray-200 hover:border-frappe-primary/30 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-lg bg-frappe-primary/10">
                    <Icon className="h-4 w-4 text-frappe-primary" />
                  </div>
                  <h4 className="font-semibold text-frappe-dark text-sm">{insight.title}</h4>
                </div>
                <div className="flex space-x-1">
                  <Badge className={getConfidenceColor(insight.confidence)} size="sm">
                    {insight.confidence}%
                  </Badge>
                  <Badge className={getImpactColor(insight.impact)} size="sm">
                    {insight.impact}
                  </Badge>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex space-x-3 text-xs text-gray-500">
                  {insight.estimatedSavings && (
                    <div className="flex items-center space-x-1">
                      <Target className="h-3 w-3" />
                      <span>{insight.estimatedSavings}</span>
                    </div>
                  )}
                  {insight.estimatedTime && (
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{insight.estimatedTime}</span>
                    </div>
                  )}
                </div>
                
                {insight.actionable && (
                  <Button size="sm" variant="outline" className="text-frappe-primary border-frappe-primary">
                    Take Action
                  </Button>
                )}
              </div>
              
              <div className="mt-2">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Confidence</span>
                  <span>{insight.confidence}%</span>
                </div>
                <Progress value={insight.confidence} className="h-1" />
              </div>
            </div>
          );
        })}
        
        <div className="pt-3 border-t">
          <Button variant="outline" size="sm" className="w-full">
            <Brain className="h-4 w-4 mr-2" />
            View All AI Insights
          </Button>
        </div>
      </div>
    </WidgetContainer>
  );
};

export default AIInsightsPanel;
