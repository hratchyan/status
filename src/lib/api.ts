import { UptimeData, ResponseTimeData, ServiceStatus } from './types';

const SERVICES = [
  { id: 'Zapier', name: 'Zapier', url: 'https://status.zapier.com/api/v2/status.json' },
  { id: 'Salesforce', name: 'Salesforce', url: 'https://api.status.salesforce.com/v1/instances/status' },
  { id: 'Google Cloud', name: 'Google Cloud', url: 'https://status.cloud.google.com/summary.json' },
  { id: 'Microsoft Azure', name: 'Microsoft Azure', url: 'https://azure.status.microsoft.com/en-us/status/feed/' },
  { id: 'CallRail', name: 'CallRail', url: 'https://status.callrail.com/api/v2/status.json' },
  { id: 'Main WordPress Site (hratchyan.com)', name: 'WordPress Site', url: 'https://hratchyan.com' },
];

// Map service names to their directory names (Upptime converts names to URL-friendly format)
const SERVICE_DIR_MAP: Record<string, string> = {
  'Zapier': 'zapier',
  'Salesforce': 'salesforce',
  'Google Cloud': 'google-cloud',
  'Microsoft Azure': 'microsoft-azure',
  'CallRail': 'callrail',
  'Main WordPress Site (hratchyan.com)': 'main-wordpress-site-hratchyan-com',
};

export async function getServiceStatus(serviceId: string): Promise<ServiceStatus | null> {
  try {
    const dirName = SERVICE_DIR_MAP[serviceId] || serviceId.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const [uptimeRes, responseTimeRes] = await Promise.all([
      fetch(`/api/${dirName}/uptime.json`),
      fetch(`/api/${dirName}/response-time.json`)
    ]);

    if (!uptimeRes.ok || !responseTimeRes.ok) {
      return null;
    }

    const uptimeData: UptimeData = await uptimeRes.json();
    const responseTimeData: ResponseTimeData = await responseTimeRes.json();

    const service = SERVICES.find(s => s.id === serviceId);
    if (!service) return null;

    // Determine status based on uptime percentage
    const uptimePercent = parseFloat(uptimeData.message.replace('%', ''));
    let status: 'up' | 'down' | 'degraded' = 'up';

    if (uptimePercent === 0) {
      status = 'down';
    } else if (uptimePercent < 99) {
      status = 'degraded';
    }

    // Extract response time (remove 'ms' and convert to number)
    const responseTime = parseInt(responseTimeData.message.replace('ms', '')) || 0;

    return {
      name: service.name,
      url: service.url,
      status,
      uptime: uptimeData.message,
      responseTime,
      lastChecked: new Date().toISOString(),
    };
  } catch (error) {
    console.error(`Error fetching status for ${serviceId}:`, error);
    return null;
  }
}

export async function getAllServicesStatus(): Promise<ServiceStatus[]> {
  const results = await Promise.all(
    SERVICES.map(service => getServiceStatus(service.id))
  );

  return results.filter((status): status is ServiceStatus => status !== null);
}
