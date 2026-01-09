import { useEffect, useState } from 'react';
import { Users, FileText, Mail, Eye, TrendingUp, Activity, Sparkles } from 'lucide-react';
import api from '../lib/api';
import toast from 'react-hot-toast';

interface DashboardStats {
  users: number;
  projects: number;
  contacts: number;
  pageViews: number;
  uniqueVisitors: number;
  recentContacts: any[];
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const { data } = await api.get('/admin/dashboard');
      setStats(data.data);
    } catch {
      toast.error('Failed to load dashboard stats');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats?.users || 0,
      icon: Users,
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      title: 'Projects',
      value: stats?.projects || 0,
      icon: FileText,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Contacts',
      value: stats?.contacts || 0,
      icon: Mail,
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Page Views',
      value: stats?.pageViews || 0,
      icon: Eye,
      gradient: 'from-orange-500 to-amber-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card border-white/10">
        <h1 className="text-3xl font-bold text-gradient">Dashboard</h1>
        <p className="text-gray-400 mt-2">Welcome back! Here's what's happening with your platform.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="glass-card border-white/10 hover:border-white/20 group">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-400 mb-2">{stat.title}</p>
                <p className="text-4xl font-bold text-white">{stat.value}</p>
              </div>
              <div className={`bg-gradient-to-r ${stat.gradient} p-4 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <stat.icon className="text-white" size={28} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Unique Visitors - Full Width Card */}
      <div className="glass-card border-white/10 hover:border-cyan-500/30 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-400 mb-2">Unique Visitors</p>
            <p className="text-4xl font-bold text-gradient">{stats?.uniqueVisitors || 0}</p>
            <p className="text-sm text-gray-500 mt-2">Last 30 days</p>
          </div>
          <div className="bg-gradient-to-r from-cyan-500 to-purple-500 p-4 rounded-xl animate-glow">
            <TrendingUp className="text-white" size={32} />
          </div>
        </div>
      </div>

      {/* Recent Contacts */}
      <div className="glass-card border-white/10">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
          <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500">
            <Activity className="text-white" size={20} />
          </div>
          <h2 className="text-xl font-bold text-white">Recent Contacts</h2>
        </div>

        <div className="space-y-3">
          {stats?.recentContacts && stats.recentContacts.length > 0 ? (
            stats.recentContacts.map((contact: any) => (
              <div key={contact._id} className="bg-white/5 rounded-lg p-4 border border-white/5 hover:border-cyan-500/30 hover:bg-white/10 transition-all duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-white">{contact.name}</p>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${contact.status === 'new' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                          contact.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                            'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                        }`}>
                        {contact.status}
                      </span>
                    </div>
                    <p className="text-sm text-cyan-400 mb-2">{contact.email}</p>
                    <p className="text-sm text-gray-400 line-clamp-1">{contact.subject}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Mail className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">No recent contacts</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
