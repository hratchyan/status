import { UptimeData, ResponseTimeData, ServiceStatus } from './types';

const SERVICES = [
  { id: 'Zapier', name: 'Zapier', url: 'https://status.zapier.com/', statusUrl: 'https://status.zapier.com/' },
  { id: 'Salesforce', name: 'Salesforce', url: 'https://api.status.salesforce.com/v1/instances/status', statusUrl: 'https://status.salesforce.com/' },
  { id: 'Google Cloud', name: 'Google Cloud', url: 'https://status.cloud.google.com/summary.json', statusUrl: 'https://status.cloud.google.com/' },
  { id: 'Microsoft Azure', name: 'Microsoft Azure', url: 'https://azure.status.microsoft.com/en-us/status/feed/', statusUrl: 'https://azure.status.microsoft.com/en-us/status/' },
  { id: 'CallRail', name: 'CallRail', url: 'https://status.callrail.com/api/v2/status.json', statusUrl: 'https://status.callrail.com/' },
  { id: 'Main WordPress Site (hratchyan.com)', name: 'WordPress Site', url: 'https://hratchyan.com', statusUrl: 'https://hratchyan.com' },
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

export async function getServiceStatus(serviceId: string): Promise<ServiceStatus> {
  const service = SERVICES.find(s => s.id === serviceId);
  
  // Return error state if service not found in config
  if (!service) {
    return {
      name: serviceId,
      url: '',
      statusUrl: '',
      status: 'unknown',
      uptime: '0%',
      responseTime: 0,
      lastChecked: new Date().toISOString(),
      error: 'Service configuration not found',
    };
  }

  try {
    const dirName = SERVICE_DIR_MAP[serviceId] || serviceId.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const [uptimeRes, responseTimeRes] = await Promise.all([
      fetch(`/api/${dirName}/uptime.json`),
      fetch(`/api/${dirName}/response-time.json`)
    ]);

    if (!uptimeRes.ok || !responseTimeRes.ok) {
      return {
        name: service.name,
        url: service.url,
        statusUrl: service.statusUrl,
        status: 'unknown',
        uptime: 'N/A',
        responseTime: 0,
        lastChecked: new Date().toISOString(),
        error: `Unable to fetch data (HTTP ${uptimeRes.status || responseTimeRes.status})`,
      };
    }

    const uptimeData: UptimeData = await uptimeRes.json();
    const responseTimeData: ResponseTimeData = await responseTimeRes.json();

    // Determine status based on uptime percentage
    const uptimePercent = parseFloat(uptimeData.message.replace('%', ''));
    let status: 'up' | 'down' | 'degraded' = 'up';

    if (uptimePercent === 0) {
      status = 'down';
    } else if (uptimePercent < 99) {
      status = 'degraded';
    }

    // Extract response time (remove 'ms' and convert to number)
    const responseTimeMatch = responseTimeData.message.match(/(\d+)/);
    const responseTime = responseTimeMatch ? parseInt(responseTimeMatch[1]) : 0;

    return {
      name: service.name,
      url: service.url,
      statusUrl: service.statusUrl,
      status,
      uptime: uptimeData.message,
      responseTime,
      lastChecked: new Date().toISOString(),
    };
  } catch (error) {
    console.error(`Error fetching status for ${serviceId}:`, error);
    return {
      name: service.name,
      url: service.url,
      statusUrl: service.statusUrl,
      status: 'unknown',
      uptime: 'N/A',
      responseTime: 0,
      lastChecked: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Failed to fetch status data',
    };
  }
}

export async function getAllServicesStatus(): Promise<ServiceStatus[]> {
  const results = await Promise.all(
    SERVICES.map(service => getServiceStatus(service.id))
  );

  // Return all services, including those with errors
  return results;
}
