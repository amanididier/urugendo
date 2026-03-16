import { motion } from 'framer-motion';
import { useApp, t } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Bus, MapPin } from 'lucide-react';
import splashBg from '@/assets/splash-bg.jpg';

const SplashScreen = () => {
  const { language, setLanguage, setCurrentScreen } = useApp();

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={splashBg}
          alt="Rwanda hills landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen px-6 pb-10">
        {/* Top language toggle */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-end pt-12"
        >
          <div className="flex items-center gap-1 bg-black/30 backdrop-blur-md rounded-full px-1 py-1">
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                language === 'en'
                  ? 'bg-primary-foreground text-foreground'
                  : 'text-primary-foreground/80'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('rw')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                language === 'rw'
                  ? 'bg-primary-foreground text-foreground'
                  : 'text-primary-foreground/80'
              }`}
            >
              RW
            </button>
          </div>
        </motion.div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Logo + Info */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', duration: 0.7 }}
          className="flex flex-col items-start gap-3 mb-4"
        >
          <div className="w-14 h-14 rounded-2xl bg-accent-mint flex items-center justify-center shadow-lg">
            <Bus className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-4xl font-extrabold text-primary-foreground tracking-tight leading-tight">
            BusEase
          </h1>
          <p className="text-primary-foreground/70 text-sm font-medium flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            {t('Your personal secure list of travel spots', 'Umwanya wawe. Urugendo rwawe. Byateguwe.', language)}
          </p>
        </motion.div>

        {/* Bottom actions */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full space-y-4"
        >
          <Button
            variant="mint"
            size="lg"
            className="w-full text-base font-bold"
            onClick={() => setCurrentScreen('home')}
          >
            {t('Get Started', 'Tangira', language)}
          </Button>

          <p className="text-center text-primary-foreground/50 text-xs font-medium">
            {t('or continue with', 'cyangwa komeza na', language)}
          </p>

          <div className="flex items-center justify-center gap-3">
            {['G', '🍎', 'f'].map((icon, i) => (
              <button
                key={i}
                className="w-12 h-12 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 flex items-center justify-center text-primary-foreground text-lg font-bold transition-all hover:bg-primary-foreground/20"
              >
                {icon}
              </button>
            ))}
          </div>

          <p className="text-center text-primary-foreground/50 text-xs">
            {t("Don't have an account?", "Nta konti ufite?", language)}{' '}
            <button className="text-accent-mint font-semibold">
              {t('Create one', 'Fungura', language)}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SplashScreen;
