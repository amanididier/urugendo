import { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp, t } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { formatRWF } from '@/data/busData';
import { ArrowLeft, User, Phone, CreditCard, Mail } from 'lucide-react';

const PassengerDetailsScreen = () => {
  const { language, bookingData, setBookingData, setCurrentScreen } = useApp();
  const [name, setName] = useState(bookingData.passengerName);
  const [phone, setPhone] = useState(bookingData.phone);
  const [nationalId, setNationalId] = useState(bookingData.nationalId);
  const [email, setEmail] = useState(bookingData.email);

  const formatPhone = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 10);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  };

  const handleContinue = () => {
    setBookingData(prev => ({ ...prev, passengerName: name, phone, nationalId, email }));
    setCurrentScreen('payment');
  };

  const bus = bookingData.selectedBus;

  return (
    <div className="min-h-screen bg-background pb-28">
      <div className="bg-card card-shadow px-5 pt-14 pb-4">
        <div className="flex items-center gap-3">
          <button onClick={() => setCurrentScreen('seats')} className="tap-target flex items-center justify-center">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-bold text-lg">{t('Passenger Details', 'Amakuru y\'Umugenzi', language)}</h1>
        </div>
      </div>

      <div className="px-5 mt-6 space-y-5">
        {/* Inputs */}
        {[
          { icon: <User className="w-5 h-5 text-muted-foreground" />, label: t('Full Name', 'Amazina Yombi', language), value: name, onChange: setName, placeholder: 'Jean Claude Ndayisaba', type: 'text' },
          { icon: <Phone className="w-5 h-5 text-muted-foreground" />, label: t('Phone Number', 'Nomero ya Telefone', language), value: phone, onChange: (v: string) => setPhone(formatPhone(v)), placeholder: '07X XXX XXX', type: 'tel' },
          { icon: <CreditCard className="w-5 h-5 text-muted-foreground" />, label: t('National ID (optional)', 'Indangamuntu (ntibisabwa)', language), value: nationalId, onChange: setNationalId, placeholder: '1 1990 8 0000000 0 00', type: 'text' },
          { icon: <Mail className="w-5 h-5 text-muted-foreground" />, label: t('Email (optional)', 'Imeli (ntibisabwa)', language), value: email, onChange: setEmail, placeholder: 'email@example.com', type: 'email' },
        ].map((field, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">
              {field.label}
            </label>
            <div className="flex items-center gap-3 border-b-2 border-border pb-3 focus-within:border-accent-mint transition-colors">
              {field.icon}
              <input
                type={field.type}
                value={field.value}
                onChange={e => field.onChange(e.target.value)}
                placeholder={field.placeholder}
                className="flex-1 bg-transparent outline-none text-base font-medium placeholder:text-muted-foreground/40"
              />
            </div>
          </motion.div>
        ))}

        {/* Summary */}
        {bus && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-xl p-4 card-shadow mt-6"
          >
            <h3 className="font-bold text-sm mb-3">{t('Booking Summary', 'Incamake', language)}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('Route', 'Inzira', language)}</span>
                <span className="font-medium">{bookingData.from} → {bookingData.to}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('Date', 'Itariki', language)}</span>
                <span className="font-medium">{bookingData.date || 'Today'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('Seats', 'Intebe', language)}</span>
                <span className="font-medium">{bookingData.selectedSeats.map(s => s + 1).join(', ')}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-border">
                <span className="font-bold">{t('Total', 'Igiteranyo', language)}</span>
                <span className="font-bold text-primary">{formatRWF(bus.price * bookingData.selectedSeats.length)}</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-card p-5 border-t border-border">
        <Button variant="mint" size="lg" className="w-full" disabled={!name || !phone} onClick={handleContinue}>
          {t('Proceed to Payment', 'Komeza Kwishyura', language)}
        </Button>
      </div>
    </div>
  );
};

export default PassengerDetailsScreen;
