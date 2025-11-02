'use client';

import { useEffect, useState } from 'react';
import { ServiceStatus } from '@/lib/types';
import { getAllServicesStatus } from '@/lib/api';
import { StatusOverview } from '@/components/StatusOverview';
import { ServiceCard } from '@/components/ServiceCard';

export default function Home() {
  const [services, setServices] = useState<ServiceStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getAllServicesStatus();
        setServices(data);
      } catch (err) {
        setError('Failed to load service status');
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading service status...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Service Status</h1>
            <p className="text-lg text-gray-600">Real-time monitoring of critical services and infrastructure</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatusOverview services={services} />

        {/* Services Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Service Status</h2>
          {services.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No services found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <ServiceCard key={service.name} service={service} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a href="/history" className="text-gray-600 hover:text-gray-900">History</a>
              <a href="https://github.com/hratchyan/status" className="text-gray-600 hover:text-gray-900">GitHub</a>
            </div>
            <p className="text-gray-500 text-sm">Powered by Upptime</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
