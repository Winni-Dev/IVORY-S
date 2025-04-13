import React from 'react';
import { motion } from 'framer-motion';

const StatsCard = ({ icon, title, value, color }) => {
  // Définir les classes dynamiques en fonction de la couleur
  const textColorClass = `text-${color}-500`;
  const bgColorClass = `bg-${color}-500/20`;

  return (
    <motion.div 
      className="bg-gradient-to-br from-slate-900 to-slate-950 p-4 rounded-xl border border-slate-700 h-40 md:h-52 shadow-lg hover:shadow-xl transition-all duration-300"
      whileHover={{ 
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)"
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 10 
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <motion.p 
            className="text-slate-400 mb-1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {title}
          </motion.p>
          <motion.p 
            className={`text-4xl w-32 h-7 mt-10 font-bold ${textColorClass}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            {value}
          </motion.p>
        </div>
        <motion.div 
          className={`text-3xl -mt-14 ${bgColorClass} p-3 rounded-full`}
          whileHover={{ 
            rotate: 10, 
            scale: 1.1,
            backgroundColor: `rgba(var(--${color}-500-rgb), 0.3)`
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            delay: 0.4,
            type: "spring", 
            stiffness: 200, 
            damping: 15 
          }}
        >
          {icon}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StatsCard;