export interface ServiceStatus {
  name: string;
  url: string;
  statusUrl: string;
  status: 'up' | 'down' | 'degraded' | 'unknown';
  uptime: string;
  responseTime: number;
  lastChecked: string;
  error?: string; // Optional error message if fetch failed
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
