import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'rw';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  userName: string;
  setUserName: (name: string) => void;
  currentScreen: string;
  setCurrentScreen: (screen: string) => void;
  previousScreen: string;
  bookingData: BookingData;
  setBookingData: React.Dispatch<React.SetStateAction<BookingData>>;
  goBack: () => void;
}

export interface BookingData {
  from: string;
  to: string;
  date: string;
  passengers: number;
  selectedBus: any | null;
  selectedSeats: number[];
  passengerName: string;
  phone: string;
  nationalId: string;
  email: string;
  paymentMethod: string;
  bookingRef: string;
}

const defaultBooking: BookingData = {
  from: 'Kigali',
  to: '',
  date: '',
  passengers: 1,
  selectedBus: null,
  selectedSeats: [],
  passengerName: '',
  phone: '',
  nationalId: '',
  email: '',
  paymentMethod: '',
  bookingRef: '',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [userName, setUserName] = useState('Jean-Paul K.');
  const [currentScreen, setCurrentScreenState] = useState('splash');
  const [previousScreen, setPreviousScreen] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [bookingData, setBookingData] = useState<BookingData>(defaultBooking);

  const setCurrentScreen = (screen: string) => {
    setHistory(prev => [...prev, currentScreen]);
    setPreviousScreen(currentScreen);
    setCurrentScreenState(screen);
  };

  const goBack = () => {
    setHistory(prev => {
      const newHist = [...prev];
      const last = newHist.pop();
      if (last) {
        setPreviousScreen(newHist[newHist.length - 1] || '');
        setCurrentScreenState(last);
      }
      return newHist;
    });
  };

  return (
    <AppContext.Provider value={{
      language, setLanguage, userName, setUserName,
      currentScreen, setCurrentScreen, previousScreen,
      bookingData, setBookingData, goBack,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};

export const t = (en: string, rw: string, lang: Language) => lang === 'rw' ? rw : en;
