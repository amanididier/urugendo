import { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp, t } from '@/context/AppContext';
import { formatRWF, generateBookingRef, getSeatLabel } from '@/data/busData';
import { ChevronLeft } from 'lucide-react';

const PaymentScreen = () => {
  const { language, bookingData, setBookingData, setCurrentScreen, goBack } = useApp();
  const [selected, setSelected] = useState('mtn');
  const [loading, setLoading] = useState(false);
  const bus = bookingData.selectedBus;

  if (!bus) return null;

  const baseFare = bus.price;
  const bookingFee = 500;
  const total = baseFare + bookingFee;

  const seatLabel = bookingData.selectedSeats.length > 0 
    ? `Row ${Math.floor(bookingData.selectedSeats[0] / 4) + 1}, Seat ${getSeatLabel(bookingData.selectedSeats[0])}`
    : '—';

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      const ref = generateBookingRef();
      setBookingData(prev => ({ ...prev, paymentMethod: selected, bookingRef: ref }));
      setCurrentScreen('confirmation');
      setLoading(false);
    }, 1500);
  };

  const payMethods = [
    { id: 'mtn', name: 'MTN Mobile Money', sub: 'Recommended · 0789 XXX XXX', emoji: '💛', bgClass: 'bg-gradient-to-br from-yellow-400 to-amber-500' },
    { id: 'airtel', name: 'Airtel Money', sub: '0739 XXX XXX', emoji: '❤️', bgClass: 'bg-gradient-to-br from-red-500 to-red-700' },
    { id: 'card', name: 'Bank Card', sub: 'Coming soon', emoji: '💳', bgClass: 'bg-background border border-border', disabled: true },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex-1 pb-4">
      {/* Header */}
      <div className="px-5 pt-14 pb-2">
        <div className="flex items-center gap-3">
          <button onClick={goBack} className="w-10 h-10 rounded-[14px] bg-card border border-border flex items-center justify-center">
            <ChevronLeft className="w-[18px] h-[18px] text-foreground" />
          </button>
          <div>
            <div className="text-[17px] font-black text-foreground">Payment</div>
            <div className="text-xs text-muted-foreground font-medium">Almost there! 🎉</div>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="px-5 pt-4">
        <div className="text-[11px] font-extrabold text-muted-foreground uppercase tracking-wider mb-2">Order Summary</div>
        <div className="bg-card rounded-[22px] border border-border overflow-hidden">
          {[
            ['Route', `${bookingData.from} → ${bookingData.to}`],
            ['Date & Time', `${bookingData.date || 'Today'} · ${bus.dep}`],
            ['Operator', bus.operator.name],
            ['Seat', seatLabel],
            ['Base Fare', formatRWF(baseFare)],
            ['Booking Fee', formatRWF(bookingFee)],
          ].map(([label, value], i) => (
            <div key={i} className="flex justify-between items-center px-[18px] py-[13px] border-b border-border last:border-b-0">
              <span className="text-[13px] text-muted-foreground font-semibold">{label}</span>
              <span className="text-[13px] font-bold text-foreground">{value}</span>
            </div>
          ))}
          <div className="flex justify-between items-center px-[18px] py-[13px] border-t border-border">
            <span className="text-[13px] font-extrabold text-foreground">Total</span>
            <span className="text-xl font-black text-primary">{formatRWF(total)}</span>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="px-5 pt-5">
        <div className="text-[11px] font-extrabold text-muted-foreground uppercase tracking-wider mb-2">Payment Method</div>
        <div className="space-y-2">
          {payMethods.map(pm => (
            <button
              key={pm.id}
              disabled={pm.disabled}
              onClick={() => !pm.disabled && setSelected(pm.id)}
              className={`w-full flex items-center gap-3 bg-card border rounded-[18px] px-[18px] py-4 transition-all ${
                pm.disabled ? 'opacity-40 cursor-not-allowed border-border' :
                selected === pm.id ? 'border-primary' : 'border-border'
              }`}
            >
              <div className={`w-[46px] h-[46px] rounded-[14px] ${pm.bgClass} flex items-center justify-center text-2xl`}>
                {pm.emoji}
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm font-extrabold text-foreground">{pm.name}</div>
                <div className="text-xs text-muted-foreground font-medium mt-0.5">{pm.sub}</div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 relative transition-colors ${
                selected === pm.id && !pm.disabled ? 'border-primary' : 'border-border'
              }`}>
                {selected === pm.id && !pm.disabled && (
                  <div className="absolute w-2 h-2 rounded-full bg-primary top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      </div>
      {/* Pay button */}
      <div className="sticky bottom-0 left-0 right-0 bg-card border-t border-border p-4 z-40">
        <button
          onClick={handlePay}
          disabled={loading}
          className="w-full bg-primary text-primary-foreground rounded-[18px] py-4 text-base font-black flex items-center justify-center gap-2 hover:brightness-105 active:scale-[0.98] transition-all disabled:opacity-50"
        >
          {loading ? 'Processing...' : `🔒 Pay ${formatRWF(total)}`}
        </button>
        <div className="text-center text-xs text-muted-foreground font-semibold mt-2.5">
          🔐 256-bit encrypted · Safe & secure
        </div>
      </div>
    </div>
  );
};

export default PaymentScreen;
