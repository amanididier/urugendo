import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp, t } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { CITIES, POPULAR_ROUTES, formatRWF } from '@/data/busData';
import { ArrowDownUp, Calendar, MapPin, Minus, Plus, Search, Clock, ChevronRight } from 'lucide-react';

const HomeScreen = () => {
  const { language, bookingData, setBookingData, setCurrentScreen } = useApp();
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);

  const handleSwap = () => {
    setIsSwapping(true);
    setTimeout(() => {
      setBookingData(prev => ({ ...prev, from: prev.to, to: prev.from }));
      setIsSwapping(false);
    }, 200);
  };

  const handleSearch = () => {
    if (bookingData.from && bookingData.to) {
      setCurrentScreen('results');
    }
  };

  const today = new Date();
  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    return d;
  });

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="px-5 pt-14 pb-4">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-foreground"
        >
          Muraho 👋
        </motion.p>
        <p className="text-muted-foreground text-sm mt-1">
          {t('Where are you headed today?', 'Ugiye hehe uyu munsi?', language)}
        </p>
      </div>

      {/* Search Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mx-5 bg-card rounded-xl p-5 card-shadow"
      >
        {/* From */}
        <button
          onClick={() => setShowFromPicker(true)}
          className="w-full flex items-center gap-3 py-3 tap-target"
        >
          <div className="w-10 h-10 rounded-full bg-accent-mint/10 flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <div className="text-left flex-1">
            <p className="text-xs text-muted-foreground font-medium">{t('FROM', 'KUVA', language)}</p>
            <p className={`text-base font-semibold ${bookingData.from ? 'text-foreground' : 'text-muted-foreground'}`}>
              {bookingData.from || t('Select city', 'Hitamo umujyi', language)}
            </p>
          </div>
        </button>

        {/* Swap */}
        <div className="relative flex items-center justify-center -my-1 z-10">
          <div className="absolute left-12 right-0 h-px bg-border" />
          <motion.button
            animate={{ rotate: isSwapping ? 180 : 0 }}
            onClick={handleSwap}
            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center relative z-10 active:scale-95 transition-transform"
          >
            <ArrowDownUp className="w-4 h-4 text-primary-foreground" />
          </motion.button>
        </div>

        {/* To */}
        <button
          onClick={() => setShowToPicker(true)}
          className="w-full flex items-center gap-3 py-3 tap-target"
        >
          <div className="w-10 h-10 rounded-full bg-accent-mint/10 flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5 text-accent-mint" />
          </div>
          <div className="text-left flex-1">
            <p className="text-xs text-muted-foreground font-medium">{t('TO', 'KUGERA', language)}</p>
            <p className={`text-base font-semibold ${bookingData.to ? 'text-foreground' : 'text-muted-foreground'}`}>
              {bookingData.to || t('Select city', 'Hitamo umujyi', language)}
            </p>
          </div>
        </button>

        <div className="h-px bg-border my-2" />

        {/* Date */}
        <button
          onClick={() => setShowDatePicker(true)}
          className="w-full flex items-center gap-3 py-3 tap-target"
        >
          <div className="w-10 h-10 rounded-full bg-accent-mint/10 flex items-center justify-center flex-shrink-0">
            <Calendar className="w-5 h-5 text-primary" />
          </div>
          <div className="text-left flex-1">
            <p className="text-xs text-muted-foreground font-medium">{t('DATE', 'ITARIKI', language)}</p>
            <p className={`text-base font-semibold ${bookingData.date ? 'text-foreground' : 'text-muted-foreground'}`}>
              {bookingData.date || t('Select date', 'Hitamo itariki', language)}
            </p>
          </div>
        </button>

        <div className="h-px bg-border my-2" />

        {/* Passengers */}
        <div className="flex items-center gap-3 py-3">
          <div className="w-10 h-10 rounded-full bg-accent-mint/10 flex items-center justify-center flex-shrink-0">
            <span className="text-lg">👤</span>
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground font-medium">{t('PASSENGERS', 'ABAGENZI', language)}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setBookingData(prev => ({ ...prev, passengers: Math.max(1, prev.passengers - 1) }))}
              className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center active:scale-95 transition-transform"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-lg font-bold w-6 text-center">{bookingData.passengers}</span>
            <button
              onClick={() => setBookingData(prev => ({ ...prev, passengers: Math.min(10, prev.passengers + 1) }))}
              className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center active:scale-95 transition-transform"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <Button
          variant="mint"
          size="lg"
          className="w-full mt-4"
          onClick={handleSearch}
          disabled={!bookingData.from || !bookingData.to}
        >
          <Search className="w-5 h-5" />
          {t('Search Buses', 'Shakisha Bisi', language)}
        </Button>
      </motion.div>

      {/* Popular Routes */}
      <div className="mt-8 px-5">
        <h2 className="text-lg font-bold text-foreground mb-4">
          {t('Popular Routes', 'Inzira Zikunzwe', language)}
        </h2>
        <div className="flex gap-3 overflow-x-auto hide-scrollbar -mx-5 px-5 pb-2">
          {POPULAR_ROUTES.map((route, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              onClick={() => {
                setBookingData(prev => ({ ...prev, from: route.from, to: route.to }));
              }}
              className="flex-shrink-0 w-44 bg-card rounded-xl p-4 card-shadow text-left active:scale-[0.98] transition-transform"
            >
              <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                <MapPin className="w-3 h-3" />
                <span>{route.from}</span>
                <ChevronRight className="w-3 h-3" />
                <span>{route.to}</span>
              </div>
              <p className="text-sm font-bold text-primary">{t('From', 'Kuva'  , language)} {formatRWF(route.price)}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <Clock className="w-3 h-3" />
                <span>{route.duration}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* City Picker Bottom Sheet */}
      <AnimatePresence>
        {(showFromPicker || showToPicker) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/40 z-50"
            onClick={() => { setShowFromPicker(false); setShowToPicker(false); }}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
              className="absolute bottom-0 left-0 right-0 bg-card rounded-t-[28px] p-5 pt-3 bottom-sheet-shadow max-h-[70vh]"
            >
              <div className="w-10 h-1 bg-muted rounded-full mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-4">
                {showFromPicker
                  ? t('Select departure city', 'Hitamo umujyi uturukamo', language)
                  : t('Select destination city', 'Hitamo umujyi ugiyeho', language)}
              </h3>
              <div className="space-y-1">
                {CITIES.map(city => (
                  <button
                    key={city}
                    onClick={() => {
                      if (showFromPicker) {
                        setBookingData(prev => ({ ...prev, from: city }));
                        setShowFromPicker(false);
                      } else {
                        setBookingData(prev => ({ ...prev, to: city }));
                        setShowToPicker(false);
                      }
                    }}
                    className="w-full text-left px-4 py-3.5 rounded-lg hover:bg-accent-mint/5 active:bg-accent-mint/10 text-base font-medium transition-colors tap-target"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Date Picker Bottom Sheet */}
      <AnimatePresence>
        {showDatePicker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/40 z-50"
            onClick={() => setShowDatePicker(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
              className="absolute bottom-0 left-0 right-0 bg-card rounded-t-[28px] p-5 pt-3 bottom-sheet-shadow"
            >
              <div className="w-10 h-1 bg-muted rounded-full mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-4">{t('Select Date', 'Hitamo Itariki', language)}</h3>
              <div className="grid grid-cols-4 gap-2">
                {dates.map((d, i) => {
                  const label = d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
                  const isSelected = bookingData.date === label;
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        setBookingData(prev => ({ ...prev, date: label }));
                        setShowDatePicker(false);
                      }}
                      className={`p-3 rounded-lg text-center text-sm font-medium transition-all tap-target ${
                        isSelected ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-accent-mint/10'
                      }`}
                    >
                      <div className="text-xs opacity-70">{d.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                      <div className="text-lg font-bold">{d.getDate()}</div>
                      <div className="text-xs">{d.toLocaleDateString('en-US', { month: 'short' })}</div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomeScreen;
