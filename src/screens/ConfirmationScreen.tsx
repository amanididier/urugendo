import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useApp, t } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { formatRWF } from '@/data/busData';
import { Check, Download, Share2, Wallet } from 'lucide-react';

const confettiColors = ['#00E87A', '#0A5C36', '#F5A623', '#FF6B6B', '#4ECDC4', '#FFE66D'];

const ConfirmationScreen = () => {
  const { language, bookingData, setCurrentScreen } = useApp();
  const [showConfetti, setShowConfetti] = useState(true);
  const bus = bookingData.selectedBus;

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!bus) return null;

  return (
    <div className="min-h-screen bg-background pb-24 relative overflow-hidden">
      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400),
                y: -20,
                rotate: 0,
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 20,
                rotate: Math.random() * 720,
                x: `+=${(Math.random() - 0.5) * 200}`,
              }}
              transition={{
                duration: Math.random() * 2 + 1,
                delay: Math.random() * 0.5,
                ease: 'easeIn',
              }}
              className="absolute w-3 h-3 rounded-sm"
              style={{ backgroundColor: confettiColors[i % confettiColors.length] }}
            />
          ))}
        </div>
      )}

      <div className="px-5 pt-20 flex flex-col items-center">
        {/* Success check */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="w-20 h-20 rounded-full bg-accent-mint flex items-center justify-center mb-4"
        >
          <Check className="w-10 h-10 text-foreground" strokeWidth={3} />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl font-bold mb-1"
        >
          {t('Booking Confirmed!', 'Byemejwe!', language)}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground text-sm"
        >
          {t('Your e-ticket is ready', 'Itike yawe yateguwe', language)}
        </motion.p>

        {/* QR Code placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="w-48 h-48 bg-card rounded-2xl card-shadow flex items-center justify-center mt-8 mb-6"
        >
          <div className="grid grid-cols-5 gap-1">
            {Array.from({ length: 25 }).map((_, i) => (
              <div
                key={i}
                className={`w-6 h-6 rounded-sm ${Math.random() > 0.4 ? 'bg-foreground' : 'bg-transparent'}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Ticket details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="w-full bg-card rounded-xl p-5 card-shadow"
        >
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('Passenger', 'Umugenzi', language)}</span>
              <span className="font-semibold">{bookingData.passengerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('Route', 'Inzira', language)}</span>
              <span className="font-semibold">{bookingData.from} → {bookingData.to}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('Date & Time', 'Itariki n\'Isaha', language)}</span>
              <span className="font-semibold">{bookingData.date} · {bus.dep}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('Seat(s)', 'Intebe', language)}</span>
              <span className="font-semibold">{bookingData.selectedSeats.map(s => s + 1).join(', ')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('Operator', 'Inyeshyamba', language)}</span>
              <span className="font-semibold">{bus.operator.name}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-border">
              <span className="text-muted-foreground">{t('Booking Ref', 'Nomero', language)}</span>
              <span className="font-bold text-primary tracking-wider">{bookingData.bookingRef}</span>
            </div>
          </div>
        </motion.div>

        {/* Action buttons */}
        <div className="flex gap-3 mt-6 w-full">
          <Button variant="outline" size="sm" className="flex-1 gap-2">
            <Download className="w-4 h-4" /> PDF
          </Button>
          <Button variant="outline" size="sm" className="flex-1 gap-2">
            <Share2 className="w-4 h-4" /> {t('Share', 'Sangiza', language)}
          </Button>
          <Button variant="outline" size="sm" className="flex-1 gap-2">
            <Wallet className="w-4 h-4" /> Wallet
          </Button>
        </div>

        <button
          onClick={() => setCurrentScreen('home')}
          className="mt-6 text-sm text-primary font-semibold tap-target"
        >
          {t('Back to Home', 'Subira Ahabanza', language)}
        </button>
      </div>
    </div>
  );
};

export default ConfirmationScreen;
