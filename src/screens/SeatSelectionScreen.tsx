import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useApp, t } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { generateSeatLayout, TOTAL_SEATS, formatRWF } from '@/data/busData';
import { ArrowLeft } from 'lucide-react';

const SeatSelectionScreen = () => {
  const { language, bookingData, setBookingData, setCurrentScreen } = useApp();
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const seatLayout = useMemo(() => generateSeatLayout(), []);

  const toggleSeat = (index: number) => {
    if (seatLayout[index] === 'taken') return;
    setSelectedSeats(prev =>
      prev.includes(index)
        ? prev.filter(s => s !== index)
        : prev.length < bookingData.passengers
        ? [...prev, index]
        : prev
    );
  };

  const handleContinue = () => {
    setBookingData(prev => ({ ...prev, selectedSeats }));
    setCurrentScreen('passenger');
  };

  const rows = [];
  for (let i = 0; i < TOTAL_SEATS; i += 4) {
    rows.push(seatLayout.slice(i, i + 4));
  }

  return (
    <div className="min-h-screen bg-background pb-36">
      <div className="bg-card card-shadow px-5 pt-14 pb-4">
        <div className="flex items-center gap-3">
          <button onClick={() => setCurrentScreen('details')} className="tap-target flex items-center justify-center">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-bold text-lg">{t('Select Seats', 'Hitamo Intebe', language)}</h1>
        </div>
      </div>

      <div className="px-5 mt-4">
        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-accent-mint" />
            <span className="text-xs text-muted-foreground">{t('Available', 'Iraboneka', language)}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-primary" />
            <span className="text-xs text-muted-foreground">{t('Selected', 'Yahiswemo', language)}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-destructive/20" />
            <span className="text-xs text-muted-foreground">{t('Taken', 'Yafashwe', language)}</span>
          </div>
        </div>

        {/* Bus layout */}
        <div className="bg-card rounded-xl p-6 card-shadow max-w-xs mx-auto">
          {/* Driver */}
          <div className="flex justify-end mb-6">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-xs text-muted-foreground font-medium">
              🚗
            </div>
          </div>

          {/* Seats */}
          <div className="space-y-2">
            {rows.map((row, ri) => (
              <div key={ri} className="flex items-center justify-center gap-2">
                {row.map((seat, si) => {
                  const index = ri * 4 + si;
                  const isTaken = seat === 'taken';
                  const isSelected = selectedSeats.includes(index);
                  return (
                    <>
                      <motion.button
                        key={index}
                        whileTap={{ scale: isTaken ? 1 : 0.9 }}
                        onClick={() => toggleSeat(index)}
                        disabled={isTaken}
                        className={`w-11 h-11 rounded-lg font-semibold text-xs transition-all ${
                          isTaken
                            ? 'bg-destructive/15 text-destructive/30 cursor-not-allowed'
                            : isSelected
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-accent-mint/20 text-primary hover:bg-accent-mint/40'
                        }`}
                      >
                        {index + 1}
                      </motion.button>
                      {si === 1 && <div className="w-6" />}
                    </>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card p-5 border-t border-border">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-muted-foreground">
            {selectedSeats.length}/{bookingData.passengers} {t('seats selected', 'intebe zahiswemo', language)}
          </p>
          <p className="font-bold text-primary">
            {bookingData.selectedBus && formatRWF(bookingData.selectedBus.price * selectedSeats.length)}
          </p>
        </div>
        <Button
          variant="mint"
          size="lg"
          className="w-full"
          disabled={selectedSeats.length === 0}
          onClick={handleContinue}
        >
          {t('Continue to Booking', 'Komeza Gutegura', language)}
        </Button>
      </div>
    </div>
  );
};

export default SeatSelectionScreen;
