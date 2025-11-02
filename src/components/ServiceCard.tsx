import { ServiceStatus } from '@/lib/types';

interface ServiceCardProps {
  service: ServiceStatus;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'up':
        return 'bg-green-500';
      case 'down':
        return 'bg-red-500';
      case 'degraded':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'up':
        return 'Operational';
      case 'down':
        return 'Down';
      case 'degraded':
        return 'Degraded';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${getStatusColor(service.status)}`}></div>
          <span className="text-sm text-gray-600">{getStatusText(service.status)}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{service.uptime}</div>
          <div className="text-sm text-gray-500 uppercase tracking-wide">Uptime</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{service.responseTime}ms</div>
          <div className="text-sm text-gray-500 uppercase tracking-wide">Response</div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <a
          href={service.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:text-blue-800 truncate block"
        >
          {service.url}
        </a>
      </div>
    </div>
  );
}
