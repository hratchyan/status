export interface ServiceStatus {
  name: string;
  url: string;
  status: 'up' | 'down' | 'degraded';
  uptime: string;
  responseTime: number;
  lastChecked: string;
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
