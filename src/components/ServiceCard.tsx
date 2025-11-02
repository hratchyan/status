'use client';

import { useState } from 'react';
import { AggregatedServiceStatus } from '@/lib/types';

interface ServiceCardProps {
  service: AggregatedServiceStatus;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'up':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          dot: 'bg-green-500',
          text: 'text-green-800',
          label: 'Operational'
        };
      case 'down':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          dot: 'bg-red-500',
          text: 'text-red-800',
          label: 'Down'
        };
      case 'degraded':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          dot: 'bg-yellow-500',
          text: 'text-yellow-800',
          label: 'Degraded'
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-300',
          dot: 'bg-gray-400',
          text: 'text-gray-700',
          label: 'Unknown'
        };
    }
  };

  const getLocationStatusColor = (status: string) => {
    switch (status) {
      case 'up':
        return 'bg-green-500';
      case 'degraded':
        return 'bg-yellow-500';
      case 'down':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  const styles = getStatusStyles(service.overallStatus);

  // Sort locations to put Los Angeles first
  const sortedLocations = [...service.locations].sort((a, b) => {
    if (a.location.code === service.primaryLocation) return -1;
    if (b.location.code === service.primaryLocation) return 1;
    return 0;
  });

  return (
    <div className={`rounded-xl border-2 transition-all duration-200 ${styles.bg} ${styles.border}`}>
      {/* Main Card Header */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <h3 className="text-2xl font-bold text-gray-900">{service.name}</h3>
            <span className="text-sm text-gray-600">
              {service.type === 'status-api' ? '📊 Status API' : '🌐 Website Check'}
            </span>
          </div>
          <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${styles.bg} border ${styles.border}`}>
            <div className={`w-2.5 h-2.5 rounded-full ${styles.dot}`}></div>
            <span className={`text-sm font-semibold ${styles.text}`}>{styles.label}</span>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-gray-700 font-medium">{service.statusMessage}</p>
        </div>

        {/* Location Pills */}
        <div className="mb-4">
          <div className="text-xs text-gray-600 uppercase tracking-wider font-medium mb-2">
            Response Times by Location:
          </div>
          <div className="flex flex-wrap gap-3">
            {sortedLocations.map((loc) => (
              <div
                key={loc.location.code}
                className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors"
              >
                <span className="text-sm font-medium text-gray-700">
                  {loc.location.code === service.primaryLocation && '⭐ '}
                  {loc.location.name}
                </span>
                <div className="flex items-center space-x-1.5">
                  <div className={`w-2 h-2 rounded-full ${getLocationStatusColor(loc.status)}`}></div>
                  <span className="text-sm font-semibold text-gray-900">
                    {loc.error ? 'N/A' : `${loc.responseTime}ms`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-8">
            <div>
              <div className="text-xs text-gray-600 uppercase tracking-wider font-medium">Overall Uptime</div>
              <div className="text-lg font-bold text-gray-900">{service.overallUptime}</div>
            </div>
            <div>
              <div className="text-xs text-gray-600 uppercase tracking-wider font-medium">Avg Response</div>
              <div className="text-lg font-bold text-gray-900">{service.averageResponseTime}ms</div>
            </div>
            <div>
              <div className="text-xs text-gray-600 uppercase tracking-wider font-medium">Last Check</div>
              <div className="text-sm text-gray-700">{new Date(service.lastChecked).toLocaleTimeString()}</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <a
              href={service.statusPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              View Status Page
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            
            {service.detailedStatus && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                {isExpanded ? 'Hide Details' : 'Show Details'}
                <svg 
                  className={`w-4 h-4 ml-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Expandable Detailed Status */}
      {isExpanded && service.detailedStatus && (
        <div className="px-6 pb-6 pt-0">
          <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Detailed Status Information</h4>
            
            {service.detailedStatus.components && service.detailedStatus.components.length > 0 && (
              <div className="mb-4">
                <div className="text-xs text-gray-600 uppercase tracking-wider font-medium mb-2">Components</div>
                <div className="grid grid-cols-2 gap-2">
                  {service.detailedStatus.components.map((component, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-700">{component.name}</span>
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        component.status === 'operational' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {component.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {service.detailedStatus.incidents && service.detailedStatus.incidents.length > 0 && (
              <div>
                <div className="text-xs text-gray-600 uppercase tracking-wider font-medium mb-2">Recent Incidents</div>
                <div className="space-y-2">
                  {service.detailedStatus.incidents.map((incident, idx) => (
                    <div key={idx} className="p-2 bg-gray-50 rounded">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">{incident.name}</span>
                        <span className="text-xs text-gray-600">
                          {new Date(incident.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <span className="text-xs text-gray-600">{incident.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {(!service.detailedStatus.components || service.detailedStatus.components.length === 0) &&
             (!service.detailedStatus.incidents || service.detailedStatus.incidents.length === 0) && (
              <p className="text-sm text-gray-600">No additional details available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
