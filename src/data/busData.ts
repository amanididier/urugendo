export const CITIES = [
  'Kigali', 'Huye', 'Musanze', 'Rubavu', 'Nyanza',
  'Rwamagana', 'Byumba', 'Cyangugu', 'Gisenyi'
];

export const OPERATORS = [
  { id: 'ritco', name: 'RITCO', logo: '🚌' },
  { id: 'volcano', name: 'Volcano Express', logo: '🌋' },
  { id: 'trinity', name: 'Trinity Express', logo: '🚍' },
  { id: 'virunga', name: 'Virunga Express', logo: '🏔️' },
  { id: 'horizon', name: 'Horizon Express', logo: '🌅' },
];

export const POPULAR_ROUTES = [
  { from: 'Kigali', to: 'Huye', price: 3500, duration: '2h 30m' },
  { from: 'Kigali', to: 'Musanze', price: 3000, duration: '2h' },
  { from: 'Kigali', to: 'Rubavu', price: 5000, duration: '3h 30m' },
  { from: 'Kigali', to: 'Nyanza', price: 2000, duration: '1h 30m' },
  { from: 'Kigali', to: 'Rwamagana', price: 1500, duration: '1h' },
];

export const generateBusResults = (from: string, to: string) => {
  const bases = [
    { operator: OPERATORS[0], dep: '06:00', arr: '08:30', price: 3500, amenities: ['wifi', 'ac', 'usb'], seats: 12 },
    { operator: OPERATORS[1], dep: '07:30', arr: '10:00', price: 4000, amenities: ['wifi', 'ac', 'usb', 'luggage'], seats: 3 },
    { operator: OPERATORS[2], dep: '09:00', arr: '11:30', price: 3200, amenities: ['ac', 'luggage'], seats: 8 },
    { operator: OPERATORS[3], dep: '11:00', arr: '13:30', price: 3800, amenities: ['wifi', 'ac'], seats: 15 },
    { operator: OPERATORS[4], dep: '14:00', arr: '16:30', price: 3000, amenities: ['luggage'], seats: 2 },
  ];
  return bases.map((b, i) => ({ ...b, id: `bus-${i}`, from, to }));
};

export const TOTAL_SEATS = 44;

export const generateSeatLayout = (): ('available' | 'taken')[] => {
  return Array.from({ length: TOTAL_SEATS }, () =>
    Math.random() > 0.35 ? 'available' : 'taken'
  );
};

export const formatRWF = (amount: number) => `${amount.toLocaleString()} RWF`;

export const generateBookingRef = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return 'BE-' + Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};
