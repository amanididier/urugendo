import { useApp } from '@/context/AppContext';
import { motion } from 'framer-motion';
import { Home, Search, Ticket, User } from 'lucide-react';

const tabs = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'results', icon: Search, label: 'Search' },
  { id: 'tickets', icon: Ticket, label: 'Tickets' },
  { id: 'profile', icon: User, label: 'Profile' },
];

const BottomNav = () => {
  const { currentScreen, setCurrentScreen } = useApp();

  const activeMap: Record<string, string> = {
    home: 'home',
    results: 'results',
    details: 'results',
    seats: 'results',
    payment: 'results',
    confirmation: 'tickets',
    tickets: 'tickets',
    profile: 'profile',
  };

  const activeTab = activeMap[currentScreen] || 'home';

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-card border-t border-border z-40">
      <div className="flex items-center justify-around h-20 pb-4">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentScreen(tab.id)}
              className="relative flex flex-col items-center justify-center gap-[3px] px-4 py-2 rounded-xl transition-all"
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-xl"
                  style={{ backgroundColor: 'hsl(152 100% 36% / 0.07)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                className={`w-[22px] h-[22px] transition-colors relative z-10 ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
                strokeWidth={2}
              />
              <span
                className={`text-[10px] font-bold transition-colors relative z-10 ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
