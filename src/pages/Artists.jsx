import { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ArtistTable from '../components/ArtistTable';
import { motion } from 'framer-motion';
import { FiMusic } from 'react-icons/fi';

const Artists = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Animation variants
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="flex justify-start items-start bg-slate-950 w-full min-h-screen"
    >
      <div className="flex-1 p-8">
        <motion.div variants={itemVariants}>
          <Header title="Artistes" onSearch={setSearchQuery} />
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="flex items-center space-x-3 mb-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="bg-purple-500/20 p-2 rounded-full"
          >
            <FiMusic className="text-purple-500 text-xl" />
          </motion.div>
          <h3 className="text-lg font-semibold text-slate-200">Liste des artistes</h3>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <ArtistTable searchQuery={searchQuery} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Artists;