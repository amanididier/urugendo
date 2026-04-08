import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp, t } from '@/context/AppContext';
import { CITIES, POPULAR_ROUTES, LIVE_DEPARTURES, formatRWF, AMENITY_MAP } from '@/data/busData';
import { ArrowUpDown, Calendar, Search, Bell, ChevronRight } from 'lucide-react';


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

  const isSearchReady = bookingData.from && bookingData.to;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-5 pt-14 anim">
        <div className="text-[22px] font-extrabold text-foreground tracking-tight">
          Urugendo<span className="text-warning">.</span>
        </div>
        <button className="relative w-10 h-10 rounded-xl border border-border flex items-center justify-center">
          <Bell className="w-5 h-5 text-foreground" />
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-primary rounded-full"
            style={{ border: '2px solid white' }}
          />
        </button>
      </div>

      {/* Greeting */}
      <motion.div
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="px-5 pt-6"
      >
        <p className="text-sm text-muted-foreground font-semibold">Muraho 👋</p>
        <h2 className="text-[28px] font-extrabold text-foreground mt-1">Where to today?</h2>
      </motion.div>

      {/* Search Card */}
      <div className="mx-4 mt-3 bg-card rounded-3xl border border-border overflow-hidden anim-d1">
        {/* FROM */}
        <button
          onClick={() => { setShowFromPicker(true); setCitySearch(''); }}
          className="w-full flex items-center px-4 py-3.5 border-b border-border hover:bg-muted/30 transition-colors"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-primary mr-3 flex-shrink-0" />
          <div className="text-left flex-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">From</p>
            <p className={`text-[15px] font-bold ${bookingData.from ? 'text-foreground' : 'text-muted-foreground'}`}>
              {bookingData.from || 'Select departure'}
            </p>
          </div>
        </button>

        {/* TO */}
        <button
          onClick={() => { setShowToPicker(true); setCitySearch(''); }}
          className="w-full flex items-center px-4 py-3.5 border-b border-border hover:bg-muted/30 transition-colors relative"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-warning mr-3 flex-shrink-0" />
          <div className="text-left flex-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">To</p>
            <p className={`text-[15px] font-bold ${bookingData.to ? 'text-foreground' : 'text-muted-foreground'}`}>
              {bookingData.to || 'Select destination'}
            </p>
          </div>
          <motion.button
            animate={{ rotate: isSwapping ? 180 : 0 }}
            onClick={(e) => { e.stopPropagation(); handleSwap(); }}
            className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
          </motion.button>
        </button>

        {/* Date + Passengers row */}
        <div className="flex gap-2 px-2.5 py-2.5 border-b border-border">
          <button
            onClick={() => setShowDatePicker(true)}
            className="flex-[0.65] flex items-center gap-2 bg-muted/50 rounded-xl px-3 py-2.5"
          >
            <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-[13px] font-semibold text-secondary-foreground">
              {bookingData.date || 'Today'}
            </span>
          </button>
          <div className="flex-[0.35] flex items-center justify-center gap-2 bg-muted/50 rounded-xl px-2 py-2.5">
            <button
              onClick={() => setBookingData(prev => ({ ...prev, passengers: Math.max(1, prev.passengers - 1) }))}
              className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-foreground text-sm font-bold"
            >
              −
            </button>
            <span className="text-sm font-extrabold text-foreground min-w-[14px] text-center">{bookingData.passengers}</span>
            <button
              onClick={() => setBookingData(prev => ({ ...prev, passengers: Math.min(6, prev.passengers + 1) }))}
              className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-foreground text-sm font-bold"
            >
              +
            </button>
          </div>
        </div>

        {/* Search button */}
        <div className="p-2">
          <motion.button
            onClick={handleSearch}
            disabled={!isSearchReady}
            animate={isSearchReady ? { scale: [1, 1.02, 1] } : {}}
            transition={{ duration: 0.4 }}
            className={`w-full h-12 rounded-full font-bold text-[15px] flex items-center justify-center gap-2 transition-colors ${
              isSearchReady
                ? 'bg-primary text-primary-foreground active:scale-[0.97]'
                : 'bg-primary/40 text-white/70 cursor-not-allowed'
            }`}
          >
            <Search className="w-4 h-4" />
            Search Buses
          </motion.button>
        </div>
      </div>

      {/* Rugendo AI Tip */}
      <div className="mx-4 mt-4 anim-d1">
        <button className="w-full bg-card rounded-2xl border border-border flex items-center gap-3 p-3.5 hover:bg-muted/30 transition-colors">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xl flex-shrink-0">
            🚌
          </div>
          <div className="flex-1 text-left">
            <p className="text-[13px] font-bold text-primary">Rugendo says hi! 👋</p>
            <p className="text-xs text-secondary-foreground mt-0.5">Need help? Tap me and I'll find the best bus for you!</p>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        </button>
      </div>

      {/* Popular Routes */}
      <div className="mt-6">
        <div className="flex justify-between items-center px-5 mb-3 anim-d2">
          <span className="text-[17px] font-extrabold text-foreground">Popular Routes</span>
          <span className="text-[13px] font-bold text-primary cursor-pointer">See all</span>
        </div>
        <div className="flex gap-2.5 overflow-x-auto hide-scrollbar px-5 pb-2 anim-d2">
          {POPULAR_ROUTES.map((route, i) => (
            <button
              key={i}
              onClick={() => {
                setBookingData(prev => ({ ...prev, from: route.from, to: route.to }));
              }}
              className={`flex-shrink-0 min-w-[150px] bg-card border rounded-xl px-3.5 py-3 text-left transition-all ${
                bookingData.from === route.from && bookingData.to === route.to ? 'border-primary' : 'border-border'
              }`}
            >
              <div className="text-[13px] font-bold text-foreground mb-1.5">{route.from} → {route.to}</div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-primary">{formatRWF(route.price)}</span>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold" style={{ backgroundColor: '#DCFCE7', color: '#16A34A' }}>
            <motion.span
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: '#16A34A' }}
            />
            Live
          </span>
        </div>

        {LIVE_DEPARTURES.map((dep, i) => (
          <motion.div
            key={dep.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.08 }}
            onClick={() => {
              setBookingData(prev => ({ ...prev, from: dep.from, to: dep.to, selectedBus: dep }));
              setCurrentScreen('results');
            }}
            className="mx-4 mb-3 cursor-pointer group"
          >
            <div className="bg-card rounded-3xl border border-border overflow-hidden transition-all group-hover:border-primary">
              {/* Operator row */}
              <div className="flex justify-between items-center px-4 pt-4 pb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${dep.operator.gradient} flex items-center justify-center text-lg`}>
                    {dep.operator.logo}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">{dep.operator.name}</div>
                    <div className="text-xs text-muted-foreground">{dep.from} → {dep.to}</div>
                  </div>
                </div>
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                  dep.seats <= 2 ? 'text-red-700' : dep.seats <= 5 ? 'text-amber-700' : 'text-green-700'
                }`} style={{
                  backgroundColor: dep.seats <= 2 ? '#FEE2E2' : dep.seats <= 5 ? '#FEF9C3' : '#DCFCE7'
                }}>
                  {dep.seats <= 2 ? `${dep.seats} left!` : `${dep.seats} seats`}
                </span>
              </div>

              {/* Times */}
              <div className="flex items-center px-4 pb-3.5">
                <div>
                  <div className="text-[40px] font-black text-foreground leading-none">{dep.dep}</div>
                  <div className="text-xs text-muted-foreground font-semibold mt-1">Nyabugogo</div>
                </div>
                <div className="flex-1 mx-3 flex flex-col items-center gap-1.5">
                  <div className="text-[11px] font-bold text-muted-foreground">{dep.duration}</div>
                  <div className="w-full h-px bg-border relative">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-muted-foreground/30 rounded-full" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-muted-foreground/30 rounded-full" />
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[40px] font-black text-foreground leading-none">{dep.arr}</div>
                  <div className="text-xs text-muted-foreground font-semibold mt-1 text-right">{dep.to}</div>
                </div>
              </div>

              {/* Bottom row */}
              <div className="flex justify-between items-center px-4 pb-4 pt-2.5 border-t border-border">
                <div className="flex gap-1.5">
                  {dep.amenities.map((a, ai) => (
                    <motion.div
                      key={a}
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{ delay: ai * 0.1, duration: 0.5 }}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                      style={{ backgroundColor: '#F4F4F5' }}
                    >
                      {AMENITY_MAP[a]?.emoji}
                    </motion.div>
                  ))}
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-muted-foreground font-semibold">per seat</div>
                  <div className="text-xl font-bold text-primary leading-none">{formatRWF(dep.price)}</div>
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
              className="absolute bottom-0 left-0 right-0 bg-card rounded-t-[28px] p-5 pt-3 max-h-[70vh]"
              style={{ boxShadow: '0 -8px 40px -4px rgba(0,0,0,0.12)' }}
            >
              <div className="w-10 h-1 bg-muted-foreground/20 rounded-full mx-auto mb-4" />
              <h3 className="text-lg font-extrabold mb-4">
                {showFromPicker ? 'Select Departure' : 'Select Destination'}
              </h3>
              <div className="flex items-center gap-2 bg-muted/50 rounded-xl px-3 py-2.5 mb-3">
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
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-1 mb-2">All Cities</div>
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
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-muted/30 active:bg-muted/50 transition-colors"
                  >
                    <span className="text-xl">{city.flag}</span>
                    <div className="flex-1 text-left">
                      <div className="text-sm font-bold text-foreground">{city.name}</div>
                      <div className="text-xs text-muted-foreground">{city.terminal}</div>
                    </div>
                    <div className="text-[11px] font-bold text-muted-foreground font-mono">{city.code}</div>
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
              className="absolute bottom-0 left-0 right-0 bg-card rounded-t-[28px] p-5 pt-3"
              style={{ boxShadow: '0 -8px 40px -4px rgba(0,0,0,0.12)' }}
            >
              <div className="w-10 h-1 bg-muted-foreground/20 rounded-full mx-auto mb-4" />
              <h3 className="text-lg font-extrabold mb-4">Select Date</h3>
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
                      className={`p-3 rounded-xl text-center text-sm font-medium transition-all ${
                        isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted/50 hover:border-primary border border-border'
                      }`}
                    >
                      <div className="text-xs opacity-70">{d.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                      <div className="text-lg font-extrabold">{d.getDate()}</div>
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
