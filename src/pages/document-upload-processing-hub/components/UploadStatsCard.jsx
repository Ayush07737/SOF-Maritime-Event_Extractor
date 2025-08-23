import React from 'react';
import Icon from '../../../components/AppIcon';

const UploadStatsCard = ({ 
  totalDocuments = 0,
  totalEvents = 0,
  successRate = 0,
  avgProcessingTime = '0 minutes',
  topPorts = []
}) => {
  const formatNumber = (num) => {
    if (num >= 1000) {
      return `${(num / 1000)?.toFixed(1)}k`;
    }
    return num?.toString();
  };

  return (
    <div className="bg-gradient-to-br from-card via-card to-card/95 border border-border rounded-xl p-6 maritime-shadow-card">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
          <Icon name="BarChart3" size={20} className="text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Platform Analytics</h3>
          <p className="text-sm text-muted-foreground">Real-time processing stats</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="space-y-6">
        {/* Primary Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-xl font-bold text-foreground">
              {formatNumber(totalDocuments)}
            </div>
            <div className="text-xs text-muted-foreground">Documents</div>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-xl font-bold text-foreground">
              {formatNumber(totalEvents)}
            </div>
            <div className="text-xs text-muted-foreground">Events Extracted</div>
          </div>
        </div>

        {/* Success Rate */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-foreground">Success Rate</span>
            <span className="text-sm font-semibold text-success">{successRate}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="h-2 bg-gradient-to-r from-success to-success/80 rounded-full maritime-transition-state"
              style={{ width: `${successRate}%` }}
            />
          </div>
        </div>

        {/* Processing Time */}
        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-secondary" />
            <span className="text-sm font-medium text-foreground">Avg Processing</span>
          </div>
          <span className="text-sm font-semibold text-foreground">{avgProcessingTime}</span>
        </div>

        {/* Top Ports */}
        {topPorts && topPorts?.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground flex items-center space-x-2">
              <Icon name="MapPin" size={14} className="text-primary" />
              <span>Top Processing Ports</span>
            </h4>
            <div className="space-y-2">
              {topPorts?.slice(0, 4)?.map((port, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      index === 0 ? 'bg-primary' :
                      index === 1 ? 'bg-secondary' :
                      index === 2 ? 'bg-accent' : 'bg-muted-foreground'
                    }`} />
                    <span className="text-muted-foreground">{port}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="TrendingUp" size={12} className="text-success" />
                    <span className="text-xs text-success">{(4 - index) * 12}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Live Status */}
        <div className="border-t border-border pt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-xs text-muted-foreground">System Status</span>
          </div>
          <span className="text-xs font-medium text-success">Online</span>
        </div>

        {/* Processing Capacity */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Processing Capacity</span>
            <span className="text-xs text-foreground">78% utilized</span>
          </div>
          <div className="w-full bg-muted rounded-full h-1.5">
            <div 
              className="h-1.5 bg-gradient-to-r from-primary via-secondary to-accent rounded-full"
              style={{ width: '78%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadStatsCard;