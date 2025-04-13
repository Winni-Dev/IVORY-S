import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiMusic, FiUsers, FiSettings, FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import logo from '../assets/icons/logo.png';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: FiHome, label: 'Tableau de bord' },
    { path: '/artists', icon: FiMusic, label: 'Artistes' },
    { path: '/users', icon: FiUsers, label: 'Utilisateurs' },
    // { path: '/settings', icon: FiSettings, label: 'Paramètres' },
  ];

  const menuVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-slate-900/80 backdrop-blur-sm p-2 rounded-lg border border-slate-800 shadow-lg"
      >
        {isOpen ? <FiX className="text-slate-200 text-xl" /> : <FiMenu className="text-slate-200 text-xl" />}
      </motion.button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="lg:hidden fixed top-0 left-0 h-full w-64 bg-slate-900/95 backdrop-blur-md border-r border-slate-800 z-50 p-4"
            >
              <motion.div
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col h-full"
              >
                <div className="mb-8 flex items-center gap-3">
                  <img
                    src={logo}
                    alt="Music App"
                    className="w-10 h-10 rounded-xl object-cover shadow-lg"
                    draggable="false"
                  />
                  <div>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-orange-500 via-white to-green-500 text-transparent bg-clip-text">IVORY'S</h2>
                    <p className="text-slate-400 text-sm">Administration</p>
                  </div>
                </div>

                <nav className="flex-1">
                  {menuItems.map((item) => (
                    <motion.div
                      key={item.path}
                      variants={itemVariants}
                      whileHover="hover"
                    >
                      <Link
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                          location.pathname === item.path
                            ? 'bg-orange-500/20 text-orange-500'
                            : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                        }`}
                      >
                        <item.icon className="text-xl" />
                        <span>{item.label}</span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <motion.button
                  variants={itemVariants}
                  whileHover="hover"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
                >
                  <FiLogOut className="text-xl" />
                  <span>Déconnexion</span>
                </motion.button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="hidden lg:block fixed top-0 left-0 w-64 bg-slate-900/95 backdrop-blur-md border-r border-slate-800 h-screen p-4 z-30"
      >
        <motion.div
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col h-full"
        >
          <div className="mb-8 flex items-center gap-3">
            <img
              src={logo}
              alt="Music App"
              className="w-10 h-10 rounded-xl object-cover shadow-lg"
              draggable="false"
            />
            <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-orange-500 via-white to-green-500 text-transparent bg-clip-text">IVORY'S</h2>
              <p className="text-slate-400 text-sm">Administration</p>
            </div>
          </div>

          <nav className="flex-1">
            {menuItems.map((item) => (
              <motion.div
                key={item.path}
                variants={itemVariants}
                whileHover="hover"
              >
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                    location.pathname === item.path
                      ? 'bg-orange-500/20 text-orange-500'
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                  }`}
                >
                  <item.icon className="text-xl" />
                  <span>{item.label}</span>
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.button
            variants={itemVariants}
            whileHover="hover"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
          >
            <FiLogOut className="text-xl" />
            <span>Déconnexion</span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Espace pour le contenu principal */}
      <div className="hidden lg:block w-72" />
    </>
  );
};

export default Sidebar;

  