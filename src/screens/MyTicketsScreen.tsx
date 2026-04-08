import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';

const tabs = ['upcoming', 'past', 'cancelled'] as const;

const mockTickets = {
  upcoming: [
    { id: 1, from: 'Kigali', to: 'Musanze', date: 'Mar 11', time: '06:00', operator: '🌋', operatorName: 'Volcano Express', seat: 'Row 3·B' },
    { id: 2, from: 'Kigali', to: 'Huye', date: 'Mar 12', time: '09:00', operator: '🚌', operatorName: 'RITCO', seat: 'Row 5·C' },
  ],
  past: [
    { id: 3, from: 'Kigali', to: 'Rubavu', date: 'Feb 28', time: '07:30', operator: '🚐', operatorName: 'Trinity Express', seat: 'Row 2·A' },
  ],
  cancelled: [],
};

const statusColors: Record<string, string> = {
  upcoming: '#00B85C',
  past: '#A1A1AA',
  cancelled: '#EF4444',
};

const MyTicketsScreen = () => {
  const { setCurrentScreen } = useApp();
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>('upcoming');
  const tickets = mockTickets[activeTab];

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-5 pt-14">
        <h1 className="text-[28px] font-extrabold text-foreground">My Tickets</h1>
      </div>

      {/* Tab bar */}
      <div className="mx-4 mt-3.5 bg-card rounded-xl p-1 flex border border-border relative">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="relative flex-1 py-2 rounded-lg text-xs font-bold capitalize z-10"
            style={{ color: activeTab === tab ? 'white' : '#A1A1AA' }}
          >
            {activeTab === tab && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-primary rounded-lg"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab}</span>
          </button>
        ))}
      </div>

      <div className="px-4 pt-3 space-y-3">
        <AnimatePresence mode="wait">
          {tickets.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-5xl mb-3.5">🎫</div>
              <div className="text-base font-extrabold text-foreground mb-1.5">
                No {activeTab} tickets
              </div>
              <div className="text-[13px] text-muted-foreground font-semibold">
                {activeTab === 'cancelled' ? 'Cancelled bookings appear here' : 'Book a trip to see tickets here'}
              </div>
            </motion.div>
          ) : (
            tickets.map((ticket, i) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setCurrentScreen('confirmation')}
                className="cursor-pointer"
              >
                <div className="bg-card rounded-xl border border-border p-4 transition-all hover:border-primary">
                  <div className="flex justify-between items-start mb-2.5">
                    <div className="text-lg font-extrabold text-foreground">{ticket.from} → {ticket.to}</div>
                    <span className="text-[12px] font-bold capitalize" style={{ color: statusColors[activeTab] }}>
                      {activeTab}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-[13px] text-muted-foreground font-medium">
                    <span>📅 {ticket.date}</span>
                    <span>🕐 {ticket.time}</span>
                    <span>{ticket.operator} {ticket.operatorName}</span>
                    <span>💺 {ticket.seat}</span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MyTicketsScreen;
