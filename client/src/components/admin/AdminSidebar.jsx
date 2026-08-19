import React from 'react';
import {
  LayoutDashboard,
  Globe,
  Sliders,
  Megaphone,
  Tag,
  Compass,
  MapPin,
  FolderTree,
  Activity,
  Hotel,
  Plane,
  Package,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  CheckCheck,
  Users,
  UserCheck,
  MessageSquare,
  Mail,
  Star,
  HelpCircle,
  Ticket,
  Image,
  Navigation,
  Columns,
  Phone,
  Share2,
  Search,
  Shield,
  UserCog,
  FileText,
  Settings,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

const AdminSidebar = ({ activeSubTab, setActiveSubTab, collapsed, setCollapsed }) => {
  const [openGroups, setOpenGroups] = React.useState({
    websiteContent: true,
    travelManagement: true,
    bookings: true,
    customers: false,
    enquiries: true,
    marketing: false,
    website: false,
    system: false
  });

  const toggleGroup = (groupKey) => {
    setOpenGroups((prev) => ({ ...prev, [groupKey]: !prev[groupKey] }));
  };

  const navGroups = [
    {
      key: 'dashboard',
      title: 'Main',
      items: [
        { id: 'overview', name: 'Dashboard', icon: LayoutDashboard }
      ]
    },
    {
      key: 'websiteContent',
      title: 'Website Content',
      icon: Globe,
      items: [
        { id: 'hero', name: 'Hero Sections', icon: Sliders },
        { id: 'banners', name: 'Banners & Promos', icon: Image },
        { id: 'offers', name: 'Special Offers', icon: Tag },
        { id: 'announcements', name: 'Announcements', icon: Megaphone }
      ]
    },
    {
      key: 'travelManagement',
      title: 'Travel Management',
      icon: Compass,
      items: [
        { id: 'packages', name: 'Holiday Packages', icon: Package },
        { id: 'trips', name: 'Tours & Trips', icon: Compass },
        { id: 'destinations', name: 'Destinations', icon: MapPin },
        { id: 'categories', name: 'Travel Categories', icon: FolderTree },
        { id: 'activities', name: 'Activities & Passes', icon: Activity },
        { id: 'hotels', name: 'Hotels & Resorts', icon: Hotel },
        { id: 'flights', name: 'Flight Requests', icon: Plane }
      ]
    },
    {
      key: 'bookings',
      title: 'Bookings',
      icon: Calendar,
      items: [
        { id: 'bookings_all', name: 'All Bookings', icon: Calendar },
        { id: 'bookings_pending', name: 'Pending Bookings', icon: Clock },
        { id: 'bookings_confirmed', name: 'Confirmed Bookings', icon: CheckCircle },
        { id: 'bookings_cancelled', name: 'Cancelled Bookings', icon: XCircle },
        { id: 'bookings_completed', name: 'Completed Trips', icon: CheckCheck }
      ]
    },
    {
      key: 'customers',
      title: 'Customers',
      icon: Users,
      items: [
        { id: 'customers_list', name: 'Customers Directory', icon: Users },
        { id: 'users_accounts', name: 'User Accounts', icon: UserCheck }
      ]
    },
    {
      key: 'enquiries',
      title: 'Enquiries',
      icon: MessageSquare,
      items: [
        { id: 'enquiries_travel', name: 'Travel Enquiries', icon: MessageSquare },
        { id: 'contact_messages', name: 'Contact Messages', icon: Mail }
      ]
    },
    {
      key: 'marketing',
      title: 'Marketing',
      icon: Tag,
      items: [
        { id: 'reviews', name: 'Testimonials', icon: Star },
        { id: 'faqs', name: 'FAQs', icon: HelpCircle },
        { id: 'coupons', name: 'Coupons & Promo Codes', icon: Ticket },
        { id: 'promos', name: 'Promotional Banners', icon: Image }
      ]
    },
    {
      key: 'website',
      title: 'Website Settings',
      icon: Columns,
      items: [
        { id: 'nav_menu', name: 'Navigation Menu', icon: Navigation },
        { id: 'footer_config', name: 'Footer Config', icon: Columns },
        { id: 'contact_info', name: 'Contact Information', icon: Phone },
        { id: 'social_links', name: 'Social Links', icon: Share2 },
        { id: 'seo_settings', name: 'SEO Settings', icon: Search }
      ]
    },
    {
      key: 'system',
      title: 'System & Security',
      icon: Shield,
      items: [
        { id: 'admin_users', name: 'Admin Users', icon: UserCog },
        { id: 'roles', name: 'Roles & Permissions', icon: Shield },
        { id: 'activity_logs', name: 'Activity Logs', icon: FileText },
        { id: 'settings', name: 'System Settings', icon: Settings }
      ]
    }
  ];

  return (
    <aside className={`bg-charcoal text-white min-h-screen border-r border-slate-800 transition-all duration-300 flex flex-col shrink-0 ${collapsed ? 'w-20' : 'w-72'}`}>
      
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-md font-black text-xl shrink-0">
            V
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
                VENTOURA <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-primary text-white uppercase tracking-wider">CMS</span>
              </span>
              <span className="text-[11px] text-slate-400 font-medium">Control Console</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-4 px-3 space-y-4 overflow-y-auto no-scrollbar">
        {navGroups.map((group) => {
          if (group.key === 'dashboard') {
            const item = group.items[0];
            const Icon = item.icon;
            const isActive = activeSubTab === item.id;
            return (
              <div key={group.key}>
                <button
                  onClick={() => setActiveSubTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-md'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                  title={item.name}
                >
                  <Icon className="w-4 h-4 shrink-0 text-primary-light" />
                  {!collapsed && <span>{item.name}</span>}
                </button>
              </div>
            );
          }

          const isOpen = openGroups[group.key];
          const hasActiveChild = group.items.some((it) => it.id === activeSubTab);

          return (
            <div key={group.key} className="space-y-1">
              {!collapsed ? (
                <button
                  onClick={() => toggleGroup(group.key)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wider transition-colors ${
                    hasActiveChild ? 'text-primary' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {group.icon && <group.icon className="w-3.5 h-3.5 text-slate-400" />}
                    {group.title}
                  </span>
                  {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                </button>
              ) : (
                <div className="border-t border-slate-800 my-2 pt-2 px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">
                  •••
                </div>
              )}

              {(isOpen || collapsed) && (
                <div className="space-y-0.5">
                  {group.items.map((sub) => {
                    const SubIcon = sub.icon;
                    const isActive = activeSubTab === sub.id;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => setActiveSubTab(sub.id)}
                        className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                          isActive
                            ? 'bg-primary text-white font-bold shadow'
                            : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                        }`}
                        title={sub.name}
                      >
                        <SubIcon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                        {!collapsed && <span className="truncate">{sub.name}</span>}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Admin Footer Badge */}
      {!collapsed && (
        <div className="p-4 border-t border-slate-800 bg-slate-900/60 text-[11px] text-slate-400 text-center">
          <p className="font-semibold text-slate-300">Ventoura CMS v2.4</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Real-time MERN Database Control</p>
        </div>
      )}
    </aside>
  );
};

export default AdminSidebar;
