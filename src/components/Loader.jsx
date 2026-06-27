import { motion } from 'framer-motion';

export default function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-ink flex items-center justify-center"
      exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
    >
      <div className="flex flex-col items-center gap-4">
        <motion.div
          className="font-mono text-2xl text-white tracking-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <span className="text-brand">{'<'}</span>
          Rohith Malar.dev
          <span className="text-brand">{' />'}</span>
        </motion.div>
        <div className="w-40 h-[3px] bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-brand"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.1, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </motion.div>
  );
}
