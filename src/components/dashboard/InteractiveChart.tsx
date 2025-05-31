
import React, { useState } from 'react';
import WidgetContainer from './WidgetContainer';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { Calendar, Filter, TrendingUp } from 'lucide-react';

interface ChartDataPoint {
  name: string;
  value: number;
  category?: string;
  trend?: number;
  [key: string]: any;
}

interface InteractiveChartProps {
  title: string;
  type: 'line' | 'bar' | 'pie' | 'area';
  data: ChartDataPoint[];
  dataKey?: string;
  xAxisKey?: string;
  colors?: string[];
  enableDrillDown?: boolean;
  showTrend?: boolean;
  timeRange?: string;
  onDrillDown?: (dataPoint: ChartDataPoint) => void;
  onFilterChange?: (filter: string) => void;
}

const InteractiveChart: React.FC<InteractiveChartProps> = ({
  title,
  type,
  data,
  dataKey = 'value',
  xAxisKey = 'name',
  colors = ['#4C5BD4', '#28A745', '#FFC107', '#DC3545', '#6F42C1'],
  enableDrillDown = false,
  showTrend = false,
  timeRange = 'Last 7 days',
  onDrillDown,
  onFilterChange
}) => {
  const [selectedDataPoint, setSelectedDataPoint] = useState<ChartDataPoint | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const chartConfig = {
    [dataKey]: {
      label: dataKey,
      color: colors[0],
    },
  };

  const handleDataPointClick = (data: any, index?: number) => {
    if (enableDrillDown && data && data.payload) {
      const dataPoint = data.payload as ChartDataPoint;
      setSelectedDataPoint(dataPoint);
      onDrillDown?.(dataPoint);
    }
  };

  const calculateTrend = () => {
    if (data.length < 2) return 0;
    const latest = data[data.length - 1].value;
    const previous = data[data.length - 2].value;
    return ((latest - previous) / previous) * 100;
  };

  const trend = calculateTrend();

  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <ChartContainer config={chartConfig} className="h-[250px]">
            <LineChart data={data}>
              <XAxis dataKey={xAxisKey} />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey={dataKey} 
                stroke={colors[0]} 
                strokeWidth={3}
                dot={{ fill: colors[0], strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: colors[0], onClick: handleDataPointClick }}
              />
            </LineChart>
          </ChartContainer>
        );
      
      case 'area':
        return (
          <ChartContainer config={chartConfig} className="h-[250px]">
            <AreaChart data={data}>
              <XAxis dataKey={xAxisKey} />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area 
                type="monotone" 
                dataKey={dataKey} 
                stroke={colors[0]} 
                fill={colors[0]}
                fillOpacity={0.6}
                onClick={enableDrillDown ? handleDataPointClick : undefined}
              />
            </AreaChart>
          </ChartContainer>
        );
      
      case 'bar':
        return (
          <ChartContainer config={chartConfig} className="h-[250px]">
            <BarChart data={data}>
              <XAxis dataKey={xAxisKey} />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar 
                dataKey={dataKey} 
                fill={colors[0]} 
                radius={[4, 4, 0, 0]}
                opacity={0.8}
                onClick={enableDrillDown ? handleDataPointClick : undefined}
              />
            </BarChart>
          </ChartContainer>
        );
      
      case 'pie':
        return (
          <div className="h-[250px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={100}
                  dataKey={dataKey}
                  onClick={enableDrillDown ? handleDataPointClick : undefined}
                  style={{ cursor: enableDrillDown ? 'pointer' : 'default' }}
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={colors[index % colors.length]}
                      opacity={selectedDataPoint === entry ? 1 : 0.8}
                    />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        );
      
      default:
        return <div>Chart type not supported</div>;
    }
  };

  return (
    <WidgetContainer 
      title={title}
      trend={trend > 0 ? 'up' : trend < 0 ? 'down' : 'stable'}
      onRefresh={() => {}}
      onExpand={() => {}}
      onExport={() => {}}
      className="relative"
    >
      <div className="space-y-4">
        {/* Chart Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              <Calendar className="h-3 w-3 mr-1" />
              {timeRange}
            </Badge>
            {showTrend && (
              <Badge className={trend > 0 ? 'bg-green-100 text-green-800' : trend < 0 ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}>
                <TrendingUp className="h-3 w-3 mr-1" />
                {trend > 0 ? '+' : ''}{trend.toFixed(1)}%
              </Badge>
            )}
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => onFilterChange?.('filter')}>
              <Filter className="h-4 w-4 mr-1" />
              Filter
            </Button>
          </div>
        </div>

        {/* Chart */}
        {renderChart()}

        {/* Drill-down Information */}
        {selectedDataPoint && enableDrillDown && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2">
              Selected: {selectedDataPoint[xAxisKey]}
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-blue-700">Value:</span>
                <span className="font-medium ml-2">{selectedDataPoint[dataKey]}</span>
              </div>
              {selectedDataPoint.category && (
                <div>
                  <span className="text-blue-700">Category:</span>
                  <span className="font-medium ml-2">{selectedDataPoint.category}</span>
                </div>
              )}
            </div>
            <Button size="sm" variant="outline" className="mt-2" onClick={() => setSelectedDataPoint(null)}>
              Clear Selection
            </Button>
          </div>
        )}
      </div>
    </WidgetContainer>
  );
};

export default InteractiveChart;
