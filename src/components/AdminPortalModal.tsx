import React, { useState } from 'react';
import { 
  X, 
  Terminal, 
  ShieldCheck, 
  Flame, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Database,
  Lock,
  Radio,
  Cpu,
  Sparkles,
  UtensilsCrossed,
  Layers,
  ChefHat,
  DollarSign
} from 'lucide-react';

export interface KitchenTicket {
  id: string;
  orderNumber: string;
  customerName: string;
  items: string[];
  total: number;
  status: 'received' | 'on_grill' | 'plating' | 'ready' | 'dispatched';
  timestamp: string;
  orderType: 'Dine-In' | 'Takeout' | 'VIP Counter';
}

export interface MenuItemInventory {
  id: string;
  name: string;
  category: string;
  price: number;
  stockStatus: 'available' | 'low_stock' | 'sold_out';
  grillTemp: string;
  fatRatio: string;
}

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  tickets: KitchenTicket[];
  menuItems: MenuItemInventory[];
  onUpdateTicketStatus: (id: string, newStatus: KitchenTicket['status']) => void;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({ 
  isOpen, 
  onClose,
  tickets,
  menuItems,
  onUpdateTicketStatus
}) => {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState<'kds' | 'menu' | 'inventory' | 'telemetry'>('kds');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === 'burger2026') {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleAutoFill = () => {
    setPasscode('burger2026');
    setIsAuthenticated(true);
    setError(false);
  };

  const grillStations = [
    { id: 'STATION-01', name: 'Cast-Iron Flat-Top Alpha (450°F)', load: '88%', temp: '452°F', task: 'Caramelizing 6x Prime Double Smashes' },
    { id: 'STATION-02', name: 'Cast-Iron Flat-Top Beta (450°F)', load: '65%', temp: '448°F', task: 'Gochujang Soy Reduction Glazing' },
    { id: 'STATION-03', name: 'Brioche Toasting Carousel', load: '40%', temp: '380°F', task: 'Butter-Steaming 8x Seeded Crowns' },
    { id: 'STATION-04', name: 'Tallow Fry Station (Wagyu Fat)', load: '72%', temp: '365°F', task: 'Triple-Cooking Robust Wedges' }
  ];

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
      <div className="relative w-full max-w-4xl bg-[#08080A] border border-[#E1FF01]/40 shadow-[0_0_50px_rgba(225,255,1,0.2)] rounded-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/90">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#E1FF01] rounded-full animate-ping" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#E1FF01] font-bold flex items-center gap-2">
              <Terminal size={14} /> BURGER_LAB_OS // KITCHEN_DISPATCH_GATE
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Area */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#E1FF01]/10 border border-[#E1FF01]/30 flex items-center justify-center text-[#E1FF01] mb-6 shadow-[0_0_30px_rgba(225,255,1,0.15)]">
              <Lock size={28} />
            </div>
            
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mb-2 font-mono">
              KITCHEN DISPLAY SYSTEM // OPERATOR ACCESS
            </h2>
            <p className="text-base text-zinc-200 leading-relaxed max-w-md mb-8">
              Frictionless demo gate active. Use the 1-click bypass button below or enter preset passkey <code className="text-[#E1FF01] bg-[#E1FF01]/10 px-2 py-0.5 rounded font-mono">burger2026</code>.
            </p>

            <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
              <div className="relative">
                <input 
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode..."
                  className="w-full bg-black/60 border border-white/15 focus:border-[#E1FF01] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-[#E1FF01] font-mono text-center tracking-widest"
                />
              </div>

              {error && (
                <div className="flex items-center justify-center gap-2 text-rose-400 text-xs font-mono">
                  <AlertCircle size={14} />
                  <span>ACCESS DENIED // INVALID CODE</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#E1FF01] hover:bg-[#c8e600] text-black font-black uppercase tracking-wider py-3 rounded-xl text-base font-semibold min-h-[44px] transition-all duration-200 font-mono shadow-[0_0_20px_rgba(225,255,1,0.3)] active:scale-95 cursor-pointer"
              >
                Authenticate Operator
              </button>

              {/* 1-Click Auto-Fill Demo Bypass */}
              <button
                type="button"
                onClick={handleAutoFill}
                className="w-full bg-white/5 hover:bg-white/10 text-[#E1FF01] border border-[#E1FF01]/30 hover:border-[#E1FF01]/60 font-mono text-base font-semibold min-h-[44px] uppercase tracking-wider py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles size={14} />
                <span>1-Click Auto-Fill Demo Passkey (`burger2026`)</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Operator Nav Strip */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 bg-black/40 font-mono text-xs overflow-x-auto">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('kds')}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-2 ${
                    activeTab === 'kds' 
                      ? 'bg-[#E1FF01] text-black font-black shadow-[0_0_15px_rgba(225,255,1,0.3)]' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Flame size={13} />
                  <span>KDS TICKETS ({tickets.length})</span>
                </button>
                <button
                  onClick={() => setActiveTab('menu')}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-2 ${
                    activeTab === 'menu' 
                      ? 'bg-[#E1FF01] text-black font-black shadow-[0_0_15px_rgba(225,255,1,0.3)]' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <UtensilsCrossed size={13} />
                  <span>MENU & ALLERGENS</span>
                </button>
                <button
                  onClick={() => setActiveTab('inventory')}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-2 ${
                    activeTab === 'inventory' 
                      ? 'bg-[#E1FF01] text-black font-black shadow-[0_0_15px_rgba(225,255,1,0.3)]' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Layers size={13} />
                  <span>STATION METRICS</span>
                </button>
                <button
                  onClick={() => setActiveTab('telemetry')}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-2 ${
                    activeTab === 'telemetry' 
                      ? 'bg-[#E1FF01] text-black font-black shadow-[0_0_15px_rgba(225,255,1,0.3)]' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Radio size={13} />
                  <span>SUPABASE TELEMETRY</span>
                </button>
              </div>

              <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold shrink-0">
                <ShieldCheck size={14} />
                <span>AUTH_TOKEN: OK</span>
              </div>
            </div>

            {/* Tab Panes */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {activeTab === 'kds' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-slate-400 uppercase tracking-widest">Active Kitchen Display Queue</span>
                    <span className="text-[#E1FF01]">Average Grill Cook Time: 3.5 min</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tickets.map((t) => (
                      <div 
                        key={t.id}
                        className="bg-black/70 border border-white/10 hover:border-[#E1FF01]/40 rounded-xl p-5 space-y-3 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-xs font-mono text-[#E1FF01] font-bold block">{t.orderNumber} • {t.orderType}</span>
                            <h3 className="text-sm font-bold text-white mt-0.5">{t.customerName}</h3>
                          </div>
                          <span className={`text-xs font-semibold tracking-wider font-mono px-2 py-0.5 rounded font-bold uppercase ${
                            t.status === 'ready' 
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                              : t.status === 'on_grill' 
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 animate-pulse' 
                              : 'bg-white/10 text-slate-300'
                          }`}>
                            {t.status.replace('_', ' ')}
                          </span>
                        </div>

                        <div className="bg-white/5 rounded-lg p-3 space-y-1 text-xs font-mono text-slate-300">
                          {t.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center">
                              <span>• {item}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between text-xs font-mono pt-1 text-slate-400">
                          <div className="flex items-center gap-1.5">
                            <Clock size={12} className="text-[#E1FF01]" />
                            <span>{t.timestamp}</span>
                          </div>
                          <span className="text-white font-bold">${t.total.toFixed(2)}</span>
                        </div>

                        {/* Status Switcher */}
                        <div className="pt-2 border-t border-white/5 flex gap-1.5 font-mono text-xs font-semibold tracking-wider">
                          {(['received', 'on_grill', 'plating', 'ready'] as const).map((st) => (
                            <button
                              key={st}
                              onClick={() => onUpdateTicketStatus(t.id, st)}
                              className={`flex-1 py-1 rounded uppercase transition-colors cursor-pointer ${
                                t.status === st 
                                  ? 'bg-[#E1FF01] text-black font-bold' 
                                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                              }`}
                            >
                              {st.replace('_', ' ')}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'menu' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-slate-400 uppercase tracking-widest">Master Menu Stock & Temperature Config</span>
                    <span className="text-emerald-400">All Griddles Calibrated</span>
                  </div>

                  <div className="space-y-2">
                    {menuItems.map((item) => (
                      <div 
                        key={item.id}
                        className="bg-black/60 border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-white font-bold">{item.name}</span>
                            <span className="text-slate-300">({item.category})</span>
                          </div>
                          <div className="text-xs font-semibold text-slate-400 flex items-center gap-4">
                            <span>Searing: <strong className="text-amber-400">{item.grillTemp}</strong></span>
                            <span>Blend: <strong className="text-slate-200">{item.fatRatio}</strong></span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="text-sm font-bold text-white">${item.price}</span>
                          <span className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wider uppercase font-bold">
                            {item.stockStatus.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'inventory' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-slate-400 uppercase tracking-widest">Grill Station & Kitchen Nodes</span>
                    <span className="text-[#E1FF01]">High-Heat Telemetry</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {grillStations.map((node) => (
                      <div key={node.id} className="bg-black/60 border border-white/10 rounded-xl p-4 space-y-2 font-mono text-xs">
                        <div className="flex justify-between items-start">
                          <span className="text-[#E1FF01] font-bold">{node.id}</span>
                          <span className="text-white bg-white/10 px-2 py-0.5 rounded text-xs font-semibold tracking-wider">{node.temp}</span>
                        </div>
                        <div className="text-slate-200 font-bold">{node.name}</div>
                        <p className="text-xs font-semibold text-slate-400 font-sans">{node.task}</p>
                        <div className="pt-2 flex justify-between text-xs font-semibold text-slate-300">
                          <span>Grill Capacity Load:</span>
                          <span className="text-emerald-400 font-bold">{node.load}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'telemetry' && (
                <div className="bg-black/70 border border-white/10 rounded-xl p-6 font-mono text-xs space-y-4">
                  <div className="flex items-center gap-2 text-[#E1FF01] font-bold">
                    <Database size={16} />
                    <span>SUPABASE CLUSTER STATUS // BURGER_LAB_PROD</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
                    <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                      <span className="text-slate-300 block text-xs font-semibold tracking-wider">DATABASE ENGINE</span>
                      <strong className="text-white">PostgreSQL 15 (Supabase Hosted)</strong>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                      <span className="text-slate-300 block text-xs font-semibold tracking-wider">SECURITY LAYER</span>
                      <strong className="text-emerald-400">Row Level Security (RLS) Active</strong>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                      <span className="text-slate-300 block text-xs font-semibold tracking-wider">TABLE: orders</span>
                      <strong className="text-white">5 Active Orders (KDS Synced)</strong>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                      <span className="text-slate-300 block text-xs font-semibold tracking-wider">TABLE: menu_items</span>
                      <strong className="text-white">10 Menu Items Seeded</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
