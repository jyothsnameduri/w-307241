
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MoreHorizontal, 
  Maximize2, 
  Download, 
  Settings, 
  Grip,
  RefreshCw,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface WidgetContainerProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  isDraggable?: boolean;
  isLoading?: boolean;
  lastUpdated?: string;
  aiInsights?: boolean;
  trend?: 'up' | 'down' | 'stable';
  alertCount?: number;
  onRefresh?: () => void;
  onExpand?: () => void;
  onExport?: () => void;
  onSettings?: () => void;
}

const WidgetContainer: React.FC<WidgetContainerProps> = ({
  title,
  children,
  className,
  isDraggable = false,
  isLoading = false,
  lastUpdated,
  aiInsights = false,
  trend,
  alertCount,
  onRefresh,
  onExpand,
  onExport,
  onSettings
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getTrendColor = (trend?: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-500';
    }
  };

  return (
    <Card 
      className={cn(
        "bg-white frappe-shadow hover:frappe-shadow-md transition-all duration-200 relative",
        isDraggable && "cursor-move",
        isHovered && "ring-2 ring-frappe-primary/20",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isDraggable && (
        <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Grip className="h-4 w-4 text-gray-400" />
        </div>
      )}
      
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div className="flex items-center space-x-2">
          <CardTitle className="text-lg font-semibold text-frappe-dark">
            {title}
          </CardTitle>
          {aiInsights && (
            <Badge className="bg-blue-100 text-blue-800 text-xs">
              AI Enhanced
            </Badge>
          )}
          {trend && (
            <TrendingUp className={cn("h-4 w-4", getTrendColor(trend))} />
          )}
          {alertCount && alertCount > 0 && (
            <Badge className="bg-red-100 text-red-800 text-xs">
              {alertCount} alerts
            </Badge>
          )}
        </div>
        
        <div className="flex items-center space-x-1">
          {onRefresh && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={onRefresh}
              disabled={isLoading}
            >
              <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
            </Button>
          )}
          {onExpand && (
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onExpand}>
              <Maximize2 className="h-4 w-4" />
            </Button>
          )}
          {onExport && (
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onExport}>
              <Download className="h-4 w-4" />
            </Button>
          )}
          {onSettings && (
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onSettings}>
              <Settings className="h-4 w-4" />
            </Button>
          )}
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="h-6 w-6 animate-spin text-frappe-primary" />
          </div>
        ) : (
          children
        )}
        
        {lastUpdated && (
          <div className="text-xs text-gray-500 mt-3 pt-3 border-t">
            Last updated: {lastUpdated}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WidgetContainer;
