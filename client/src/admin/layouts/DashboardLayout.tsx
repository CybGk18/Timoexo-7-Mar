import { useState, useEffect, useMemo } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  FileText, 
  Image, 
  Settings, 
  LogOut,
  Menu,
  X,
  PlusCircle,
  MessageSquare,
  Images,
  Inbox,
  Users
} from 'lucide-react';
import { toast } from 'sonner';

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Auto-hide sidebar on mobile/tablet, show on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const { logout, user, hasPermission, isSuperAdmin } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const allNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard', module: 'dashboard' },
    { icon: FileText, label: 'All Content', path: '/admin/content', module: 'content' },
    { icon: MessageSquare, label: 'Comments', path: '/admin/comments', module: 'comments' },
    { icon: Inbox, label: 'Inquiries', path: '/admin/inquiries', module: 'inquiries' },
    { icon: Images, label: 'Gallery', path: '/admin/gallery', module: 'gallery' },
    { icon: Image, label: 'Media Library', path: '/admin/media', module: 'media' },
    { icon: Users, label: 'Users', path: '/admin/users', module: 'users', superAdminOnly: true },
    { icon: Settings, label: 'Settings', path: '/admin/settings', module: 'settings' },
  ];

  const navItems = useMemo(() => {
    return allNavItems.filter(item => {
      if (item.superAdminOnly && !isSuperAdmin()) {
        return false;
      }
      return hasPermission(item.module);
    });
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Backdrop overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 transition-transform duration-300 z-30 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full overflow-hidden">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="bg-[#0055ff] rounded-lg p-2.5 shadow-sm">
                <LayoutDashboard className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-gray-900">
                  T-IMOEXO CMS
                </h1>
                <p className="text-xs text-gray-600">Admin Portal</p>
              </div>
            </div>
          </div>

          {/* Create New Button */}
          <div className="p-4">
            <Button 
              className="w-full bg-[#0055ff] hover:bg-[#0044cc] text-white shadow-sm hover:shadow-md transition-all" 
              asChild
            >
              <Link to="/admin/content/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New
              </Link>
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive
                      ? 'bg-[#0055ff] text-white shadow-sm'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-[#0055ff]'
                    }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>


          {/* Logout */}
          <div className="p-4 border-t border-gray-200">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hover:bg-gray-100"
              >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {navItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
                </h2>
                <p className="text-xs text-gray-500">Manage your content and settings</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-700">{user?.username || 'Admin'}</p>
                <p className="text-xs text-gray-500">{user?.role === 'super_admin' ? 'Super Administrator' : user?.role || 'User'}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#0055ff] flex items-center justify-center text-white font-bold shadow-sm">
                {user?.username?.charAt(0).toUpperCase() || 'A'}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 bg-gray-50 min-h-[calc(100vh-73px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
