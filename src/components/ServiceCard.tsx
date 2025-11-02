import { ServiceStatus } from '@/lib/types';

interface ServiceCardProps {
  service: ServiceStatus;
}

export function ServiceCard({ service }: ServiceCardProps) {
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
          border: 'border-gray-200',
          dot: 'bg-gray-500',
          text: 'text-gray-800',
          label: 'Unknown'
        };
    }
  };

  const styles = getStatusStyles(service.status);

  return (
    <div className={`rounded-xl border-2 p-6 transition-all duration-200 hover:shadow-lg hover:scale-[1.02] ${styles.bg} ${styles.border}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${styles.bg} border ${styles.border}`}>
          <div className={`w-2 h-2 rounded-full ${styles.dot}`}></div>
          <span className={`text-sm font-medium ${styles.text}`}>{styles.label}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900 mb-1">{service.uptime}</div>
          <div className="text-xs text-gray-600 uppercase tracking-wider font-medium">Uptime</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900 mb-1">{service.responseTime}ms</div>
          <div className="text-xs text-gray-600 uppercase tracking-wider font-medium">Response</div>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Status Page</span>
          <a
            href={service.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            View Status
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
