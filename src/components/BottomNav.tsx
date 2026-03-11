import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { Home, Search, Ticket, Bell, User } from 'lucide-react';

const tabs = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'results', icon: Search, label: 'Search' },
  { id: 'tickets', icon: Ticket, label: 'Tickets' },
  { id: 'alerts', icon: Bell, label: 'Alerts' },
  { id: 'profile', icon: User, label: 'Profile' },
];

const BottomNav = () => {
  const { currentScreen, setCurrentScreen } = useApp();

  const activeMap: Record<string, string> = {
    home: 'home',
    results: 'results',
    details: 'results',
    seats: 'results',
    passenger: 'results',
    payment: 'results',
    confirmation: 'home',
    tickets: 'tickets',
    alerts: 'alerts',
    profile: 'profile',
  };

  const activeTab = activeMap[currentScreen] || 'home';

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40 safe-area-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentScreen(tab.id)}
              className="flex flex-col items-center justify-center gap-0.5 tap-target relative"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-px left-1/2 -translate-x-1/2 w-8 h-0.5 bg-accent-mint rounded-full"
                />
              )}
              <Icon
                className={`w-5 h-5 transition-colors ${isActive ? 'text-accent-mint' : 'text-border'}`}
              />
              <span
                className={`text-[10px] font-semibold transition-colors ${isActive ? 'text-accent-mint' : 'text-border'}`}
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
