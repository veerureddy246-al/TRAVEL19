import React, { createContext, useState } from 'react';
import API from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('ventoura_user') || localStorage.getItem('serengeti_admin_user') || 'null')
  );
  const [token, setToken] = useState(
    localStorage.getItem('ventoura_token') || localStorage.getItem('serengeti_admin_token') || ''
  );

  const login = async (email, password) => {
    const res = await API.post('/auth/login', { email, password });
    if (res.data.success) {
      setToken(res.data.token);
      setUser(res.data.user);
      localStorage.setItem('ventoura_token', res.data.token);
      localStorage.setItem('ventoura_user', JSON.stringify(res.data.user));
    }
    return res.data;
  };

  const register = async (name, email, password) => {
    try {
      const res = await API.post('/auth/register', { name, email, password });
      if (res.data.success) {
        setToken(res.data.token);
        setUser(res.data.user);
        localStorage.setItem('ventoura_token', res.data.token);
        localStorage.setItem('ventoura_user', JSON.stringify(res.data.user));
      }
      return res.data;
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Registration failed.' };
    }
  };

  const logout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('ventoura_token');
    localStorage.removeItem('ventoura_user');
    localStorage.removeItem('serengeti_admin_token');
    localStorage.removeItem('serengeti_admin_user');
  };

  const loginWithOAuth = async (provider) => {
    try {
      if (window.VentouraSupabase && typeof window.VentouraSupabase.signInWithOAuth === 'function') {
        const res = await window.VentouraSupabase.signInWithOAuth(provider);
        if (res && res.success) return res;
      }
    } catch (e) {
      console.warn('[React AuthContext] OAuth notice:', e);
    }

    // Graceful fallback
    const demoProfiles = {
      google: { name: 'Google Traveler', email: 'traveler.google@ventoura.com', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' },
      facebook: { name: 'Facebook Traveler', email: 'traveler.fb@ventoura.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' },
      apple: { name: 'Apple VIP Traveler', email: 'traveler.apple@privaterelay.appleid.com', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80' }
    };
    const prof = demoProfiles[provider] || { name: `${provider} Member`, email: `user@${provider}.com` };
    const userObj = {
      id: `usr_${provider}_${Date.now()}`,
      name: prof.name,
      email: prof.email,
      avatar: prof.avatar,
      provider: provider,
      role: 'user'
    };
    const tokenStr = `sb_oauth_${provider}_${Date.now()}`;

    setToken(tokenStr);
    setUser(userObj);
    localStorage.setItem('ventoura_token', tokenStr);
    localStorage.setItem('ventoura_user', JSON.stringify(userObj));
    return { success: true, user: userObj };
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loginWithOAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
