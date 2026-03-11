import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp, t } from '@/context/AppContext';
import { Ticket, Clock, X } from 'lucide-react';

const tabs = ['upcoming', 'past', 'cancelled'] as const;

const mockTickets = {
  upcoming: [
    { id: 1, from: 'Kigali', to: 'Huye', date: 'Mar 15, 2026', time: '07:30', operator: 'Volcano Express', seat: '12', ref: 'BE-XK3M91' },
  ],
  past: [
    { id: 2, from: 'Kigali', to: 'Musanze', date: 'Mar 1, 2026', time: '09:00', operator: 'RITCO', seat: '5', ref: 'BE-QW2P47' },
    { id: 3, from: 'Kigali', to: 'Rubavu', date: 'Feb 20, 2026', time: '06:00', operator: 'Trinity Express', seat: '22', ref: 'BE-LN8R63' },
  ],
  cancelled: [],
};

const statusColors = {
  upcoming: 'bg-accent-mint/10 text-primary',
  past: 'bg-muted text-muted-foreground',
  cancelled: 'bg-destructive/10 text-destructive',
};

const MyTicketsScreen = () => {
  const { language } = useApp();
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>('upcoming');

  const tabLabels = {
    upcoming: t('Upcoming', 'Zizaza', language),
    past: t('Past', 'Zarangiye', language),
    cancelled: t('Cancelled', 'Zahagaritswe', language),
  };

  const tickets = mockTickets[activeTab];

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-5 pt-14 pb-4">
        <h1 className="text-2xl font-bold">{t('My Tickets', 'Amatike Yanjye', language)}</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 px-5 mb-4">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              activeTab === tab ? 'bg-primary text-primary-foreground' : 'bg-card card-shadow'
            }`}
          >
            {tabLabels[tab]}
          </button>
        ))}
      </div>

      <div className="px-5 space-y-3">
        <AnimatePresence mode="wait">
          {tickets.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-muted-foreground"
            >
              <Ticket className="w-12 h-12 mb-3 opacity-30" />
              <p className="font-medium">{t('No tickets here', 'Nta matike hano', language)}</p>
            </motion.div>
          ) : (
            tickets.map((ticket, i) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-xl p-4 card-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold">{ticket.from} → {ticket.to}</span>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColors[activeTab]}`}>
                    {tabLabels[activeTab]}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{ticket.date}</span>
                  <span>{ticket.time}</span>
                  <span>Seat {ticket.seat}</span>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                  <span className="text-xs text-muted-foreground">{ticket.operator}</span>
                  <span className="text-xs font-mono font-bold text-primary">{ticket.ref}</span>
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
