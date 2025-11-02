import { UptimeData, ResponseTimeData, ServiceStatus } from './types';

const SERVICES = [
  { id: 'google', name: 'Google', url: 'https://www.google.com' },
  { id: 'hacker-news', name: 'Hacker News', url: 'https://news.ycombinator.com' },
  { id: 'wikipedia', name: 'Wikipedia', url: 'https://en.wikipedia.org' },
  { id: 'i-pv6-test', name: 'IPv6 Test', url: 'https://test-ipv6.com' },
  { id: 'test-broken-site', name: 'Test Broken Site', url: 'https://thissitedoesnotexist.koj.co' },
];

export async function getServiceStatus(serviceId: string): Promise<ServiceStatus | null> {
  try {
    const [uptimeRes, responseTimeRes] = await Promise.all([
      fetch(`/api/${serviceId}/uptime.json`),
      fetch(`/api/${serviceId}/response-time.json`)
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
