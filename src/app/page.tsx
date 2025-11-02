'use client';

import { useEffect, useState } from 'react';
import { AggregatedServiceStatus } from '@/lib/types';
import { getAllAggregatedServicesStatus } from '@/lib/api';
import { ServiceCard } from '@/components/ServiceCard';
import { StatusOverview } from '@/components/StatusOverview';

export default function Home() {
  const [services, setServices] = useState<AggregatedServiceStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getAllAggregatedServicesStatus();
        setServices(data);
      } catch (err) {
        setError('Failed to load service status');
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();

    // Refresh data every 30 seconds
    const interval = setInterval(fetchServices, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading Services</h2>
          <p className="text-gray-600">Checking status of all monitored services...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Connection Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-3">Service Status</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real-time monitoring dashboard for critical services and infrastructure
            </p>
            <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live Updates</span>
              </div>
              <span>•</span>
              <span>Last updated: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Services Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Status Overview */}
        {services.length > 0 && <StatusOverview services={services} />}

        {services.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-gray-400 mb-4">
              <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Services Found</h3>
            <p className="text-gray-600">Unable to load service status information.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/50 backdrop-blur-sm border-t border-white/20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Status monitoring powered by automated checks • Updates every 5 minutes
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
