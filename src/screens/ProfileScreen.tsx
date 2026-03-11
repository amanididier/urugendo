import { motion } from 'framer-motion';
import { useApp, t } from '@/context/AppContext';
import { User, Users, CreditCard, Bell, Globe, HelpCircle, LogOut, ChevronRight } from 'lucide-react';

const ProfileScreen = () => {
  const { language, setLanguage, userName, setCurrentScreen } = useApp();

  const menuItems = [
    { icon: <Users className="w-5 h-5" />, label: t('Saved Passengers', 'Abagenzi Babitswe', language) },
    { icon: <CreditCard className="w-5 h-5" />, label: t('Payment Methods', 'Uburyo bwo Kwishyura', language) },
    { icon: <Bell className="w-5 h-5" />, label: t('Notifications', 'Amakuru', language) },
    { icon: <Globe className="w-5 h-5" />, label: t('Language', 'Ururimi', language), action: () => setLanguage(language === 'en' ? 'rw' : 'en'), right: language === 'en' ? 'English' : 'Kinyarwanda' },
    { icon: <HelpCircle className="w-5 h-5" />, label: t('Help & Support', 'Ubufasha', language) },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-5 pt-14 pb-4">
        <h1 className="text-2xl font-bold">{t('Profile', 'Umwirondoro', language)}</h1>
      </div>

      {/* Avatar card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-5 bg-card rounded-xl p-5 card-shadow flex items-center gap-4 mb-6"
      >
        <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center">
          <User className="w-8 h-8 text-primary-foreground" />
        </div>
        <div>
          <p className="font-bold text-lg">{userName}</p>
          <p className="text-sm text-muted-foreground">+250 78X XXX XXX</p>
        </div>
      </motion.div>

      {/* Menu */}
      <div className="mx-5 bg-card rounded-xl card-shadow overflow-hidden">
        {menuItems.map((item, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.03 }}
            onClick={item.action}
            className="w-full flex items-center gap-4 px-5 py-4 tap-target active:bg-accent/50 transition-colors"
          >
            <div className="text-muted-foreground">{item.icon}</div>
            <span className="flex-1 text-left font-medium text-sm">{item.label}</span>
            {item.right && <span className="text-xs text-muted-foreground">{item.right}</span>}
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </motion.button>
        ))}
      </div>

      <div className="mx-5 mt-4">
        <button
          onClick={() => setCurrentScreen('splash')}
          className="w-full flex items-center gap-4 px-5 py-4 bg-card rounded-xl card-shadow tap-target active:bg-destructive/5 transition-colors"
        >
          <LogOut className="w-5 h-5 text-destructive" />
          <span className="font-medium text-sm text-destructive">{t('Logout', 'Gusohoka', language)}</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileScreen;
