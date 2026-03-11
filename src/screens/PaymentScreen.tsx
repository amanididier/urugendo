import { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp, t } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { formatRWF, generateBookingRef } from '@/data/busData';
import { ArrowLeft, Shield, Check } from 'lucide-react';

const paymentMethods = [
  { id: 'mtn', label: 'MTN Mobile Money', emoji: '💚', color: 'bg-[#FFCC00]/10 border-[#FFCC00]/30' },
  { id: 'airtel', label: 'Airtel Money', emoji: '🔴', color: 'bg-destructive/5 border-destructive/20' },
  { id: 'card', label: 'Card (Coming Soon)', emoji: '💳', color: 'bg-muted', disabled: true },
];

const PaymentScreen = () => {
  const { language, bookingData, setBookingData, setCurrentScreen } = useApp();
  const [selected, setSelected] = useState('mtn');
  const [loading, setLoading] = useState(false);
  const bus = bookingData.selectedBus;

  if (!bus) return null;

  const baseFare = bus.price * bookingData.selectedSeats.length;
  const bookingFee = 500;
  const total = baseFare + bookingFee;

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      const ref = generateBookingRef();
      setBookingData(prev => ({ ...prev, paymentMethod: selected, bookingRef: ref }));
      setCurrentScreen('confirmation');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      <div className="bg-card card-shadow px-5 pt-14 pb-4">
        <div className="flex items-center gap-3">
          <button onClick={() => setCurrentScreen('passenger')} className="tap-target flex items-center justify-center">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-bold text-lg">{t('Choose Payment', 'Hitamo Kwishyura', language)}</h1>
        </div>
      </div>

      <div className="px-5 mt-6 space-y-3">
        {paymentMethods.map((method, i) => (
          <motion.button
            key={method.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            disabled={method.disabled}
            onClick={() => !method.disabled && setSelected(method.id)}
            className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all tap-target ${
              method.disabled
                ? 'opacity-40 cursor-not-allowed bg-muted border-border'
                : selected === method.id
                ? 'border-accent-mint bg-accent-mint/5 card-shadow'
                : 'border-transparent bg-card card-shadow'
            }`}
          >
            <span className="text-3xl">{method.emoji}</span>
            <span className="font-semibold text-base flex-1 text-left">{method.label}</span>
            {selected === method.id && !method.disabled && (
              <div className="w-6 h-6 rounded-full bg-accent-mint flex items-center justify-center">
                <Check className="w-4 h-4 text-foreground" />
              </div>
            )}
          </motion.button>
        ))}

        {/* Phone pre-filled */}
        <div className="mt-4">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">
            {t('Phone Number', 'Nomero ya Telefone', language)}
          </label>
          <div className="bg-card rounded-lg p-4 card-shadow text-base font-medium">
            {bookingData.phone || '07X XXX XXX'}
          </div>
        </div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl p-4 card-shadow mt-4"
        >
          <h3 className="font-bold text-sm mb-3">{t('Order Summary', 'Incamake y\'Ibiciro', language)}</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('Base Fare', 'Ikiguzi', language)}</span>
              <span>{formatRWF(baseFare)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('Booking Fee', 'Amafaranga yo gutegura', language)}</span>
              <span>{formatRWF(bookingFee)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-border font-bold text-base">
              <span>{t('Total', 'Igiteranyo', language)}</span>
              <span className="text-primary">{formatRWF(total)}</span>
            </div>
          </div>
        </motion.div>

        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-4">
          <Shield className="w-4 h-4" />
          <span>256-bit encrypted · Safe & Secure</span>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-card p-5 border-t border-border">
        <Button variant="mint" size="lg" className="w-full" onClick={handlePay} disabled={loading}>
          {loading ? t('Processing...', 'Birimo gutunganywa...', language) : `${t('Pay', 'Ishyura', language)} ${formatRWF(total)}`}
        </Button>
      </div>
    </div>
  );
};

export default PaymentScreen;
