import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function StatCard({ icon: Icon, label, value, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1200 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, motionValue, value]);

  useEffect(() => spring.on('change', (latest) => setDisplay(Math.round(latest))), [spring]);

  return (
    <motion.div ref={ref} whileHover={{ y: -4 }} className="glass rounded-2xl p-5">
      <Icon className="mb-4 text-teal-600" size={26} />
      <div className="text-3xl font-black">{display}{suffix}</div>
      <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{label}</div>
    </motion.div>
  );
}
