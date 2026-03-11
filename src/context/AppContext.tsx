import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'rw';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  userName: string;
  setUserName: (name: string) => void;
  currentScreen: string;
  setCurrentScreen: (screen: string) => void;
  bookingData: BookingData;
  setBookingData: React.Dispatch<React.SetStateAction<BookingData>>;
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
  from: '',
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
  const [userName, setUserName] = useState('Traveler');
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [bookingData, setBookingData] = useState<BookingData>(defaultBooking);

  return (
    <AppContext.Provider value={{
      language, setLanguage, userName, setUserName,
      currentScreen, setCurrentScreen,
      bookingData, setBookingData,
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
