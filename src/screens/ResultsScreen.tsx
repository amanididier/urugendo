import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useApp, t } from '@/context/AppContext';
import { generateBusResults, formatRWF, AMENITY_MAP } from '@/data/busData';
import { ChevronLeft } from 'lucide-react';

type FilterType = 'all' | 'earliest' | 'cheapest' | 'ac' | 'wifi';

const ResultsScreen = () => {
  const { language, bookingData, setBookingData, setCurrentScreen, goBack } = useApp();
  const [filter, setFilter] = useState<FilterType>('all');

  const buses = useMemo(() => generateBusResults(bookingData.from, bookingData.to), [bookingData.from, bookingData.to]);

  const filtered = useMemo(() => {
    let arr = [...buses];
    if (filter === 'earliest') arr.sort((a, b) => a.dep.localeCompare(b.dep));
    if (filter === 'cheapest') arr.sort((a, b) => a.price - b.price);
    if (filter === 'ac') arr = arr.filter(b => b.amenities.includes('ac'));
    if (filter === 'wifi') arr = arr.filter(b => b.amenities.includes('wifi'));
    return arr;
  }, [buses, filter]);

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'earliest', label: 'Earliest' },
    { key: 'cheapest', label: 'Cheapest' },
    { key: 'ac', label: '⚡ AC' },
    { key: 'wifi', label: '📶 WiFi' },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="px-5 pt-14 pb-2">
        <div className="flex items-center gap-3">
          <button
            onClick={goBack}
            className="w-10 h-10 rounded-[14px] bg-card border border-border flex items-center justify-center"
          >
            <ChevronLeft className="w-[18px] h-[18px] text-foreground" />
          </button>
          <div>
            <div className="text-[17px] font-black text-foreground">{bookingData.from} → {bookingData.to}</div>
            <div className="text-xs text-muted-foreground font-medium">{bookingData.date || 'Today'} · {bookingData.passengers} passenger{bookingData.passengers > 1 ? 's' : ''}</div>
          </div>
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex gap-[7px] px-5 pt-3.5 overflow-x-auto hide-scrollbar">
        {filters.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`flex-shrink-0 px-4 py-[7px] rounded-full text-xs font-bold transition-all border ${
              filter === f.key
                ? 'bg-primary border-primary text-primary-foreground'
                : 'bg-card border-border text-muted-foreground hover:border-primary'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Results count */}
      <div className="px-5 pt-3 pb-2 text-[13px] text-muted-foreground font-semibold">
        <strong className="text-foreground">{filtered.length} buses</strong> found today
      </div>

      {/* Bus cards */}
      <div className="px-4 space-y-3">
        {filtered.map((bus, i) => (
          <motion.div
            key={bus.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => {
              setBookingData(prev => ({ ...prev, selectedBus: bus }));
              setCurrentScreen('seats');
            }}
            className="cursor-pointer group"
          >
            <div className={`bg-card rounded-[20px] border overflow-hidden transition-all group-hover:border-primary ${
              bus.seats <= 2 ? 'border-red-200' : 'border-border'
            }`}>
              {/* Operator row */}
              <div className="flex justify-between items-center px-[18px] pt-4 pb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className={`w-10 h-10 rounded-[14px] bg-gradient-to-br ${bus.operator.gradient} flex items-center justify-center text-lg`}>
                    {bus.operator.logo}
                  </div>
                  <div>
                    <div className="text-[13px] font-extrabold text-foreground">{bus.operator.name}</div>
                    <div className="text-[11px] text-muted-foreground font-medium">Standard · 45 seats</div>
                  </div>
                </div>
                <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full ${
                  bus.seats <= 2 ? 'bg-red-50 text-red-700' :
                  bus.seats <= 5 ? 'bg-amber-50 text-amber-700' :
                  'bg-green-50 text-green-700'
                }`}>
                  {bus.seats <= 2 ? `${bus.seats} left!` : bus.seats <= 5 ? `${bus.seats} left` : `${bus.seats} seats`}
                </span>
              </div>

              {/* Times */}
              <div className="flex items-center px-[18px] pb-3">
                <div>
                  <div className="text-[32px] font-black text-foreground leading-none">{bus.dep}</div>
                  <div className="text-[11px] text-muted-foreground font-semibold mt-1">Nyabugogo</div>
                </div>
                <div className="flex-1 mx-3 flex flex-col items-center gap-1.5">
                  <div className="text-[11px] font-bold text-muted-foreground">{bus.duration}</div>
                  <div className="w-full h-[1.5px] bg-border relative rounded">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-zinc-300 rounded-full" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-zinc-300 rounded-full" />
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[32px] font-black text-foreground leading-none">{bus.arr}</div>
                  <div className="text-[11px] text-muted-foreground font-semibold mt-1 text-right">{bookingData.to}</div>
                </div>
              </div>

              {/* Bottom row */}
              <div className="flex justify-between items-center px-[18px] pb-4 pt-2.5 border-t border-border">
                <div className="flex gap-[5px]">
                  {bus.amenities.map(a => (
                    <div key={a} className="w-7 h-7 bg-background rounded-[9px] border border-border flex items-center justify-center text-[13px]">
                      {AMENITY_MAP[a]?.emoji}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="text-right">
                    <div className="text-[10px] text-muted-foreground font-semibold">per seat</div>
                    <div className="text-[21px] font-black text-primary leading-none">{formatRWF(bus.price)}</div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setBookingData(prev => ({ ...prev, selectedBus: bus }));
                      setCurrentScreen('seats');
                    }}
                    className="bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-[13px] font-bold hover:brightness-105 active:scale-[0.97] transition-all"
                  >
                    Select
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ResultsScreen;
