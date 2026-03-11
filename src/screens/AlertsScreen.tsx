import { motion } from 'framer-motion';
import { useApp, t } from '@/context/AppContext';
import { Bell } from 'lucide-react';

const mockAlerts = [
  { id: 1, title: 'Price Drop Alert!', desc: 'Kigali → Musanze route now from 2,500 RWF', time: '2h ago', unread: true },
  { id: 2, title: 'Your trip is tomorrow', desc: 'Kigali → Huye · Mar 15, 07:30 AM', time: '1d ago', unread: true },
  { id: 3, title: 'New route available', desc: 'Direct buses to Cyangugu now running daily', time: '3d ago', unread: false },
];

const AlertsScreen = () => {
  const { language } = useApp();

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-5 pt-14 pb-4">
        <h1 className="text-2xl font-bold">{t('Notifications', 'Amakuru', language)}</h1>
      </div>

      <div className="px-5 space-y-3">
        {mockAlerts.map((alert, i) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`bg-card rounded-xl p-4 card-shadow ${alert.unread ? 'border-l-4 border-accent-mint' : ''}`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${alert.unread ? 'bg-accent-mint/10' : 'bg-muted'}`}>
                <Bell className={`w-5 h-5 ${alert.unread ? 'text-primary' : 'text-muted-foreground'}`} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">{alert.title}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{alert.desc}</p>
                <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AlertsScreen;
