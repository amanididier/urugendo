import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
}

const QUICK_CHIPS = [
  'Kigali to Musanze 🌿',
  'Cheapest bus today?',
  'Next departure?',
  'Help me book 🎫',
];

const getReply = (text: string): string => {
  const lower = text.toLowerCase();
  if (lower.includes('kigali') || lower.includes('musanze'))
    return 'Found 4 buses today! Earliest Volcano Express 06:00 at 3,500 RWF. Shall I open search?';
  if (lower.includes('cheapest') || lower.includes('cheap'))
    return 'Cheapest today: RITCO at 3,200 RWF, Kigali→Musanze, 07:30. Want me to select it?';
  if (lower.includes('next') || lower.includes('departure'))
    return 'Next bus in ~12 min: Volcano Express 06:00 → Musanze. Only 18 seats left! 🚨';
  if (lower.includes('muraho') || lower.includes('hello') || lower.includes('hi'))
    return 'Muraho! Nitwa Rugendo 🚌 I\'m here to help you travel Rwanda easily!';
  return 'Checking that... 🔍 Try searching from home. I can help with routes, prices and booking tips!';
};

interface Props {
  open: boolean;
  onClose: () => void;
}

const RugendoChat = ({ open, onClose }: Props) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Muraho! Nitwa Rugendo 🚌', sender: 'bot' },
    { id: 2, text: 'I can help you find buses, compare prices, and book your trip in Rwanda! Where are you headed today? 😊', sender: 'bot' },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), text, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const reply: Message = { id: Date.now() + 1, text: getReply(text), sender: 'bot' };
      setMessages(prev => [...prev, reply]);
      setTyping(false);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 z-[60]"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={e => e.stopPropagation()}
            className="absolute bottom-0 left-0 right-0 bg-card rounded-t-[28px] flex flex-col"
            style={{ maxHeight: '76%', boxShadow: '0 -8px 40px -4px rgba(0,0,0,0.12)' }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl flex-shrink-0">
                🚌
              </div>
              <div className="flex-1">
                <div className="text-base font-bold text-foreground">Rugendo</div>
                <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: '#22C55E' }}>
                  <motion.span
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: '#22C55E' }}
                  />
                  Online · Ready to help
                </div>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map(msg => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2.5 text-sm font-medium rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-primary text-white rounded-br-md'
                        : 'bg-muted text-foreground rounded-bl-md'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3 flex gap-1.5">
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                        className="w-2 h-2 rounded-full bg-muted-foreground"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick chips */}
            <div className="flex gap-2 px-4 pb-2 overflow-x-auto hide-scrollbar">
              {QUICK_CHIPS.map(chip => (
                <button
                  key={chip}
                  onClick={() => sendMessage(chip)}
                  className="flex-shrink-0 px-3 py-1.5 rounded-full border border-border text-xs font-medium text-secondary-foreground hover:bg-muted/50 transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 px-4 py-3 border-t border-border">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                placeholder="Ask Rugendo anything..."
                className="flex-1 bg-muted/50 rounded-full px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                onClick={() => sendMessage(input)}
                className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white active:scale-95 transition-transform"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RugendoChat;
