import { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, Eye, Users } from 'lucide-react';
import api from '../lib/api';
import toast from 'react-hot-toast';

export default function Analytics() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const { data } = await api.get('/analytics');
      setAnalytics(data.data);
    } catch {
      toast.error('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-2">Track website performance and user behavior</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Page Views</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {analytics?.pageViews || 0}
              </p>
            </div>
            <div className="bg-blue-500 p-3 rounded-lg">
              <Eye className="text-white" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Unique Visitors</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {analytics?.uniqueVisitors || 0}
              </p>
            </div>
            <div className="bg-purple-500 p-3 rounded-lg">
              <Users className="text-white" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Engagement Rate</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {analytics?.uniqueVisitors > 0
                  ? ((analytics.pageViews / analytics.uniqueVisitors).toFixed(1))
                  : 0}
              </p>
            </div>
            <div className="bg-green-500 p-3 rounded-lg">
              <TrendingUp className="text-white" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Top Pages */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <BarChart3 size={24} />
            Top Pages
          </h2>
        </div>
        <div className="p-6">
          {analytics?.topPages && Object.keys(analytics.topPages).length > 0 ? (
            <div className="space-y-4">
              {Object.entries(analytics.topPages)
                .sort(([, a]: any, [, b]: any) => b - a)
                .slice(0, 10)
                .map(([page, count]: any) => (
                  <div key={page} className="flex items-center justify-between">
                    <span className="text-gray-700">{page}</span>
                    <span className="font-semibold text-gray-900">{count} views</span>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No analytics data available</p>
          )}
        </div>
      </div>
    </div>
  );
}
