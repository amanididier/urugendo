import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp, t } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { CITIES, POPULAR_ROUTES, LIVE_DEPARTURES, formatRWF, AMENITY_MAP, type City } from '@/data/busData';
import { ArrowDownUp, Calendar, Search, Minus, Plus, ChevronRight, Bell } from 'lucide-react';

const HomeScreen = () => {
  const { language, bookingData, setBookingData, setCurrentScreen, userName } = useApp();
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);
  const [citySearch, setCitySearch] = useState('');

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

  const filteredCities = CITIES.filter(c =>
    c.name.toLowerCase().includes(citySearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-5 pt-14 anim">
        <div className="text-xl font-black text-foreground tracking-tight">
          BusEase<span className="text-primary">.</span>
        </div>
        <button className="w-10 h-10 rounded-[14px] bg-card border border-border flex items-center justify-center relative">
          <Bell className="w-[18px] h-[18px] text-foreground" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background" />
        </button>
      </div>

      {/* Greeting */}
      <div className="px-5 pt-5 anim-d1">
        <p className="text-sm text-muted-foreground font-semibold">Muraho 👋</p>
        <h2 className="text-2xl font-black text-foreground mt-1">Where to today?</h2>
      </div>

      {/* Search Card */}
      <div className="mx-4 mt-4 bg-card rounded-3xl border border-border p-1.5 anim-d1">
        {/* FROM */}
        <button
          onClick={() => { setShowFromPicker(true); setCitySearch(''); }}
          className="w-full flex items-center px-3.5 py-3 rounded-[18px] hover:bg-background transition-colors relative"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-primary mr-3 flex-shrink-0" />
          <div className="text-left flex-1">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">From</p>
            <p className={`text-[15px] font-bold ${bookingData.from ? 'text-foreground' : 'text-muted-foreground'}`}>
              {bookingData.from || 'Select departure'}
            </p>
          </div>
        </button>

        {/* TO */}
        <button
          onClick={() => { setShowToPicker(true); setCitySearch(''); }}
          className="w-full flex items-center px-3.5 py-3 rounded-[18px] hover:bg-background transition-colors relative border-t border-border"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-warning mr-3 flex-shrink-0" />
          <div className="text-left flex-1">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">To</p>
            <p className={`text-[15px] font-bold ${bookingData.to ? 'text-foreground' : 'text-muted-foreground/50'}`}>
              {bookingData.to || 'Select destination'}
            </p>
          </div>
          <motion.button
            animate={{ rotate: isSwapping ? 180 : 0 }}
            onClick={(e) => { e.stopPropagation(); handleSwap(); }}
            className="w-8 h-8 rounded-[10px] bg-background border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <ArrowDownUp className="w-4 h-4" />
          </motion.button>
        </button>

        {/* Date + Passengers row */}
        <div className="flex gap-2 px-2 py-1.5">
          <button
            onClick={() => setShowDatePicker(true)}
            className="flex-1 flex items-center gap-2 bg-background rounded-[14px] px-3 py-2.5 border border-border hover:border-primary transition-colors"
          >
            <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-sm font-bold text-foreground">
              {bookingData.date || 'Today'}
            </span>
          </button>
          <div className="flex items-center gap-2 bg-background rounded-[14px] px-3 py-2.5 border border-border">
            <button
              onClick={() => setBookingData(prev => ({ ...prev, passengers: Math.max(1, prev.passengers - 1) }))}
              className="w-6 h-6 rounded-lg bg-card border border-border flex items-center justify-center text-foreground font-bold text-sm hover:bg-primary hover:border-primary hover:text-primary-foreground transition-colors"
            >
              −
            </button>
            <span className="text-sm font-extrabold text-foreground min-w-[14px] text-center">{bookingData.passengers}</span>
            <button
              onClick={() => setBookingData(prev => ({ ...prev, passengers: Math.min(6, prev.passengers + 1) }))}
              className="w-6 h-6 rounded-lg bg-card border border-border flex items-center justify-center text-foreground font-bold text-sm hover:bg-primary hover:border-primary hover:text-primary-foreground transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Search button */}
        <div className="px-2 pb-1.5">
          <Button
            variant="mint"
            size="lg"
            className="w-full rounded-[20px]"
            onClick={handleSearch}
            disabled={!bookingData.from || !bookingData.to}
          >
            <Search className="w-[18px] h-[18px]" />
            Search Buses
          </Button>
        </div>
      </div>

      {/* Popular Routes */}
      <div className="mt-6">
        <div className="flex justify-between items-center px-5 mb-3 anim-d2">
          <span className="text-[17px] font-extrabold text-foreground">Popular Routes</span>
          <span className="text-sm font-bold text-primary cursor-pointer">See all</span>
        </div>
        <div className="flex gap-2.5 overflow-x-auto hide-scrollbar px-5 pb-2 anim-d2">
          {POPULAR_ROUTES.map((route, i) => (
            <button
              key={i}
              onClick={() => {
                setBookingData(prev => ({ ...prev, from: route.from, to: route.to }));
              }}
              className={`flex-shrink-0 min-w-[150px] bg-card border border-border rounded-[18px] px-4 py-3.5 text-left transition-all hover:border-primary ${
                bookingData.from === route.from && bookingData.to === route.to ? 'border-primary' : ''
              }`}
            >
              <div className="text-[13px] font-extrabold text-foreground mb-1.5">{route.from} → {route.to}</div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-extrabold text-primary">{formatRWF(route.price)}</span>
                <span className="w-[3px] h-[3px] bg-muted-foreground rounded-full" />
                <span className="text-[11px] text-muted-foreground font-semibold">{route.duration}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Live Departures */}
      <div className="mt-4">
        <div className="flex justify-between items-center px-5 mb-3 anim-d3">
          <span className="text-[17px] font-extrabold text-foreground">Live Departures</span>
          <span className="inline-flex items-center gap-1.5 bg-[hsl(var(--success-light))] text-green-700 px-2.5 py-1 rounded-full text-[11px] font-extrabold border border-green-200">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full live-dot" />
            Live
          </span>
        </div>

        {LIVE_DEPARTURES.map((dep, i) => (
          <motion.div
            key={dep.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.05 }}
            onClick={() => {
              setBookingData(prev => ({ ...prev, from: dep.from, to: dep.to, selectedBus: dep }));
              setCurrentScreen('results');
            }}
            className="mx-4 mb-3 cursor-pointer group"
          >
            <div className="bg-card rounded-[20px] border border-border overflow-hidden transition-all group-hover:border-primary">
              {/* Operator row */}
              <div className="flex justify-between items-center px-[18px] pt-4 pb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className={`w-10 h-10 rounded-[14px] bg-gradient-to-br ${dep.operator.gradient} flex items-center justify-center text-lg`}>
                    {dep.operator.logo}
                  </div>
                  <div>
                    <div className="text-[13px] font-extrabold text-foreground">{dep.operator.name}</div>
                    <div className="text-[11px] text-muted-foreground">{dep.from} → {dep.to}</div>
                  </div>
                </div>
                <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full ${
                  dep.seats <= 2 ? 'bg-red-50 text-red-700' :
                  dep.seats <= 5 ? 'bg-amber-50 text-amber-700' :
                  'bg-green-50 text-green-700'
                }`}>
                  {dep.seats <= 2 ? `${dep.seats} left!` : `${dep.seats} seats`}
                </span>
              </div>

              {/* Times */}
              <div className="flex items-center px-[18px] pb-3.5">
                <div>
                  <div className="text-[28px] font-black text-foreground leading-none">{dep.dep}</div>
                  <div className="text-[11px] text-muted-foreground font-semibold mt-1">Nyabugogo</div>
                </div>
                <div className="flex-1 mx-2.5 flex flex-col items-center gap-1.5">
                  <div className="bg-background rounded-full px-2.5 py-0.5 text-[11px] font-bold text-muted-foreground border border-border">
                    {dep.duration}
                  </div>
                  <div className="w-full h-[1.5px] bg-border relative rounded">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-zinc-300 rounded-full" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-zinc-300 rounded-full" />
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[28px] font-black text-foreground leading-none">{dep.arr}</div>
                  <div className="text-[11px] text-muted-foreground font-semibold mt-1 text-right">{dep.to}</div>
                </div>
              </div>

              {/* Bottom row */}
              <div className="flex justify-between items-center px-[18px] pb-4 pt-2.5 border-t border-border">
                <div className="flex gap-[5px]">
                  {dep.amenities.map(a => (
                    <div key={a} className="w-7 h-7 bg-background rounded-[9px] border border-border flex items-center justify-center text-[13px]">
                      {AMENITY_MAP[a]?.emoji}
                    </div>
                  ))}
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-muted-foreground font-semibold">per seat</div>
                  <div className="text-[19px] font-black text-primary leading-none">{formatRWF(dep.price)}</div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* City Picker Bottom Sheet */}
      <AnimatePresence>
        {(showFromPicker || showToPicker) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50"
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
              <h3 className="text-lg font-black mb-4">
                {showFromPicker ? 'Select Departure' : 'Select Destination'}
              </h3>
              {/* Search */}
              <div className="flex items-center gap-2 bg-background rounded-[14px] px-3 py-2.5 border border-border mb-3">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={citySearch}
                  onChange={e => setCitySearch(e.target.value)}
                  placeholder="Search cities..."
                  className="flex-1 bg-transparent outline-none text-sm font-medium placeholder:text-muted-foreground"
                  autoFocus
                />
              </div>
              <div className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider px-1 mb-2">All Cities</div>
              <div className="space-y-0.5 overflow-y-auto max-h-[45vh]">
                {filteredCities.map(city => (
                  <button
                    key={city.name}
                    onClick={() => {
                      if (showFromPicker) {
                        setBookingData(prev => ({ ...prev, from: city.name }));
                        setShowFromPicker(false);
                      } else {
                        setBookingData(prev => ({ ...prev, to: city.name }));
                        setShowToPicker(false);
                      }
                    }}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-[14px] hover:bg-background active:bg-background transition-colors"
                  >
                    <span className="text-xl">{city.flag}</span>
                    <div className="flex-1 text-left">
                      <div className="text-sm font-bold text-foreground">{city.name}</div>
                      <div className="text-[11px] text-muted-foreground">{city.terminal}</div>
                    </div>
                    <div className="text-[11px] font-bold text-muted-foreground bg-background px-2 py-1 rounded-md border border-border">{city.code}</div>
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
            className="fixed inset-0 bg-black/40 z-50"
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
              <h3 className="text-lg font-black mb-4">Select Date</h3>
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
                      className={`p-3 rounded-[14px] text-center text-sm font-medium transition-all ${
                        isSelected ? 'bg-primary text-primary-foreground' : 'bg-background hover:border-primary border border-border'
                      }`}
                    >
                      <div className="text-xs opacity-70">{d.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                      <div className="text-lg font-black">{d.getDate()}</div>
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
