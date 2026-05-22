import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

export default function Toast() {
  const { toast } = useApp();
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.96 }}
          className={`fixed right-4 top-4 z-50 flex max-w-sm items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-2xl ${toast.type === 'error' ? 'bg-rose-600' : 'bg-slate-950'}`}
        >
          {toast.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
          {toast.message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
