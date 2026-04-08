import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { formatRWF, getCityCode, getSeatLabel } from '@/data/busData';

const ConfirmationScreen = () => {
  const { bookingData, setCurrentScreen } = useApp();
  const bus = bookingData.selectedBus;

  if (!bus) return null;

  const seatLabel = bookingData.selectedSeats.length > 0
    ? `Row ${Math.floor(bookingData.selectedSeats[0] / 4) + 1} · ${getSeatLabel(bookingData.selectedSeats[0])}`
    : '—';

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Success banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-4 mt-16 rounded-3xl py-7 px-5 text-center"
        style={{ background: 'linear-gradient(135deg, #00B85C, #007A3D)' }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-[52px]"
        >
          ✅
        </motion.div>
        <div className="text-[22px] font-black text-white mt-2.5">Booking Confirmed!</div>
        <div className="text-[13px] text-white/75 font-semibold mt-1">Your e-ticket is ready to use</div>
      </motion.div>

      {/* E-Ticket Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mx-4 mt-3.5 bg-card rounded-3xl overflow-hidden border border-border"
      >
        {/* Ticket header */}
        <div className="px-5 py-4 flex justify-between items-center" style={{ backgroundColor: '#09090B' }}>
          <div className="text-[15px] font-extrabold text-white">
            Urugendo<span className="text-warning">.</span>
          </div>
          <div className="text-[10px] text-muted-foreground font-mono">{bookingData.bookingRef}</div>
        </div>

        {/* Ticket body */}
        <div className="px-5 py-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[28px] font-black text-foreground">{getCityCode(bookingData.from)}</div>
              <div className="text-[11px] text-muted-foreground font-semibold mt-0.5">{bookingData.from}</div>
            </div>
            <div className="text-xl text-primary font-bold">→</div>
            <div className="text-right">
              <div className="text-[28px] font-black text-foreground">{getCityCode(bookingData.to)}</div>
              <div className="text-[11px] text-muted-foreground font-semibold mt-0.5 text-right">{bookingData.to}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 mb-4">
            {[
              ['Date', bookingData.date || 'Today'],
              ['Departure', `${bus.dep} AM`],
              ['Passenger', bookingData.passengerName || 'Jean-Paul K.'],
              ['Seat', seatLabel],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl p-2.5 border border-border" style={{ backgroundColor: '#F9FAFB' }}>
                <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">{label}</div>
                <div className="text-[13px] font-extrabold text-foreground mt-0.5">{value}</div>
              </div>
            ))}
          </div>

          {/* Tear line */}
          <div className="relative mx-[-20px] mb-4 border-t-2 border-dashed border-border">
            <div className="absolute left-[-10px] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-background" />
            <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-background" />
          </div>

          {/* QR Code */}
          <div className="text-center">
            <div className="w-[110px] h-[110px] mx-auto rounded-xl border border-border flex items-center justify-center text-[64px]" style={{ backgroundColor: '#F9FAFB' }}>
              ▦
            </div>
            <div className="text-[11px] text-muted-foreground font-bold mt-2">Scan at boarding</div>
          </div>
        </div>

        {/* Ticket footer */}
        <div className="bg-primary px-5 py-3.5 flex justify-between items-center">
          <div>
            <div className="text-[13px] font-extrabold text-primary-foreground">{bus.operator.name}</div>
            <div className="text-[11px] text-primary-foreground/70 font-semibold mt-0.5">Nyabugogo · Gate 4</div>
          </div>
          <div className="text-right">
            <div className="text-[15px] font-extrabold text-primary-foreground">{formatRWF(bus.price + 500)}</div>
            <div className="text-[11px] text-primary-foreground/70 font-semibold">Paid · MoMo</div>
          </div>
        </div>
      </motion.div>

      {/* Action buttons */}
      <div className="flex gap-2 mx-4 mt-3.5">
        <button className="flex-1 bg-primary text-primary-foreground py-3 rounded-full text-xs font-extrabold flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all">
          ⬇ Download
        </button>
        <button className="flex-1 bg-card text-foreground py-3 rounded-full text-xs font-extrabold border border-border flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all">
          📤 Share
        </button>
        <button
          onClick={() => setCurrentScreen('home')}
          className="flex-1 bg-card text-foreground py-3 rounded-full text-xs font-extrabold border border-border flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all"
        >
          🏠 Home
        </button>
      </div>
    </div>
  );
};

export default ConfirmationScreen;
