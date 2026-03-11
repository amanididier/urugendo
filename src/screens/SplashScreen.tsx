import { motion } from 'framer-motion';
import { useApp, t } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Bus, Mountain } from 'lucide-react';

const SplashScreen = () => {
  const { language, setLanguage, setCurrentScreen } = useApp();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary px-6 relative overflow-hidden">
      {/* Background hills */}
      <svg className="absolute bottom-0 left-0 w-full opacity-10" viewBox="0 0 400 200" fill="none">
        <path d="M0 200 Q50 80 100 120 Q150 60 200 100 Q250 40 300 90 Q350 50 400 80 L400 200 Z" fill="currentColor" className="text-primary-foreground"/>
      </svg>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.8 }}
        className="flex flex-col items-center gap-4 z-10"
      >
        <div className="w-24 h-24 rounded-[28px] bg-accent-mint flex items-center justify-center">
          <Bus className="w-12 h-12 text-primary" />
        </div>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-extrabold text-primary-foreground tracking-tight"
        >
          BusEase
        </motion.h1>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-1 text-primary-foreground/60 text-sm"
        >
          <Mountain className="w-4 h-4" />
          <span>Rwanda</span>
        </motion.div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-primary-foreground/80 text-lg text-center mt-8 z-10 font-medium"
      >
        {t('Your seat. Your journey. Sorted.', 'Umwanya wawe. Urugendo rwawe. Byateguwe.', language)}
      </motion.p>

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="w-full max-w-sm mt-12 z-10 space-y-4"
      >
        <Button
          variant="mint"
          size="lg"
          className="w-full text-lg"
          onClick={() => setCurrentScreen('home')}
        >
          {t('Get Started', 'Tangira', language)}
        </Button>

        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setLanguage('en')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              language === 'en' ? 'bg-primary-foreground/20 text-primary-foreground' : 'text-primary-foreground/50'
            }`}
          >
            English
          </button>
          <span className="text-primary-foreground/30">|</span>
          <button
            onClick={() => setLanguage('rw')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              language === 'rw' ? 'bg-primary-foreground/20 text-primary-foreground' : 'text-primary-foreground/50'
            }`}
          >
            Kinyarwanda
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SplashScreen;
