import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp, t } from '@/context/AppContext';

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

const statusStyles = {
  upcoming: 'bg-green-50 text-green-700',
  past: 'bg-zinc-100 text-zinc-500',
  cancelled: 'bg-red-50 text-red-700',
};

const MyTicketsScreen = () => {
  const { language, setCurrentScreen } = useApp();
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>('upcoming');
  const tickets = mockTickets[activeTab];

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-5 pt-14">
        <h1 className="text-[22px] font-black text-foreground">My Tickets</h1>
      </div>

      {/* Tab bar */}
      <div className="mx-4 mt-3.5 bg-background rounded-2xl p-1 flex border border-border">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
              activeTab === tab
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground'
            }`}
          >
            {tab}
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
              <div className="text-base font-black text-foreground mb-1.5">
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
                <div className="bg-card rounded-[20px] border border-border p-4 transition-all hover:border-primary">
                  <div className="flex justify-between items-start mb-2.5">
                    <div className="text-lg font-black text-foreground">{ticket.from} → {ticket.to}</div>
                    <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full capitalize ${statusStyles[activeTab]}`}>
                      {activeTab}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground font-semibold">
                    <span>📅 <strong className="text-foreground">{ticket.date}</strong></span>
                    <span>⏰ <strong className="text-foreground">{ticket.time}</strong></span>
                    <span>{ticket.operator} <strong className="text-foreground">{ticket.operatorName}</strong></span>
                    <span>💺 <strong className="text-foreground">{ticket.seat}</strong></span>
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
