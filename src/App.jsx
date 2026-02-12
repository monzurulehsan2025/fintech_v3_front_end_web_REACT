import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCard,
  TrendingUp,
  Gift,
  ShieldCheck,
  Plane,
  Coffee,
  LayoutDashboard,
  Bell,
  Search,
  ChevronRight,
  User,
  LogOut,
  Car,
  Hotel,
  Shield
} from 'lucide-react';
import { cardData, metrics, benefits } from './mockData';
import './index.css';

const IconMap = {
  Lounge: Plane,
  Hotel: Hotel,
  Car: Car,
  Shield: Shield
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 flex flex-col gap-8 p-6" style={{ borderRight: '1px solid var(--glass-border)', backgroundColor: 'var(--background)' }}>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center font-bold" style={{ width: 32, height: 32, backgroundColor: 'var(--accent-blue)', borderRadius: 8 }}>N</div>
          <span className="text-sm font-bold tracking-tight">NOVA PLATINUM</span>
        </div>

        <nav className="flex flex-col gap-2">
          <SidebarLink active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={<LayoutDashboard size={18} />} label="Overview" />
          <SidebarLink active={activeTab === 'membership'} onClick={() => setActiveTab('membership')} icon={<Gift size={18} />} label="Membership" />
          <SidebarLink icon={<TrendingUp size={18} />} label="Spend Analysis" />
          <SidebarLink icon={<Bell size={18} />} label="Notifications" />
        </nav>

        <div className="flex-1"></div>
        <div style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--glass-border)' }}>
          <SidebarLink icon={<LogOut size={18} />} label="Sign Out" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8" style={{ background: 'linear-gradient(135deg, #0a0e17 0%, #1a202c 100%)' }}>
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="gradient-text">Welcome back, Alex</h1>
            <p className="text-xs text-gray-400 mt-1">Your account is in good standing.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center px-4 py-2 rounded-full" style={{ backgroundColor: 'var(--glass)', border: '1px solid var(--glass-border)' }}>
              <Search size={16} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                style={{ background: 'none', border: 'none', color: 'white', paddingLeft: 8, outline: 'none', fontSize: '0.875rem' }}
              />
            </div>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(to top right, #0070f3, #4f46e5)', display: 'flex', alignItems: 'center', justifyCenter: 'center', border: '2px solid rgba(255,255,255,0.2)' }}>
              <User size={20} style={{ margin: 'auto' }} />
            </div>
          </div>
        </header>

        <motion.div
          className="nova-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Top Section */}
          <div className="lg-grid-layout mb-8">
            {/* Card Visual */}
            <motion.div variants={itemVariants} className="glass-card flex flex-col justify-between" style={{ minHeight: 220, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -40, right: -40, width: 120, height: 120, backgroundColor: 'rgba(0,112,243,0.1)', filter: 'blur(40px)', borderRadius: '50%' }}></div>
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold tracking-widest text-blue-400">PLATINUM</span>
                <img src="/logo.png" alt="Nova Finance" className="card-logo" />
              </div>
              <div>
                <div style={{ fontSize: '1.25rem', letterSpacing: '0.2em', fontFamily: 'monospace', marginBottom: '1.5rem' }}>{cardData.number}</div>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-xs text-gray-400">HOLDER</div>
                    <div className="text-sm font-bold">{cardData.holder}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="text-xs text-gray-400">EXPIRES</div>
                    <div className="text-sm font-bold">{cardData.expiry}</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
              {metrics.map((m, i) => (
                <motion.div key={i} variants={itemVariants} className="glass-card">
                  <span className="text-xs text-gray-400">{m.label}</span>
                  <div className="stat-value">{m.value}</div>
                  <span className={`text-xs ${m.type === 'alert' ? 'text-orange-400' : 'text-emerald-400'}`}>{m.sub}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom Section - Benefits */}
          <motion.div variants={itemVariants} className="glass-card">
            <div className="flex justify-between items-center mb-6">
              <h3 className="gold-gradient">Elite Benefits</h3>
              <span className="text-xs text-blue-400 font-bold cursor-pointer">View All</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {benefits.map((benefit) => {
                const Icon = IconMap[benefit.icon] || Gift;
                return (
                  <div key={benefit.id} className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all cursor-pointer border border-white/5">
                    <div className="flex items-center justify-center" style={{ width: 44, height: 44, backgroundColor: 'rgba(0,112,243,0.1)', borderRadius: 12, color: 'var(--accent-blue)' }}>
                      <Icon size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold">{benefit.title}</div>
                      <div className="text-xs text-gray-400">{benefit.desc}</div>
                    </div>
                    <ChevronRight size={14} className="text-gray-400" />
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

const SidebarLink = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`sidebar-btn ${active ? 'active' : ''}`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

export default Dashboard;
