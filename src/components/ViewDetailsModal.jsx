// import React from 'react';

// const ViewDetailsModal = ({ artist, onClose }) => {
//   if (!artist) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-slate-800 rounded-lg p-6 w-11/12 max-w-md">
//         <h2 className="text-xl font-bold text-slate-200 mb-4">Détails de l'artiste</h2>
//         <div className="space-y-4">
//           <div>
//             <p className="text-slate-400">Nom</p>
//             <p className="text-slate-200">{artist.name}</p>
//           </div>
//           <div>
//             <p className="text-slate-400">Genre</p>
//             <p className="text-slate-200">{artist.genre}</p>
//           </div>
//           <div>
//             <p className="text-slate-400">Streams</p>
//             <p className="text-slate-200">{new Intl.NumberFormat().format(artist.streams)}</p>
//           </div>
//           <div>
//             <p className="text-slate-400">Statut</p>
//             <p
//               className={`px-3 py-1 rounded-full text-sm ${
//                 artist.status === 'active'
//                   ? 'bg-green-500/20 text-green-500'
//                   : 'bg-red-500/20 text-red-500'
//               }`}
//             >
//               {artist.status}
//             </p>
//           </div>
//           <div>
//             <p className="text-slate-400">Revenus</p>
//             <p className="text-slate-200">${new Intl.NumberFormat().format(artist.revenue)}</p>
//           </div>
//         </div>
//         <div className="mt-6 flex justify-end">
//           <button
//             onClick={onClose}
//             className="bg-slate-700 text-slate-200 px-4 py-2 rounded-lg hover:bg-slate-600 transition-colors"
//           >
//             Fermer
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewDetailsModal;

import React, { useState, useEffect } from 'react';
import { FiThumbsUp, FiShare2, FiUsers } from 'react-icons/fi'; // Icônes pour likes, partages et followers
import { motion, AnimatePresence } from 'framer-motion';

const ViewDetailsModal = ({ artist, onClose }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('all'); // 'all', 'today', 'week', 'month'
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Attendre la fin de l'animation
  };

  // Données simulées pour les streams, revenus, likes, partages et abonnés
  const streamingData = {
    all: { streams: artist.streams, revenue: artist.revenue, likes: artist.likes, shares: artist.shares, followersGained: artist.followers },
    today: { streams: artist.streamsAU, revenue: artist.revenueAU, likes: artist.likesAU, shares: artist.sharesAU, followersGained: artist.followersAU },
    week: { streams: artist.streamsSE, revenue: artist.revenueSE, likes: artist.likesSE, shares: artist.sharesSE, followersGained: artist.followersSE },
    month: { streams: artist.streamsMO, revenue: artist.revenueMO, likes: artist.likesMO, shares: artist.sharesMO, followersGained: artist.followersMO },
  };

  // Fonction pour obtenir les données en fonction de la période sélectionnée
  const getFilteredData = (period) => {
    return streamingData[period] || { streams: 0, revenue: 0, likes: 0, shares: 0, followersGained: 0 };
  };

  const filteredData = getFilteredData(selectedPeriod);

  if (!artist) return null;

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-slate-900/95 backdrop-blur-md border border-slate-600 rounded-lg p-6 w-11/12 max-w-2xl shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-slate-200 mb-4">Détails de l'artiste</h2>
            <div className="space-y-4">
              {/* Informations de base */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-400">Nom</p>
                  <p className="text-slate-200">{artist.name}</p>
                </div>
                <div>
                  <p className="text-slate-400">Genre</p>
                  <p className="text-slate-200">{artist.genre}</p>
                </div>
                <div>
                  <p className="text-slate-400">Statut</p>
                  <p
                    className={`px-3 py-1 rounded-full text-sm ${
                      artist.status === 'active'
                        ? 'bg-green-500/20 text-green-500'
                        : 'bg-red-500/20 text-red-500'
                    }`}
                  >
                    {artist.status === 'active' ? 'Actif' : 'Inactif'}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400">Période</p>
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="w-full bg-slate-800 text-slate-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="all">Tout</option>
                    <option value="today">Aujourd'hui</option>
                    <option value="week">Cette semaine</option>
                    <option value="month">Ce mois-ci</option>
                  </select>
                </div>
              </div>

              {/* Métriques en ligne avec icônes */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <FiThumbsUp className="text-orange-500 text-xl" />
                  <div>
                    <p className="text-slate-400">Likes</p>
                    <p className="text-slate-200">{new Intl.NumberFormat().format(filteredData.likes)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <FiShare2 className="text-green-500 text-xl" />
                  <div>
                    <p className="text-slate-400">Partages</p>
                    <p className="text-slate-200">{new Intl.NumberFormat().format(filteredData.shares)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <FiUsers className="text-blue-500 text-xl" />
                  <div>
                    <p className="text-slate-400">Abonnés</p>
                    <p className="text-slate-200">{new Intl.NumberFormat().format(filteredData.followersGained)}</p>
                  </div>
                </div>
                <div>
                  <p className="text-slate-400">Streams</p>
                  <p className="text-slate-200">{new Intl.NumberFormat().format(filteredData.streams)}</p>
                </div>
                <div>
                  <p className="text-slate-400">Revenus</p>
                  <p className="text-slate-200">XOF {new Intl.NumberFormat().format(filteredData.revenue)}</p>
                </div>
                <div>
                  <p className="text-slate-400">Transactions</p>
                  <a href="" className="text-red-600 underline font-light hover:text-red-700">Voir tout</a>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClose}
                className="bg-slate-800 text-slate-200 px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors"
              >
                Fermer
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ViewDetailsModal;