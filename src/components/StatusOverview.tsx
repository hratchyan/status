import { AggregatedServiceStatus } from '@/lib/types';

interface StatusOverviewProps {
  services: AggregatedServiceStatus[];
}

export function StatusOverview({ services }: StatusOverviewProps) {
  const totalServices = services.length;
  const operationalServices = services.filter(s => s.overallStatus === 'up').length;
  const degradedServices = services.filter(s => s.overallStatus === 'degraded').length;
  const downServices = services.filter(s => s.overallStatus === 'down').length;

  const averageUptime = services.length > 0
    ? (services.reduce((acc, service) => {
        const uptime = parseFloat(service.overallUptime.replace('%', ''));
        return acc + (isNaN(uptime) ? 0 : uptime);
      }, 0) / services.length).toFixed(1) + '%'
    : '0%';

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-white text-xl font-bold">✓</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">All Systems Operational</h3>
        <p className="text-gray-600">{operationalServices} of {totalServices} services operational</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-white text-xl font-bold">↗</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{averageUptime} Uptime</h3>
        <p className="text-gray-600">Last 30 days average</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
        <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-white text-xl font-bold">⚡</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Monitoring</h3>
        <p className="text-gray-600">Updates every 5 minutes</p>
      </div>
    </div>
  );
}
