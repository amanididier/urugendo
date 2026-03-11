import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useApp, t } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { generateBusResults, formatRWF } from '@/data/busData';
import { ArrowLeft, Wifi, Snowflake, Usb, Briefcase, Clock, AlertTriangle } from 'lucide-react';

const amenityIcons: Record<string, React.ReactNode> = {
  wifi: <Wifi className="w-3.5 h-3.5" />,
  ac: <Snowflake className="w-3.5 h-3.5" />,
  usb: <Usb className="w-3.5 h-3.5" />,
  luggage: <Briefcase className="w-3.5 h-3.5" />,
};

type SortType = 'earliest' | 'cheapest' | 'fastest';

const ResultsScreen = () => {
  const { language, bookingData, setBookingData, setCurrentScreen } = useApp();
  const [sort, setSort] = useState<SortType>('earliest');

  const buses = useMemo(() => generateBusResults(bookingData.from, bookingData.to), [bookingData.from, bookingData.to]);

  const sorted = useMemo(() => {
    const arr = [...buses];
    if (sort === 'cheapest') arr.sort((a, b) => a.price - b.price);
    if (sort === 'fastest') arr.sort((a, b) => a.dep.localeCompare(b.dep));
    return arr;
  }, [buses, sort]);

  const sortOptions: { key: SortType; label: string }[] = [
    { key: 'earliest', label: t('Earliest', 'Mbere', language) },
    { key: 'cheapest', label: t('Cheapest', 'Ihendutse', language) },
    { key: 'fastest', label: t('Fastest', 'Byihuse', language) },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-card card-shadow px-5 pt-14 pb-4">
        <div className="flex items-center gap-3">
          <button onClick={() => setCurrentScreen('home')} className="tap-target flex items-center justify-center">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <p className="font-bold text-base">{bookingData.from} → {bookingData.to}</p>
            <p className="text-xs text-muted-foreground">{bookingData.date || 'Today'} · {bookingData.passengers} {t('passenger', 'umugenzi', language)}{bookingData.passengers > 1 ? 's' : ''}</p>
          </div>
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 px-5 py-3 overflow-x-auto hide-scrollbar">
        {sortOptions.map(opt => (
          <button
            key={opt.key}
            onClick={() => setSort(opt.key)}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
              sort === opt.key
                ? 'bg-primary text-primary-foreground'
                : 'bg-card card-shadow text-foreground'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="px-5 space-y-3">
        {sorted.map((bus, i) => (
          <motion.div
            key={bus.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card rounded-xl p-4 card-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{bus.operator.logo}</span>
                <span className="font-semibold text-sm">{bus.operator.name}</span>
              </div>
              {bus.seats <= 5 && (
                <div className="flex items-center gap-1 bg-warning/10 text-warning px-2 py-1 rounded-full text-xs font-semibold">
                  <AlertTriangle className="w-3 h-3" />
                  {t(`Only ${bus.seats} left!`, `${bus.seats} gusa!`, language)}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xl font-bold">{bus.dep}</p>
                <p className="text-xs text-muted-foreground">{bookingData.from}</p>
              </div>
              <div className="flex-1 mx-4 flex flex-col items-center">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>2h 30m</span>
                </div>
                <div className="w-full h-px bg-border mt-1 relative">
                  <div className="absolute left-0 w-2 h-2 bg-primary rounded-full -top-[3px]" />
                  <div className="absolute right-0 w-2 h-2 bg-accent-mint rounded-full -top-[3px]" />
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">{bus.arr}</p>
                <p className="text-xs text-muted-foreground">{bookingData.to}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-3">
              {bus.amenities.map(a => (
                <div key={a} className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
                  {amenityIcons[a]}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <p className="text-xl font-bold text-primary">{formatRWF(bus.price)}</p>
              <Button
                variant="mint"
                size="sm"
                onClick={() => {
                  setBookingData(prev => ({ ...prev, selectedBus: bus }));
                  setCurrentScreen('details');
                }}
              >
                {t('Select', 'Hitamo', language)}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ResultsScreen;
