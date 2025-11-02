export interface Location {
  name: string;
  code: string;
  coordinates: [number, number];
  region: string;
}

export interface ServiceStatus {
  name: string;
  url: string;
  statusUrl: string;
  status: 'up' | 'down' | 'degraded' | 'unknown';
  uptime: string;
  responseTime: number;
  lastChecked: string;
  location?: Location;
  error?: string;
}

// New aggregated types for service cards
export interface LocationStatus {
  location: Location;
  responseTime: number;
  status: 'up' | 'down' | 'degraded' | 'unknown';
  uptime: string;
  lastChecked: string;
  error?: string;
}

export interface DetailedServiceStatus {
  indicator?: 'none' | 'minor' | 'major' | 'critical';
  description?: string;
  components?: Array<{
    name: string;
    status: string;
  }>;
  incidents?: Array<{
    name: string;
    status: string;
    created_at: string;
  }>;
}

export interface AggregatedServiceStatus {
  id: string;
  name: string;
  type: 'status-api' | 'website';
  overallStatus: 'up' | 'down' | 'degraded' | 'unknown';
  statusMessage: string;
  statusPageUrl: string;
  locations: LocationStatus[];
  averageResponseTime: number;
  overallUptime: string;
  lastChecked: string;
  detailedStatus?: DetailedServiceStatus;
  primaryLocation: string; // Los Angeles as priority
}

export interface UptimeData {
  schemaVersion: number;
  label: string;
  message: string;
  color: string;
}

export interface ResponseTimeData {
  schemaVersion: number;
  label: string;
  message: string;
  color: string;
}
