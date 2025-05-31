
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Settings, 
  Target, 
  Zap, 
  Shield, 
  Database, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Download,
  Upload
} from 'lucide-react';

const AIConfiguration = () => {
  const [autoRoutingEnabled, setAutoRoutingEnabled] = useState(true);
  const [sentimentAnalysisEnabled, setSentimentAnalysisEnabled] = useState(true);
  const [predictionThreshold, setPredictionThreshold] = useState(85);

  const aiModels = [
    {
      id: 'auto-routing',
      name: 'Intelligent Auto-routing',
      status: 'active',
      accuracy: 94,
      usage: 78,
      lastTrained: '2 days ago',
      performance: 'excellent',
      enabled: autoRoutingEnabled
    },
    {
      id: 'sentiment',
      name: 'Sentiment Analysis',
      status: 'active',
      accuracy: 91,
      usage: 82,
      lastTrained: '1 week ago',
      performance: 'good',
      enabled: sentimentAnalysisEnabled
    },
    {
      id: 'response-suggestions',
      name: 'Response Suggestions',
      status: 'training',
      accuracy: 87,
      usage: 65,
      lastTrained: '5 days ago',
      performance: 'good',
      enabled: true
    },
    {
      id: 'escalation-prediction',
      name: 'Escalation Prediction',
      status: 'active',
      accuracy: 89,
      usage: 54,
      lastTrained: '3 days ago',
      performance: 'excellent',
      enabled: true
    }
  ];

  const trainingMetrics = [
    { metric: 'Data Quality Score', value: 92, target: 95, status: 'good' },
    { metric: 'Model Accuracy', value: 89, target: 90, status: 'warning' },
    { metric: 'Prediction Confidence', value: 87, target: 85, status: 'excellent' },
    { metric: 'Response Latency', value: 250, target: 200, status: 'warning', unit: 'ms' },
  ];

  const auditLogs = [
    { id: 1, timestamp: '2024-01-15 14:30', action: 'Model Retrained', model: 'Auto-routing', user: 'System', result: 'Success' },
    { id: 2, timestamp: '2024-01-15 12:15', action: 'Threshold Updated', model: 'Sentiment Analysis', user: 'Admin', result: 'Success' },
    { id: 3, timestamp: '2024-01-15 09:45', action: 'Configuration Changed', model: 'Response Suggestions', user: 'Admin', result: 'Success' },
    { id: 4, timestamp: '2024-01-14 16:20', action: 'Performance Alert', model: 'Escalation Prediction', user: 'System', result: 'Warning' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'training': return 'bg-blue-100 text-blue-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'warning': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getMetricStatus = (metric: any) => {
    if (metric.unit === 'ms') {
      return metric.value <= metric.target ? 'excellent' : 'warning';
    }
    return metric.value >= metric.target ? 'excellent' : metric.value >= metric.target * 0.9 ? 'good' : 'warning';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-frappe-dark flex items-center">
            <Brain className="h-7 w-7 mr-3 text-frappe-primary" />
            AI System Configuration
          </h2>
          <p className="text-gray-600 mt-1">Configure and monitor AI models and automation settings</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Config
          </Button>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import Config
          </Button>
          <Button className="bg-frappe-primary hover:bg-frappe-primary/90">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retrain Models
          </Button>
        </div>
      </div>

      <Tabs defaultValue="models" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="models">AI Models</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
        </TabsList>

        <TabsContent value="models" className="space-y-4">
          {aiModels.map((model) => (
            <Card key={model.id} className="frappe-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-frappe-primary/10">
                      <Brain className="h-5 w-5 text-frappe-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-frappe-dark">{model.name}</h4>
                      <p className="text-sm text-gray-500">Last trained: {model.lastTrained}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(model.status)}>
                      {model.status}
                    </Badge>
                    <Switch 
                      checked={model.enabled} 
                      onCheckedChange={(checked) => {
                        if (model.id === 'auto-routing') setAutoRoutingEnabled(checked);
                        if (model.id === 'sentiment') setSentimentAnalysisEnabled(checked);
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-500">Accuracy</span>
                      <span className="font-medium">{model.accuracy}%</span>
                    </div>
                    <Progress value={model.accuracy} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-500">Usage</span>
                      <span className="font-medium">{model.usage}%</span>
                    </div>
                    <Progress value={model.usage} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-500">Performance</span>
                      <span className={`font-medium ${getPerformanceColor(model.performance)}`}>
                        {model.performance}
                      </span>
                    </div>
                    <Progress 
                      value={model.performance === 'excellent' ? 100 : model.performance === 'good' ? 75 : 50} 
                      className="h-2" 
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Settings className="h-4 w-4 mr-1" />
                      Configure
                    </Button>
                    <Button size="sm" variant="outline">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      Analytics
                    </Button>
                  </div>
                  <Button size="sm" className="bg-frappe-primary hover:bg-frappe-primary/90">
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Retrain
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="frappe-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-frappe-primary" />
                  Prediction Thresholds
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="confidence-threshold">Minimum Confidence Threshold</Label>
                  <div className="flex items-center space-x-4 mt-2">
                    <Input 
                      id="confidence-threshold"
                      type="number" 
                      value={predictionThreshold}
                      onChange={(e) => setPredictionThreshold(Number(e.target.value))}
                      className="w-20"
                    />
                    <span className="text-sm text-gray-500">%</span>
                    <Progress value={predictionThreshold} className="flex-1 h-2" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="escalation-threshold">Escalation Prediction Threshold</Label>
                  <div className="flex items-center space-x-4 mt-2">
                    <Input 
                      id="escalation-threshold"
                      type="number" 
                      defaultValue={75}
                      className="w-20"
                    />
                    <span className="text-sm text-gray-500">%</span>
                    <Progress value={75} className="flex-1 h-2" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="routing-threshold">Auto-routing Confidence</Label>
                  <div className="flex items-center space-x-4 mt-2">
                    <Input 
                      id="routing-threshold"
                      type="number" 
                      defaultValue={90}
                      className="w-20"
                    />
                    <span className="text-sm text-gray-500">%</span>
                    <Progress value={90} className="flex-1 h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="frappe-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-frappe-primary" />
                  Automation Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-routing</Label>
                    <p className="text-sm text-gray-500">Automatically route tickets to best agents</p>
                  </div>
                  <Switch checked={autoRoutingEnabled} onCheckedChange={setAutoRoutingEnabled} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Response Suggestions</Label>
                    <p className="text-sm text-gray-500">AI-powered response recommendations</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Sentiment Analysis</Label>
                    <p className="text-sm text-gray-500">Analyze customer sentiment in real-time</p>
                  </div>
                  <Switch checked={sentimentAnalysisEnabled} onCheckedChange={setSentimentAnalysisEnabled} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Priority Prediction</Label>
                    <p className="text-sm text-gray-500">Auto-predict ticket priority levels</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {trainingMetrics.map((metric, index) => {
              const status = getMetricStatus(metric);
              return (
                <Card key={index} className="frappe-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-frappe-dark">{metric.metric}</h4>
                      {status === 'excellent' ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : status === 'warning' ? (
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      ) : (
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-frappe-dark">
                          {metric.value}{metric.unit || '%'}
                        </span>
                        <span className="text-sm text-gray-500">
                          Target: {metric.target}{metric.unit || '%'}
                        </span>
                      </div>
                      <Progress 
                        value={metric.unit === 'ms' ? Math.max(0, 100 - (metric.value / metric.target) * 100) : (metric.value / metric.target) * 100} 
                        className="h-2" 
                      />
                      <Badge className={status === 'excellent' ? 'bg-green-100 text-green-800' : status === 'warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}>
                        {status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-frappe-dark">AI System Audit Trail</h3>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Logs
            </Button>
          </div>

          {auditLogs.map((log) => (
            <Card key={log.id} className="frappe-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-gray-100">
                      <Database className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-frappe-dark">{log.action}</h4>
                      <p className="text-sm text-gray-500">
                        {log.model} • {log.timestamp} • by {log.user}
                      </p>
                    </div>
                  </div>
                  <Badge className={log.result === 'Success' ? 'bg-green-100 text-green-800' : log.result === 'Warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}>
                    {log.result}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIConfiguration;
