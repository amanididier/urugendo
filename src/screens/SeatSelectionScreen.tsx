import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { generateSeatLayout, TOTAL_SEATS, formatRWF, getSeatLabel } from '@/data/busData';
import { ChevronLeft } from 'lucide-react';

const SeatSelectionScreen = () => {
  const { bookingData, setBookingData, setCurrentScreen, goBack } = useApp();
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);
  const seatLayout = useMemo(() => generateSeatLayout(), []);
  const bus = bookingData.selectedBus;

  const toggleSeat = (index: number) => {
    if (seatLayout[index] === 'taken') return;
    setSelectedSeat(prev => prev === index ? null : index);
  };

  const handleContinue = () => {
    if (selectedSeat !== null) {
      setBookingData(prev => ({ ...prev, selectedSeats: [selectedSeat] }));
      setCurrentScreen('payment');
    }
  };

  const rows = [];
  for (let i = 0; i < TOTAL_SEATS; i += 4) {
    rows.push(Array.from({ length: 4 }, (_, j) => i + j));
  }

  if (!bus) return null;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex-1 pb-4">
        {/* Header */}
        <div className="px-5 pt-14 pb-2">
          <div className="flex items-center gap-3">
            <button onClick={goBack} className="w-10 h-10 flex items-center justify-center">
              <ChevronLeft className="w-6 h-6 text-foreground" />
            </button>
            <div>
              <div className="text-[17px] font-extrabold text-foreground">Choose Seat</div>
              <div className="text-xs text-muted-foreground font-medium">{bus.operator.name} · {bus.dep}</div>
            </div>
          </div>
        </div>

        {/* Trip info banner */}
        <div className="mx-4 mt-3.5 bg-primary rounded-[20px] px-4 py-4 flex justify-between items-center">
          <div>
            <div className="text-base font-extrabold text-primary-foreground">{bookingData.from} → {bookingData.to}</div>
            <div className="text-xs text-primary-foreground/75 font-semibold mt-0.5">{bookingData.date || 'Today'} · {bus.dep} · {bus.duration}</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-extrabold text-primary-foreground">{bus.price.toLocaleString()}</div>
            <div className="text-[10px] text-primary-foreground/70 font-semibold">RWF / seat</div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-3.5 px-5 pt-3.5">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-semibold">
            <div className="w-5 h-5 rounded-lg" style={{ backgroundColor: '#DCFCE7', border: '1.5px solid #4ADE80' }} />
            Available
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-semibold">
            <div className="w-5 h-5 rounded-lg" style={{ backgroundColor: '#FEE2E2', border: '1.5px solid #FCA5A5' }} />
            Taken
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-semibold">
            <div className="w-5 h-5 rounded-lg bg-primary" />
            Your pick
          </div>
        </div>

        {/* Bus diagram */}
        <div className="mx-4 mt-3.5 bg-card rounded-3xl border border-border p-[18px]">
          <div className="text-center pb-3.5 border-b-2 border-dashed border-border mb-3.5">
            <div className="text-[26px]">🚌</div>
            <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">Front · Driver</div>
          </div>

          <div className="flex flex-col gap-2">
            {rows.map((row, ri) => (
              <div key={ri} className="grid grid-cols-[1fr_1fr_16px_1fr_1fr] gap-[7px] items-center">
                {row.map((seatIndex, si) => {
                  const isTaken = seatLayout[seatIndex] === 'taken';
                  const isSelected = selectedSeat === seatIndex;
                  return (
                    <React.Fragment key={seatIndex}>
                      {si === 2 && (
                        <div className="flex justify-center">
                          <div className="w-px h-8 bg-border" />
                        </div>
                      )}
                      <motion.button
                        onClick={() => toggleSeat(seatIndex)}
                        disabled={isTaken}
                        whileTap={!isTaken ? { scale: 1.08 } : undefined}
                        animate={isSelected ? { scale: 1.06 } : { scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        className={`h-10 rounded-xl text-[11px] font-extrabold transition-colors duration-150 ${
                          isTaken
                            ? 'cursor-not-allowed'
                            : isSelected
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:brightness-95'
                        }`}
                        style={
                          isTaken
                            ? { backgroundColor: '#FEE2E2', border: '1.5px solid #FCA5A5', color: '#FCA5A5' }
                            : isSelected
                            ? {}
                            : { backgroundColor: '#DCFCE7', border: '1.5px solid #4ADE80', color: '#16A34A' }
                        }
                      >
                        {getSeatLabel(seatIndex)}
                      </motion.button>
                    </React.Fragment>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="sticky bottom-0 left-0 right-0 bg-card border-t border-border z-40">
        <div className="mx-4 my-3 flex items-center gap-3">
          <div className="flex-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Seat</div>
            <div className="text-sm font-extrabold text-foreground mt-0.5">
              {selectedSeat !== null ? `Row ${Math.floor(selectedSeat / 4) + 1} · ${getSeatLabel(selectedSeat)}` : 'None'}
            </div>
          </div>
          <div className="flex-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Total</div>
            <div className="text-sm font-extrabold text-primary mt-0.5">
              {selectedSeat !== null ? formatRWF(bus.price) : '—'}
            </div>
          </div>
          <button
            onClick={handleContinue}
            disabled={selectedSeat === null}
            className="bg-primary text-primary-foreground px-5 py-3 rounded-full text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.97] transition-all"
          >
            Pay →
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatSelectionScreen;
