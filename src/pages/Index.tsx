import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import SplashScreen from '@/screens/SplashScreen';
import HomeScreen from '@/screens/HomeScreen';
import ResultsScreen from '@/screens/ResultsScreen';
import SeatSelectionScreen from '@/screens/SeatSelectionScreen';
import PaymentScreen from '@/screens/PaymentScreen';
import ConfirmationScreen from '@/screens/ConfirmationScreen';
import MyTicketsScreen from '@/screens/MyTicketsScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import BottomNav from '@/components/BottomNav';
import RugendoChat from '@/components/RugendoChat';

const screens: Record<string, React.FC> = {
  splash: SplashScreen,
  home: HomeScreen,
  results: ResultsScreen,
  seats: SeatSelectionScreen,
  payment: PaymentScreen,
  confirmation: ConfirmationScreen,
  tickets: MyTicketsScreen,
  profile: ProfileScreen,
};

const showNav = ['home', 'results', 'tickets', 'profile'];
const showFab = ['home', 'results', 'tickets', 'profile'];

const Index = () => {
  const { currentScreen } = useApp();
  const [chatOpen, setChatOpen] = useState(false);
  const Screen = screens[currentScreen] || HomeScreen;
  const hasNav = showNav.includes(currentScreen);
  const hasFab = showFab.includes(currentScreen);

  return (
    <div className="relative min-h-screen bg-background">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '-30%', opacity: 0 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
        >
          <Screen />
        </motion.div>
      </AnimatePresence>

      {/* Rugendo FAB */}
      {hasFab && !chatOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.3 }}
          onClick={() => setChatOpen(true)}
          className="fixed bottom-24 right-4 w-[52px] h-[52px] rounded-[18px] bg-primary flex items-center justify-center text-2xl z-50 active:scale-95 transition-transform"
          style={{ boxShadow: '0 4px 16px rgba(0,184,92,0.3)' }}
        >
          🚌
          <span className="absolute -top-1 -right-1 w-[18px] h-[18px] rounded-full flex items-center justify-center text-[8px] font-bold text-white" style={{ backgroundColor: '#22C55E', border: '2.5px solid white' }}>
            AI
          </span>
        </motion.button>
      )}

      <RugendoChat open={chatOpen} onClose={() => setChatOpen(false)} />

      {hasNav && <BottomNav />}
    </div>
  );
};

export default Index;
