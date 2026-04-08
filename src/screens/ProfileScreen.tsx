import { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { ChevronRight } from 'lucide-react';

const ProfileScreen = () => {
  const { language, setLanguage, userName, setCurrentScreen } = useApp();
  const [pressedRow, setPressedRow] = useState<number | null>(null);

  const menuItems = [
    { icon: '👥', label: 'Saved Passengers', bg: '#EDE9FE' },
    { icon: '💳', label: 'Payment Methods', bg: '#FEF9C3' },
    { icon: '🔔', label: 'Notifications', bg: '#FEF9C3' },
    { icon: '🌐', label: 'Language · EN / RW', bg: '#CCFBF1', action: () => setLanguage(language === 'en' ? 'rw' : 'en') },
    { icon: '❓', label: 'Help & Support', bg: '#FFE4E6' },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Profile hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center pt-16 pb-4 anim"
      >
        <div className="w-[72px] h-[72px] rounded-full bg-primary mx-auto flex items-center justify-center text-[26px] font-bold text-primary-foreground">
          JP
        </div>
        <div className="text-xl font-bold text-foreground mt-3">{userName}</div>
        <div className="text-sm text-muted-foreground font-semibold mt-1">+250 789 123 456</div>
      </motion.div>

      {/* Stats */}
      <div className="mx-4 bg-card rounded-3xl border border-border overflow-hidden anim-d1">
        <div className="flex">
          <div className="flex-1 text-center py-4">
            <div className="text-[28px] font-bold text-foreground">3</div>
            <div className="text-xs text-muted-foreground font-semibold">Upcoming</div>
          </div>
          <div className="flex-1 text-center py-4 border-x border-border">
            <div className="text-[28px] font-bold text-warning">12</div>
            <div className="text-xs text-muted-foreground font-semibold">Total Trips</div>
          </div>
          <div className="flex-1 text-center py-4">
            <div className="text-[28px] font-bold text-primary">4.9★</div>
            <div className="text-xs text-muted-foreground font-semibold">Rating</div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="mx-4 mt-4 bg-card rounded-3xl border border-border overflow-hidden anim-d2">
        {menuItems.map((item, i) => (
          <motion.button
            key={i}
            onClick={item.action}
            onTapStart={() => setPressedRow(i)}
            onTap={() => setPressedRow(null)}
            onTapCancel={() => setPressedRow(null)}
            className={`w-full flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-muted/30 ${
              i < menuItems.length - 1 ? 'border-b border-border' : ''
            }`}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: item.bg }}>
              {item.icon}
            </div>
            <span className="flex-1 text-left text-[15px] font-semibold text-foreground">{item.label}</span>
            <motion.div animate={{ x: pressedRow === i ? 4 : 0 }} transition={{ duration: 0.15 }}>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </motion.div>
          </motion.button>
        ))}

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Logout */}
        <button
          onClick={() => setCurrentScreen('splash')}
          className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-muted/30 transition-colors"
        >
          <div className="w-12 h-12 flex items-center justify-center text-xl">
            🚪
          </div>
          <span className="flex-1 text-left text-[15px] font-semibold text-destructive">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileScreen;
