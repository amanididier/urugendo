export interface City {
  name: string;
  code: string;
  terminal: string;
  flag: string;
}

export const CITIES: City[] = [
  { name: 'Kigali', code: 'KGL', terminal: 'Nyabugogo Terminal', flag: '🏙️' },
  { name: 'Musanze', code: 'MSZ', terminal: 'Musanze Central Terminal', flag: '🌿' },
  { name: 'Huye', code: 'HYE', terminal: 'Huye Bus Terminal', flag: '🎓' },
  { name: 'Rubavu', code: 'RBV', terminal: 'Rubavu Terminal', flag: '🌊' },
  { name: 'Nyanza', code: 'NYZ', terminal: 'Nyanza Terminal', flag: '🏰' },
  { name: 'Rwamagana', code: 'RWM', terminal: 'Rwamagana Terminal', flag: '🌱' },
  { name: 'Byumba', code: 'BYM', terminal: 'Byumba Terminal', flag: '⛰️' },
  { name: 'Cyangugu', code: 'CYG', terminal: 'Rusizi Terminal', flag: '🌺' },
];

export const CITY_NAMES = CITIES.map(c => c.name);

export const getCityCode = (name: string) => CITIES.find(c => c.name === name)?.code || name.slice(0, 3).toUpperCase();
export const getCityTerminal = (name: string) => CITIES.find(c => c.name === name)?.terminal || '';

export interface Operator {
  id: string;
  name: string;
  logo: string;
  gradient: string;
}

export const OPERATORS: Operator[] = [
  { id: 'volcano', name: 'Volcano Express', logo: '🌋', gradient: 'from-primary to-emerald-700' },
  { id: 'ritco', name: 'RITCO', logo: '🚌', gradient: 'from-emerald-500 to-emerald-700' },
  { id: 'trinity', name: 'Trinity Express', logo: '🚐', gradient: 'from-blue-500 to-blue-700' },
  { id: 'virunga', name: 'Virunga Express', logo: '🏔️', gradient: 'from-purple-500 to-purple-700' },
  { id: 'horizon', name: 'Horizon Express', logo: '🌅', gradient: 'from-amber-500 to-amber-700' },
];

export const POPULAR_ROUTES = [
  { from: 'Kigali', to: 'Musanze', price: 3500, duration: '2h 30m' },
  { from: 'Kigali', to: 'Huye', price: 2500, duration: '2h 15m' },
  { from: 'Kigali', to: 'Rubavu', price: 4000, duration: '3h 00m' },
  { from: 'Kigali', to: 'Nyanza', price: 1800, duration: '1h 45m' },
];

export interface BusResult {
  id: string;
  operator: Operator;
  dep: string;
  arr: string;
  price: number;
  amenities: string[];
  seats: number;
  from: string;
  to: string;
  duration: string;
}

export const LIVE_DEPARTURES: BusResult[] = [
  { id: 'live-1', operator: OPERATORS[0], dep: '06:00', arr: '08:30', price: 3500, amenities: ['wifi', 'ac', 'usb', 'luggage'], seats: 18, from: 'Kigali', to: 'Musanze', duration: '2h 30m' },
  { id: 'live-2', operator: OPERATORS[1], dep: '07:00', arr: '09:15', price: 2500, amenities: ['ac', 'luggage'], seats: 5, from: 'Kigali', to: 'Huye', duration: '2h 15m' },
  { id: 'live-3', operator: OPERATORS[2], dep: '07:30', arr: '10:30', price: 4000, amenities: ['wifi', 'ac', 'usb', 'luggage'], seats: 2, from: 'Kigali', to: 'Rubavu', duration: '3h 00m' },
];

export const generateBusResults = (from: string, to: string): BusResult[] => {
  const bases = [
    { operator: OPERATORS[0], dep: '06:00', arr: '08:30', price: 3500, amenities: ['wifi', 'ac', 'usb', 'luggage'], seats: 18, duration: '2h 30m' },
    { operator: OPERATORS[1], dep: '07:30', arr: '10:00', price: 3200, amenities: ['ac', 'usb'], seats: 5, duration: '2h 30m' },
    { operator: OPERATORS[2], dep: '09:00', arr: '11:30', price: 4000, amenities: ['wifi', 'ac', 'usb', 'luggage'], seats: 2, duration: '2h 30m' },
    { operator: OPERATORS[3], dep: '12:00', arr: '14:30', price: 3800, amenities: ['wifi', 'ac', 'usb', 'luggage'], seats: 24, duration: '2h 30m' },
  ];
  return bases.map((b, i) => ({ ...b, id: `bus-${i}`, from, to }));
};

export const TOTAL_SEATS = 36; // 9 rows × 4 seats

export const generateSeatLayout = (): ('available' | 'taken')[] => {
  return Array.from({ length: TOTAL_SEATS }, () =>
    Math.random() > 0.35 ? 'available' : 'taken'
  );
};

export const getSeatLabel = (index: number): string => {
  const row = Math.floor(index / 4) + 1;
  const cols = ['A', 'B', 'C', 'D'];
  return `${row}${cols[index % 4]}`;
};

export const formatRWF = (amount: number) => `${amount.toLocaleString()} RWF`;

export const generateBookingRef = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return 'URG-2026-' + Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

export const AMENITY_MAP: Record<string, { emoji: string; label: string }> = {
  wifi: { emoji: '📶', label: 'WiFi' },
  ac: { emoji: '❄️', label: 'AC' },
  usb: { emoji: '🔌', label: 'USB' },
  luggage: { emoji: '🧳', label: 'Luggage' },
};
