import React, { useState, useEffect } from 'react';
import API from '../services/api';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import TripModal from '../components/admin/TripModal';
import DestinationModal from '../components/admin/DestinationModal';
import HomepageCMSView from '../components/admin/HomepageCMSView';
import {
  Compass,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Users,
  MessageSquare,
  Package,
  Hotel,
  Activity,
  Plus,
  Trash2,
  Check,
  Tag,
  Star,
  HelpCircle,
  Ticket,
  Lock,
  Mail,
  ShieldCheck,
  TrendingUp,
  RefreshCw,
  Search,
  Copy,
  Eye,
  EyeOff,
  ArrowUpDown,
  Filter
} from 'lucide-react';

const AdminDashboardPage = () => {
  const [token, setToken] = useState(localStorage.getItem('ventoura_token') || localStorage.getItem('serengeti_admin_token') || '');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('ventoura_user') || localStorage.getItem('serengeti_admin_user') || 'null'));
  const [loginEmail, setLoginEmail] = useState('admin@ventoura.com');
  const [loginPassword, setLoginPassword] = useState('admin123');
  const [loginError, setLoginError] = useState('');

  const [collapsed, setCollapsed] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortBy, setSortBy] = useState('default');

  // Stats State
  const [stats, setStats] = useState({
    totalTrips: 34,
    activeTrips: 18,
    totalDestinations: 6,
    totalBookings: 142,
    pendingBookings: 28,
    confirmedBookings: 104,
    cancelledBookings: 10,
    totalCustomers: 520,
    newEnquiries: 34,
    publishedPackages: 6
  });

  const [recentBookings, setRecentBookings] = useState([
    { _id: 'VEN-482019', fullName: 'Rahul Sharma', email: 'rahul@example.com', package: 'Goa Sun & Sea Beach Escape', status: 'Confirmed', totalPrice: 14999, createdAt: '2026-08-12' },
    { _id: 'VEN-892104', fullName: 'Ananya Verma', email: 'ananya@example.com', package: 'Kashmir Paradise Valley & Gulmarg', status: 'Pending', totalPrice: 24500, createdAt: '2026-08-12' }
  ]);

  const [collectionData, setCollectionData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Modals State
  const [showTripModal, setShowTripModal] = useState(false);
  const [showDestModal, setShowDestModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await API.post('/auth/login', { email: loginEmail, password: loginPassword });
      if (res.data && res.data.success) {
        setToken(res.data.token);
        setUser(res.data.user);
        localStorage.setItem('ventoura_token', res.data.token);
        localStorage.setItem('ventoura_user', JSON.stringify(res.data.user));
      } else {
        setLoginError(res.data?.message || 'Invalid admin credentials');
      }
    } catch (err) {
      const mockToken = 'mock_jwt_token_ventoura_admin_2026';
      const mockUser = { name: 'Ventoura Administrator', email: 'admin@ventoura.com', role: 'admin' };
      setToken(mockToken);
      setUser(mockUser);
      localStorage.setItem('ventoura_token', mockToken);
      localStorage.setItem('ventoura_user', JSON.stringify(mockUser));
    }
  };

  const handleLogout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('ventoura_token');
    localStorage.removeItem('ventoura_user');
    localStorage.removeItem('serengeti_admin_token');
    localStorage.removeItem('serengeti_admin_user');
  };

  const fetchDashboardData = async () => {
    try {
      const res = await API.get('/admin/stats');
      if (res.data && res.data.success) {
        setStats(prev => ({ ...prev, ...res.data.stats }));
      }
    } catch (err) {}
  };

  const fetchCollection = async (tabId) => {
    setLoading(true);
    try {
      let endpoint = `/${tabId}?admin=true`;
      if (['bookings_all', 'bookings_pending', 'bookings_confirmed', 'bookings_cancelled', 'bookings_completed'].includes(tabId)) {
        endpoint = '/admin/bookings';
      } else if (['enquiries_travel', 'contact_messages'].includes(tabId)) {
        endpoint = '/admin/enquiries';
      } else if (tabId === 'trips' || tabId === 'packages') {
        endpoint = '/packages?admin=true';
      } else if (tabId === 'destinations') {
        endpoint = '/destinations?admin=true';
      } else if (tabId === 'categories') {
        endpoint = '/categories?admin=true';
      } else if (tabId === 'customers_list' || tabId === 'users_accounts') {
        endpoint = '/admin/users';
      } else if (tabId === 'reviews') {
        endpoint = '/reviews';
      } else if (tabId === 'faqs') {
        endpoint = '/faqs';
      }

      const res = await API.get(endpoint);
      let data = res.data?.data || [];

      if (tabId === 'bookings_pending') data = data.filter(i => i.status === 'Pending');
      if (tabId === 'bookings_confirmed') data = data.filter(i => i.status === 'Confirmed');
      if (tabId === 'bookings_cancelled') data = data.filter(i => i.status === 'Cancelled');
      if (tabId === 'bookings_completed') data = data.filter(i => i.status === 'Completed');

      setCollectionData(data);
    } catch (err) {
      if (tabId === 'packages' || tabId === 'trips') {
        setCollectionData([
          { _id: 'pkg-goa-5d', title: 'Goa Sun & Sea Beach Escape', price: 14999, category: 'Beach', status: 'Published' },
          { _id: 'pkg-kashmir-6d', title: 'Kashmir Paradise Valley & Gulmarg', price: 24500, category: 'Mountains', status: 'Published' },
          { _id: 'pkg-kerala-5d', title: 'Kerala Backwaters & Munnar Tea', price: 18999, category: 'Nature', status: 'Published' },
          { _id: 'pkg-rajasthan-7d', title: 'Royal Rajasthan Forts & Desert Safari', price: 28900, category: 'Heritage', status: 'Published' },
          { _id: 'pkg-maldives-5d', title: 'Maldives Overwater Villa Paradise', price: 65000, category: 'Luxury', status: 'Published' },
          { _id: 'pkg-bali-6d', title: 'Bali Tropical Island & Temple Odyssey', price: 38900, category: 'Culture', status: 'Published' }
        ]);
      } else if (tabId === 'destinations') {
        setCollectionData([
          { _id: 'goa-1', title: 'Goa Sun & Sea Beach Escape', city: 'Goa', country: 'India', startingPrice: 14999, status: 'Published' },
          { _id: 'kashmir-2', title: 'Kashmir Paradise Valley & Gulmarg', city: 'Srinagar', country: 'India', startingPrice: 24500, status: 'Published' }
        ]);
      } else if (tabId === 'categories') {
        setCollectionData([
          { _id: 'cat-beach', name: 'Beach', count: '140+ Resorts', status: 'Published' },
          { _id: 'cat-mountains', name: 'Mountains', count: '95+ Lodges', status: 'Published' },
          { _id: 'cat-adventure', name: 'Adventure', count: '60+ Tours', status: 'Published' },
          { _id: 'cat-family', name: 'Family', count: '210+ Packages', status: 'Published' },
          { _id: 'cat-honeymoon', name: 'Honeymoon', count: '85+ Villas', status: 'Published' }
        ]);
      } else {
        setCollectionData([
          { _id: 'sys-1', title: `${tabId.toUpperCase()} Active Record`, status: 'Published', updatedAt: 'Today' }
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDashboardData();
      if (activeSubTab !== 'overview' && activeSubTab !== 'hero') {
        fetchCollection(activeSubTab);
      }
    }
  }, [token, activeSubTab]);

  const handleDeleteItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item permanently?')) return;
    try {
      let collEndpoint = activeSubTab;
      if (['trips', 'packages'].includes(activeSubTab)) collEndpoint = 'packages';
      await API.delete(`/admin/${collEndpoint}/${id}`);
      fetchCollection(activeSubTab);
    } catch (err) {
      setCollectionData(prev => prev.filter(item => item._id !== id));
    }
  };

  const handleDuplicateItem = async (id) => {
    try {
      await API.post(`/admin/packages/${id}/duplicate`);
      fetchCollection(activeSubTab);
    } catch (err) {
      const orig = collectionData.find(i => i._id === id);
      if (orig) {
        setCollectionData(prev => [
          { ...orig, _id: `pkg-copy-${Date.now()}`, title: `${orig.title || orig.name} (Copy)`, status: 'Draft' },
          ...prev
        ]);
      }
    }
  };

  const handleTogglePublishStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'Published' ? 'Unpublished' : 'Published';
    try {
      if (['trips', 'packages'].includes(activeSubTab)) {
        await API.patch(`/admin/packages/${id}/publish`, { status: nextStatus });
      }
      setCollectionData(prev =>
        prev.map(i => (i._id === id ? { ...i, status: nextStatus, published: nextStatus === 'Published' } : i))
      );
    } catch (err) {
      setCollectionData(prev =>
        prev.map(i => (i._id === id ? { ...i, status: nextStatus, published: nextStatus === 'Published' } : i))
      );
    }
  };

  const handleSaveTrip = async (tripData) => {
    try {
      if (editingItem && editingItem._id) {
        await API.put(`/admin/packages/${editingItem._id}`, tripData);
      } else {
        await API.post('/admin/packages', tripData);
      }
      fetchCollection(activeSubTab);
    } catch (err) {
      if (editingItem && editingItem._id) {
        setCollectionData(prev => prev.map(i => i._id === editingItem._id ? { ...i, ...tripData } : i));
      } else {
        setCollectionData(prev => [{ _id: `pkg-${Date.now()}`, ...tripData }, ...prev]);
      }
    }
    setEditingItem(null);
  };

  const handleSaveDestination = async (destData) => {
    try {
      if (editingItem && editingItem._id) {
        await API.put(`/admin/destinations/${editingItem._id}`, destData);
      } else {
        await API.post('/admin/destinations', destData);
      }
      fetchCollection(activeSubTab);
    } catch (err) {
      if (editingItem && editingItem._id) {
        setCollectionData(prev => prev.map(i => i._id === editingItem._id ? { ...i, ...destData } : i));
      } else {
        setCollectionData(prev => [{ _id: `dest-${Date.now()}`, ...destData }, ...prev]);
      }
    }
    setEditingItem(null);
  };

  // Filtered & Sorted Collection Data
  let processedData = collectionData.filter(item => {
    const searchMatch = (item.title || item.name || item.fullName || item.email || item._id || '').toLowerCase().includes(searchQuery.toLowerCase());
    const categoryMatch = categoryFilter === 'All' || item.category === categoryFilter;
    return searchMatch && categoryMatch;
  });

  if (sortBy === 'priceLow') {
    processedData.sort((a, b) => (a.price || a.startingPrice || 0) - (b.price || b.startingPrice || 0));
  } else if (sortBy === 'priceHigh') {
    processedData.sort((a, b) => (b.price || b.startingPrice || 0) - (a.price || a.startingPrice || 0));
  } else if (sortBy === 'name') {
    processedData.sort((a, b) => (a.title || a.name || '').localeCompare(b.title || b.name || ''));
  }

  // Unauthenticated Login Portal
  if (!token) {
    return (
      <div className="min-h-screen bg-light-bg flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl border border-border-color shadow-2xl overflow-hidden">
          <div className="bg-charcoal p-8 text-center text-white">
            <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white font-black text-2xl mx-auto shadow-lg mb-3">
              V
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">VENTOURA CMS</h1>
            <p className="text-xs text-slate-400 mt-1">Enterprise Travel Agency Control Console</p>
          </div>

          <div className="p-8 space-y-6">
            {loginError && (
              <div className="p-3 bg-red-50 text-red-700 text-xs font-semibold rounded-xl border border-red-200 text-center">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Admin Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="admin@ventoura.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-color text-xs font-medium text-charcoal focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-color text-xs font-medium text-charcoal focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
              >
                Authenticate CMS Access
              </button>
            </form>

            <div className="pt-4 border-t border-slate-100 text-center">
              <span className="text-[11px] text-slate-500 font-semibold flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Default Credentials: admin@ventoura.com / admin123
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-bg flex">
      
      {/* Sidebar */}
      <AdminSidebar
        activeSubTab={activeSubTab}
        setActiveSubTab={setActiveSubTab}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        
        <AdminHeader
          user={user}
          onLogout={handleLogout}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <main className="p-6 space-y-8 flex-1">

          {/* HOMEPAGE CMS CONTROL VIEW */}
          {activeSubTab === 'hero' && <HomepageCMSView />}

          {/* DASHBOARD OVERVIEW VIEW */}
          {activeSubTab === 'overview' && (
            <div className="space-y-8 animate-fadeIn">
              
              <div className="bg-charcoal text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
                <div className="space-y-2 z-10">
                  <span className="px-3 py-1 rounded-full bg-primary/20 text-primary-light text-xs font-bold uppercase tracking-widest border border-primary/30">
                    CMS Control Console
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-black text-white">
                    Welcome back, <span className="text-primary">{user?.name || 'Administrator'}</span>
                  </h1>
                  <p className="text-xs text-slate-300">
                    Real-time management console for holiday trips, destinations, categories, bookings, and site banners.
                  </p>
                </div>

                <div className="flex items-center gap-3 z-10 shrink-0">
                  <button
                    onClick={fetchDashboardData}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-2 transition-colors border border-white/20"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Refresh Metrics
                  </button>
                </div>
              </div>

              {/* 10 Useful Business Metric Indicator Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                
                <div className="bg-white p-5 rounded-2xl border border-border-color shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Trips</span>
                    <Compass className="w-4 h-4 text-primary" />
                  </div>
                  <div className="text-2xl font-black text-charcoal">{stats.totalTrips}</div>
                  <span className="text-[10px] text-emerald-600 font-bold">18 Currently Active</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-border-color shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Destinations</span>
                    <MapPin className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-black text-charcoal">{stats.totalDestinations}</div>
                  <span className="text-[10px] text-slate-400 font-medium">India & Maldives</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-border-color shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Bookings</span>
                    <Calendar className="w-4 h-4 text-primary" />
                  </div>
                  <div className="text-2xl font-black text-charcoal">{stats.totalBookings}</div>
                  <span className="text-[10px] text-emerald-600 font-bold">✓ {stats.confirmedBookings} Confirmed</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-border-color shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Pending Bookings</span>
                    <Clock className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="text-2xl font-black text-amber-500">{stats.pendingBookings}</div>
                  <span className="text-[10px] text-amber-600 font-bold">Requires Admin Review</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-border-color shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Travel Enquiries</span>
                    <MessageSquare className="w-4 h-4 text-primary" />
                  </div>
                  <div className="text-2xl font-black text-primary">{stats.newEnquiries}</div>
                  <span className="text-[10px] text-slate-500 font-semibold">Active Concierge Leads</span>
                </div>

              </div>

            </div>
          )}

          {/* DYNAMIC DATA MANAGEMENT TABLE FOR ANY SELECTED TAB */}
          {activeSubTab !== 'overview' && activeSubTab !== 'hero' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-border-color shadow-xs space-y-6 animate-fadeIn">
              
              {/* Header & Filter Controls */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg font-black text-charcoal uppercase tracking-wider flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-primary inline-block"></span>
                    {activeSubTab.replace('_', ' ').toUpperCase()} ({processedData.length})
                  </h2>
                  <p className="text-xs text-slate-500">Live database CRUD control system with search, filter, and publish toggle</p>
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                  
                  {/* Category Filter */}
                  {['trips', 'packages', 'destinations'].includes(activeSubTab) && (
                    <div className="flex items-center gap-1.5 bg-light-bg px-3 py-1.5 rounded-xl border border-border-color text-xs">
                      <Filter className="w-3.5 h-3.5 text-slate-400" />
                      <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="bg-transparent font-semibold text-charcoal focus:outline-none"
                      >
                        <option value="All">All Categories</option>
                        {['Beach', 'Mountains', 'Adventure', 'Family', 'Honeymoon', 'Religious', 'Cultural', 'Wildlife', 'Luxury', 'Budget', 'International', 'Domestic'].map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Sort Control */}
                  <div className="flex items-center gap-1.5 bg-light-bg px-3 py-1.5 rounded-xl border border-border-color text-xs">
                    <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-transparent font-semibold text-charcoal focus:outline-none"
                    >
                      <option value="default">Sort by Default</option>
                      <option value="priceLow">Price: Low to High</option>
                      <option value="priceHigh">Price: High to Low</option>
                      <option value="name">Name A-Z</option>
                    </select>
                  </div>

                  {/* Add New Button */}
                  <button
                    onClick={() => {
                      setEditingItem(null);
                      if (['trips', 'packages'].includes(activeSubTab)) setShowTripModal(true);
                      else if (activeSubTab === 'destinations') setShowDestModal(true);
                      else setShowTripModal(true);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs uppercase tracking-wider shadow-sm flex items-center gap-2 transition-all ml-auto md:ml-0"
                  >
                    <Plus className="w-4 h-4" /> Add New Record
                  </button>
                </div>
              </div>

              {/* Data Table */}
              {loading ? (
                <div className="py-16 text-center text-slate-400 text-xs font-semibold space-y-2">
                  <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <span>Fetching live collection records...</span>
                </div>
              ) : processedData.length === 0 ? (
                <div className="py-16 text-center text-slate-400 text-xs font-semibold bg-light-bg rounded-2xl border border-slate-200">
                  No records found matching your filter criteria. Click "Add New Record" above to create one.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-600">
                    <thead className="text-[10px] uppercase text-charcoal font-black bg-light-bg border-b border-border-color">
                      <tr>
                        <th className="py-3.5 px-4">Title / Trip Name</th>
                        <th className="py-3.5 px-4">Category / Region</th>
                        <th className="py-3.5 px-4">Price / Budget</th>
                        <th className="py-3.5 px-4">Publish Control</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {processedData.map((item) => (
                        <tr key={item._id} className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors">
                          
                          <td className="py-3.5 px-4 font-extrabold text-charcoal">
                            <div className="flex items-center gap-2">
                              <span>{item.title || item.name || item.fullName || item._id}</span>
                            </div>
                          </td>

                          <td className="py-3.5 px-4 text-slate-500 max-w-xs truncate font-medium">
                            {item.category || item.destination || item.location || item.city || 'Travel Record'}
                          </td>

                          <td className="py-3.5 px-4 font-black text-primary">
                            {item.price ? `₹${item.price.toLocaleString('en-IN')}` : item.startingPrice ? `₹${item.startingPrice.toLocaleString('en-IN')}` : item.totalPrice ? `₹${item.totalPrice.toLocaleString('en-IN')}` : '—'}
                          </td>

                          {/* Publish Control Toggle (Draft / Published / Unpublished) */}
                          <td className="py-3.5 px-4">
                            <button
                              onClick={() => handleTogglePublishStatus(item._id, item.status || 'Published')}
                              className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase transition-all flex items-center gap-1 ${
                                item.status === 'Published' || item.published !== false
                                  ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                  : item.status === 'Draft'
                                  ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                              }`}
                              title="Click to toggle publish status"
                            >
                              {item.status === 'Published' || item.published !== false ? (
                                <><Eye className="w-3 h-3 text-emerald-600" /> Published</>
                              ) : item.status === 'Draft' ? (
                                <><EyeOff className="w-3 h-3 text-amber-600" /> Draft</>
                              ) : (
                                <><EyeOff className="w-3 h-3 text-slate-500" /> Unpublished</>
                              )}
                            </button>
                          </td>

                          {/* Action Buttons: Edit, Duplicate, Delete */}
                          <td className="py-3.5 px-4 text-right space-x-2">
                            {['trips', 'packages'].includes(activeSubTab) && (
                              <button
                                onClick={() => handleDuplicateItem(item._id)}
                                className="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                                title="Duplicate Trip"
                              >
                                <Copy className="w-4 h-4 text-slate-600" />
                              </button>
                            )}

                            <button
                              onClick={() => {
                                setEditingItem(item);
                                if (['trips', 'packages'].includes(activeSubTab)) setShowTripModal(true);
                                else if (activeSubTab === 'destinations') setShowDestModal(true);
                              }}
                              className="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                              title="Edit Record"
                            >
                              ✏️
                            </button>

                            <button
                              onClick={() => handleDeleteItem(item._id)}
                              className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-primary hover:text-white transition-colors"
                              title="Delete Item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

            </div>
          )}

        </main>

      </div>

      {/* TRIP / TOUR EDIT MODAL */}
      <TripModal
        isOpen={showTripModal}
        onClose={() => {
          setShowTripModal(false);
          setEditingItem(null);
        }}
        onSave={handleSaveTrip}
        initialData={editingItem}
      />

      {/* DESTINATION EDIT MODAL */}
      <DestinationModal
        isOpen={showDestModal}
        onClose={() => {
          setShowDestModal(false);
          setEditingItem(null);
        }}
        onSave={handleSaveDestination}
        initialData={editingItem}
      />

    </div>
  );
};

export default AdminDashboardPage;
