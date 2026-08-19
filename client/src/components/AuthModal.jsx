import React, { useState, useContext, useEffect } from 'react';
import { X, Lock, Mail, User, CheckCircle2, ShieldCheck } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register, loginWithOAuth } = useContext(AuthContext);

  // Escape key to close
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSocialLogin = async (provider) => {
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      if (loginWithOAuth) {
        const res = await loginWithOAuth(provider);
        if (res && res.success) {
          const pName = provider.charAt(0).toUpperCase() + provider.slice(1);
          setSuccess(`Authenticated with ${pName}! Welcome.`);
          setTimeout(() => onClose(), 1000);
        }
      }
    } catch (err) {
      setError(`Failed to sign in with ${provider}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (isLogin) {
        const res = await login(email, password);
        if (res && res.success) {
          setSuccess('Successfully logged in! Welcome back.');
          setTimeout(() => onClose(), 1200);
        } else {
          setError(res?.message || 'Invalid email or password.');
        }
      } else {
        const res = await register(name, email, password);
        if (res && res.success) {
          setSuccess('Account created! You are now logged in.');
          setTimeout(() => onClose(), 1200);
        } else {
          setError(res?.message || 'Registration failed. Please try again.');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAdminFill = () => {
    setEmail('admin@ventoura.com');
    setPassword('admin123');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#0f172a] rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-white/10 relative text-slate-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0369a1] to-[#0284c7] p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-3">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-black text-white">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="text-xs text-white/80 mt-1">
            {isLogin ? 'Sign in to access your bookings & rewards' : 'Join Ventoura for exclusive flight & hotel deals'}
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-900/30 text-red-300 text-xs font-semibold rounded-xl border border-red-500/30">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 bg-emerald-900/30 text-emerald-300 text-xs font-semibold rounded-xl border border-emerald-500/30 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              {success}
            </div>
          )}

          {/* Social OAuth Buttons */}
          <div className="space-y-2.5">
            <button
              type="button"
              disabled={loading}
              onClick={() => handleSocialLogin('google')}
              className="w-full py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2.5 transition-all disabled:opacity-50 cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
              <span>Continue with Google</span>
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => handleSocialLogin('facebook')}
              className="w-full py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2.5 transition-all disabled:opacity-50 cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              <span>Continue with Facebook</span>
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => handleSocialLogin('apple')}
              className="w-full py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2.5 transition-all disabled:opacity-50 cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.86c.66-.8 1.11-1.91.99-3.03-.96.04-2.12.64-2.8 1.44-.59.69-1.12 1.83-.98 2.92 1.07.08 2.15-.55 2.79-1.33z"/></svg>
              <span>Continue with Apple</span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-3">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">or sign in with email</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {!isLogin && (
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-[#38bdf8]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-[#38bdf8]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-[#38bdf8]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0284c7] to-[#0369a1] hover:brightness-110 text-white font-bold text-sm uppercase tracking-wider shadow-lg transition-all disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Quick Demo Credentials Pill */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={handleQuickAdminFill}
              className="text-slate-400 hover:text-[#38bdf8] font-medium flex items-center gap-1 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#38bdf8]" />
              Fill Admin Credentials
            </button>

            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setSuccess('');
              }}
              className="text-[#38bdf8] font-bold hover:underline cursor-pointer"
            >
              {isLogin ? 'Need an account? Register' : 'Already have account? Login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
