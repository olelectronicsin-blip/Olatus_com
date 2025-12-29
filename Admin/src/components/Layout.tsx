import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Mail, 
  Users, 
  BarChart3, 
  LogOut,
  Menu,
  X,
  Cpu,
  Inbox
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Projects', href: '/projects', icon: FileText },
  { name: 'Inbox', href: '/inbox', icon: Inbox },
  { name: 'Contacts', href: '/contacts', icon: Mail },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-[#002E3C]">
      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 flex flex-col w-64 bg-[#002E3C] border-r border-white/10">
            <div className="flex items-center justify-between h-16 px-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-gradient">Olatus</span>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <nav className="flex-1 px-3 py-6 space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border border-cyan-500/30'
                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-1 bg-[#002E3C] border-r border-white/10">
          <div className="flex items-center h-16 px-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center animate-glow">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gradient">Olatus Admin</span>
            </div>
          </div>
          <nav className="flex-1 px-3 py-6 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/20'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t border-white/10">
            <div className="glass-panel rounded-lg p-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold">
                  {user?.name?.charAt(0) || 'A'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{user?.name}</p>
                  <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                </div>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200 border border-transparent hover:border-red-500/30"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Mobile header */}
        <div className="sticky top-0 z-10 flex items-center h-16 glass-panel border-b border-white/10 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="px-4 text-gray-400 hover:text-white"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
              <Cpu className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-gradient">Olatus Admin</span>
          </div>
        </div>
        
        {/* Grid background */}
        <div className="fixed inset-0 grid-overlay opacity-20 pointer-events-none" />
        
        <main className="relative p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
