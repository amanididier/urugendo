import { motion } from 'framer-motion';
import { useApp, t } from '@/context/AppContext';
import { ChevronRight } from 'lucide-react';

const ProfileScreen = () => {
  const { language, setLanguage, userName, setCurrentScreen } = useApp();

  const menuItems = [
    { icon: '👥', label: 'Saved Passengers', bg: 'bg-purple-50' },
    { icon: '💳', label: 'Payment Methods', bg: 'bg-amber-50' },
    { icon: '🔔', label: 'Notifications', bg: 'bg-blue-50' },
    { icon: '🌐', label: 'Language · EN / RW', bg: 'bg-green-50', action: () => setLanguage(language === 'en' ? 'rw' : 'en') },
    { icon: '❓', label: 'Help & Support', bg: 'bg-blue-50' },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Profile hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center pt-16 pb-4 anim"
      >
        <div className="w-[60px] h-[60px] rounded-full bg-primary mx-auto flex items-center justify-center text-xl font-black text-primary-foreground">
          JP
        </div>
        <div className="text-xl font-black text-foreground mt-3">{userName}</div>
        <div className="text-[13px] text-muted-foreground font-semibold mt-1">+250 789 123 456</div>
      </motion.div>

      {/* Stats */}
      <div className="flex mx-4 bg-card rounded-[20px] border border-border overflow-hidden anim-d1">
        <div className="flex-1 text-center py-4">
          <div className="text-lg font-black text-foreground">3</div>
          <div className="text-[11px] text-muted-foreground font-semibold">Upcoming</div>
        </div>
        <div className="flex-1 text-center py-4 border-x border-border">
          <div className="text-lg font-black text-warning">12</div>
          <div className="text-[11px] text-muted-foreground font-semibold">Total Trips</div>
        </div>
        <div className="flex-1 text-center py-4">
          <div className="text-lg font-black text-green-500">4.9★</div>
          <div className="text-[11px] text-muted-foreground font-semibold">Rating</div>
        </div>
      </div>

      {/* Menu */}
      <div className="mx-4 mt-4 bg-card rounded-[20px] border border-border overflow-hidden anim-d2">
        {menuItems.map((item, i) => (
          <button
            key={i}
            onClick={item.action}
            className="w-full flex items-center gap-3 px-4 py-[14px] transition-colors hover:bg-background border-b border-border last:border-b-0"
          >
            <div className={`w-10 h-10 rounded-[14px] ${item.bg} flex items-center justify-center text-lg`}>
              {item.icon}
            </div>
            <span className="flex-1 text-left text-sm font-bold text-foreground">{item.label}</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        ))}
      </div>

      {/* Logout */}
      <div className="mx-4 mt-3">
        <button
          onClick={() => setCurrentScreen('splash')}
          className="w-full flex items-center gap-3 px-4 py-[14px] bg-card rounded-[20px] border border-border hover:bg-background transition-colors"
        >
          <div className="w-10 h-10 rounded-[14px] bg-red-50 flex items-center justify-center text-lg">🚪</div>
          <span className="flex-1 text-left text-sm font-bold text-destructive">Logout</span>
          <ChevronRight className="w-4 h-4 text-destructive" />
        </button>
      </div>
    </div>
  );
};

export default ProfileScreen;
