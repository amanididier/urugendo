import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApp, t } from '@/context/AppContext';
import { Bus } from 'lucide-react';

const SplashScreen = () => {
  const { language, setLanguage, setCurrentScreen } = useApp();

  useEffect(() => {
    const stored = localStorage.getItem('urugendo-lang');
    if (stored === 'rw') setLanguage('rw');
  }, []);

  useEffect(() => {
    localStorage.setItem('urugendo-lang', language);
  }, [language]);

  useEffect(() => {
    const timer = setTimeout(() => setCurrentScreen('home'), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Background image with Ken Burns */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1 }}
        animate={{ scale: 1.06 }}
        transition={{ duration: 4, ease: 'easeInOut' }}
      >
        <img
          src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80"
          alt="Rwanda terraced hills"
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1580746738099-b2a28a59c5b1?w=800&q=80';
          }}
        />
      </motion.div>
      {/* Dark overlay */}
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.38)' }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top language toggle */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-end px-6 pt-14"
        >
          <div className="flex items-center gap-1 rounded-full px-1 py-1" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                language === 'en' ? 'bg-white text-foreground' : 'text-white/80'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('rw')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                language === 'rw' ? 'bg-white text-foreground' : 'text-white/80'
              }`}
            >
              RW
            </button>
          </div>
        </motion.div>

        {/* Spacer to push content to ~55% from top */}
        <div className="flex-1" style={{ minHeight: '45%' }} />

        {/* Middle section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="px-6"
        >
          <div className="w-[72px] h-[72px] rounded-[18px] bg-primary flex items-center justify-center mb-4">
            <Bus className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-[42px] font-black text-white leading-tight tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Urugendo<span className="text-warning">.</span>
          </h1>
          <p className="text-[15px] text-white/80 mt-2 flex items-center gap-1.5">
            📍 {t('Your personal secure journey app', 'Umwanya wawe. Urugendo rwawe.', language)}
          </p>
        </motion.div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom section */}
        <div className="px-6 pb-8">
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <button
              onClick={() => setCurrentScreen('home')}
              className="w-full h-14 rounded-full bg-primary text-white font-bold text-base flex items-center justify-center active:scale-[0.97] transition-transform"
            >
              {t('Get Started', 'Tangira', language)}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <p className="text-center text-white/50 text-xs my-4">
              {t('or continue with', 'cyangwa komeza na', language)}
            </p>

            <div className="flex items-center justify-center gap-3">
              {['G', '🍎', 'f'].map((icon, i) => (
                <button
                  key={i}
                  className="w-[52px] h-[52px] rounded-full flex items-center justify-center text-white text-lg font-bold transition-all hover:brightness-110"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    border: '1px solid rgba(255,255,255,0.3)',
                  }}
                >
                  {icon}
                </button>
              ))}
            </div>

            <p className="text-center text-white/50 text-xs mt-4">
              {t("Don't have an account?", "Nta konti ufite?", language)}{' '}
              <button className="text-primary font-bold">
                {t('Create one', 'Fungura', language)}
              </button>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
