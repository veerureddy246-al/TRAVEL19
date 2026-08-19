import React from 'react';
import { Search, Bell, ExternalLink, LogOut, ShieldCheck, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminHeader = ({ user, onLogout, collapsed, setCollapsed, searchQuery, setSearchQuery }) => {
  return (
    <header className="bg-white border-b border-border-color sticky top-0 z-30 px-6 py-3.5 flex items-center justify-between shadow-xs">
      
      {/* Left: Sidebar Toggle & Quick Web Link */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-charcoal transition-colors"
          title="Toggle Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Link
          to="/"
          target="_blank"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-light-bg hover:bg-slate-200/60 text-slate-700 text-xs font-bold transition-colors border border-slate-200"
        >
          <ExternalLink className="w-3.5 h-3.5 text-primary" />
          View Live Website
        </Link>
      </div>

      {/* Center: Global Search Filter */}
      <div className="relative w-72 hidden md:block">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter CMS entries, bookings, enquiries..."
          className="w-full pl-9 pr-4 py-1.5 rounded-xl border border-border-color text-xs font-medium text-charcoal focus:outline-none focus:border-primary bg-light-bg"
        />
      </div>

      {/* Right: Notifications & Admin Profile */}
      <div className="flex items-center gap-4">
        
        {/* Notifications */}
        <button className="relative p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-charcoal transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary ring-2 ring-white"></span>
        </button>

        {/* User Info */}
        <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
          <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary font-bold flex items-center justify-center border border-primary/20 text-sm">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
          </div>

          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-extrabold text-charcoal flex items-center gap-1">
              {user?.name || 'Administrator'}
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            </span>
            <span className="text-[10px] text-slate-500 font-semibold">{user?.email || 'admin@ventoura.com'}</span>
          </div>

          <button
            onClick={onLogout}
            className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-primary hover:text-white transition-colors ml-1"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};

export default AdminHeader;
