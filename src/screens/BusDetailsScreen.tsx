import { motion } from 'framer-motion';
import { useApp, t } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Star, Wifi, Snowflake, Usb, Briefcase, MapPin, Clock, Shield } from 'lucide-react';

const amenityDetails = [
  { key: 'wifi', icon: <Wifi className="w-5 h-5" />, label: 'Free WiFi' },
  { key: 'ac', icon: <Snowflake className="w-5 h-5" />, label: 'Air Conditioning' },
  { key: 'usb', icon: <Usb className="w-5 h-5" />, label: 'USB Charging' },
  { key: 'luggage', icon: <Briefcase className="w-5 h-5" />, label: 'Luggage Storage' },
];

const BusDetailsScreen = () => {
  const { language, bookingData, setCurrentScreen } = useApp();
  const bus = bookingData.selectedBus;

  if (!bus) return null;

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-5 pt-14 pb-8 rounded-b-[28px]">
        <button onClick={() => setCurrentScreen('results')} className="tap-target flex items-center justify-center mb-4">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">{bus.operator.logo}</span>
          <div>
            <h1 className="text-xl font-bold">{bus.operator.name}</h1>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-4 h-4 fill-warning text-warning" />
              <span className="text-sm font-medium">4.5</span>
              <span className="text-sm opacity-60">(128 reviews)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 -mt-4 space-y-4">
        {/* Route Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl p-5 card-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="text-center">
              <p className="text-2xl font-bold">{bus.dep}</p>
              <p className="text-sm text-muted-foreground mt-1">{bus.from}</p>
              <p className="text-xs text-muted-foreground">Main Terminal</p>
            </div>
            <div className="flex-1 mx-6 relative">
              <div className="h-0.5 bg-accent-mint w-full" />
              <div className="absolute left-0 -top-1.5 w-3 h-3 bg-primary rounded-full border-2 border-card" />
              <div className="absolute right-0 -top-1.5 w-3 h-3 bg-accent-mint rounded-full border-2 border-card" />
              <div className="absolute left-1/2 -translate-x-1/2 -top-3">
                <div className="flex items-center gap-1 bg-card px-2 py-0.5 rounded-full text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" /> 2h 30m
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{bus.arr}</p>
              <p className="text-sm text-muted-foreground mt-1">{bus.to}</p>
              <p className="text-xs text-muted-foreground">Bus Station</p>
            </div>
          </div>
        </motion.div>

        {/* Amenities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-xl p-5 card-shadow"
        >
          <h3 className="font-bold mb-3">{t('Amenities', 'Ibikoresho', language)}</h3>
          <div className="grid grid-cols-2 gap-3">
            {amenityDetails.filter(a => bus.amenities.includes(a.key)).map(a => (
              <div key={a.key} className="flex items-center gap-3 text-sm">
                <div className="w-10 h-10 rounded-xl bg-accent-mint/10 flex items-center justify-center text-primary">
                  {a.icon}
                </div>
                <span className="font-medium">{a.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Cancellation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-card rounded-xl p-5 card-shadow"
        >
          <h3 className="font-bold mb-2">{t('Cancellation Policy', 'Amategeko', language)}</h3>
          <div className="flex items-start gap-2">
            <Shield className="w-5 h-5 text-accent-mint mt-0.5 flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              {t('Free cancellation up to 2 hours before departure. 50% refund within 2 hours.', 
                 'Gusiba ku buntu mbere y\'amasaha 2 yo kugenda. 50% yo gusubizwa.',
                 language)}
            </p>
          </div>
        </motion.div>

        {/* Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl p-5 card-shadow"
        >
          <h3 className="font-bold mb-3">{t('Reviews', 'Ibitekerezo', language)}</h3>
          {[
            { name: 'Jean Claude', text: 'Very comfortable ride, arrived on time!', stars: 5 },
            { name: 'Marie', text: 'Clean bus, friendly driver. WiFi worked great.', stars: 4 },
          ].map((review, i) => (
            <div key={i} className={`${i > 0 ? 'mt-3 pt-3 border-t border-border' : ''}`}>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                  {review.name[0]}
                </div>
                <span className="font-semibold text-sm">{review.name}</span>
                <div className="flex ml-auto">
                  {Array.from({ length: review.stars }).map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-warning text-warning" />
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground ml-10">{review.text}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Sticky Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-card p-5 border-t border-border safe-area-bottom">
        <Button variant="mint" size="lg" className="w-full" onClick={() => setCurrentScreen('seats')}>
          {t('Choose Seats', 'Hitamo Intebe', language)}
        </Button>
      </div>
    </div>
  );
};

export default BusDetailsScreen;
