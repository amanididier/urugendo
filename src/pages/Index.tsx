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

const Index = () => {
  const { currentScreen } = useApp();
  const Screen = screens[currentScreen] || HomeScreen;
  const hasNav = showNav.includes(currentScreen);

  return (
    <div className="max-w-lg mx-auto relative min-h-screen bg-background">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.2 }}
        >
          <Screen />
        </motion.div>
      </AnimatePresence>
      {hasNav && <BottomNav />}
    </div>
  );
};

export default Index;
