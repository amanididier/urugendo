import { motion } from 'framer-motion';
import { useApp, t } from '@/context/AppContext';
import { formatRWF, getCityCode, getSeatLabel } from '@/data/busData';

const ConfirmationScreen = () => {
  const { language, bookingData, setCurrentScreen } = useApp();
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
        className="mx-4 mt-16 bg-gradient-to-br from-green-100 to-green-50 border-[1.5px] border-green-400 rounded-[22px] py-[26px] px-5 text-center"
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="text-[52px]"
        >
          ✅
        </motion.div>
        <div className="text-[22px] font-black text-foreground mt-2.5">Booking Confirmed!</div>
        <div className="text-[13px] text-muted-foreground font-semibold mt-1">Your e-ticket is ready to use</div>
      </motion.div>

      {/* E-Ticket Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mx-4 mt-3.5 bg-white rounded-3xl overflow-hidden shadow-lg border border-border"
      >
        {/* Ticket header */}
        <div className="bg-foreground px-[22px] py-[18px] flex justify-between items-center">
          <div className="text-[15px] font-black text-white">
            BusEase<span className="text-primary">.</span>
          </div>
          <div className="text-[10px] text-zinc-500 font-mono">{bookingData.bookingRef}</div>
        </div>

        {/* Ticket body */}
        <div className="px-[22px] py-5">
          {/* Route row */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[26px] font-black text-foreground">{getCityCode(bookingData.from)}</div>
              <div className="text-[11px] text-muted-foreground font-semibold mt-0.5">{bookingData.from}</div>
            </div>
            <div className="text-xl text-primary font-bold">→</div>
            <div className="text-right">
              <div className="text-[26px] font-black text-foreground">{getCityCode(bookingData.to)}</div>
              <div className="text-[11px] text-muted-foreground font-semibold mt-0.5 text-right">{bookingData.to}</div>
            </div>
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-2.5 mb-4">
            {[
              ['Date', bookingData.date || 'Today'],
              ['Departure', `${bus.dep} AM`],
              ['Passenger', bookingData.passengerName || 'Jean-Paul K.'],
              ['Seat', seatLabel],
            ].map(([label, value]) => (
              <div key={label} className="bg-zinc-50 rounded-xl p-2.5 border border-zinc-100">
                <div className="text-[10px] text-muted-foreground font-extrabold uppercase tracking-wider">{label}</div>
                <div className="text-[13px] font-extrabold text-foreground mt-0.5">{value}</div>
              </div>
            ))}
          </div>

          {/* Tear line */}
          <div className="relative mx-[-22px] mb-4 border-t-2 border-dashed border-zinc-200">
            <div className="absolute left-[-11px] top-1/2 -translate-y-1/2 w-[22px] h-[22px] rounded-full bg-background" />
            <div className="absolute right-[-11px] top-1/2 -translate-y-1/2 w-[22px] h-[22px] rounded-full bg-background" />
          </div>

          {/* QR Code */}
          <div className="text-center">
            <div className="w-[110px] h-[110px] mx-auto bg-zinc-100 rounded-[14px] border-[1.5px] border-zinc-200 flex items-center justify-center text-[64px]">
              ▦
            </div>
            <div className="text-[11px] text-muted-foreground font-bold mt-2">Scan at boarding</div>
          </div>
        </div>

        {/* Ticket footer */}
        <div className="bg-primary px-[22px] py-3.5 flex justify-between items-center">
          <div>
            <div className="text-[13px] font-black text-primary-foreground">{bus.operator.name}</div>
            <div className="text-[11px] text-primary-foreground/70 font-semibold mt-0.5">Nyabugogo · Gate 4</div>
          </div>
          <div className="text-right">
            <div className="text-[15px] font-black text-primary-foreground">{formatRWF(bus.price + 500)}</div>
            <div className="text-[11px] text-primary-foreground/70 font-semibold">Paid · MoMo</div>
          </div>
        </div>
      </motion.div>

      {/* Action buttons */}
      <div className="flex gap-2 mx-4 mt-3.5">
        <button className="flex-1 bg-primary text-primary-foreground py-[13px] rounded-[14px] text-xs font-extrabold flex items-center justify-center gap-1.5 hover:brightness-105 active:scale-[0.98] transition-all">
          ⬇ Download
        </button>
        <button className="flex-1 bg-card text-foreground py-[13px] rounded-[14px] text-xs font-extrabold border border-border flex items-center justify-center gap-1.5 hover:bg-background transition-all">
          📤 Share
        </button>
        <button
          onClick={() => setCurrentScreen('home')}
          className="flex-1 bg-card text-foreground py-[13px] rounded-[14px] text-xs font-extrabold border border-border flex items-center justify-center gap-1.5 hover:bg-background transition-all"
        >
          🏠 Home
        </button>
      </div>
    </div>
  );
};

export default ConfirmationScreen;
