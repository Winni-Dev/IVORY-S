import React, { useState } from 'react';
import { FiEdit, FiTrash, FiEye } from 'react-icons/fi';
import ViewDetailsModal from './ViewDetailsModal';
import EditArtistModal from './EditArtistModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { motion, AnimatePresence } from 'framer-motion';

const ArtistTable = ({ searchQuery }) => {
  const [artists, setArtists] = useState([
    { id: 1, name: 'Didi B', genre: 'Rap', streams: 1200000,streamsAU: 20000,streamsSE: 200000,streamsMO: 500000, status: 'active', revenue: 3600000, revenueAU:60000 , revenueSE:100000 , revenueMO:20000, likes:1000000 ,likesAU:10000 ,likesSE:70000, likesMO:93000, shares: 11230, sharesAU: 1230 , sharesSE: 7930, sharesMO: 10230,  followers:2000000,  followersAU:10903,  followersSE:50900,  followersMO:109300},
    { id: 2, name: 'Himra', genre: 'Drill', streams: 850000,streamsAU: 30000,streamsSE: 900000,streamsMO: 650000, status: 'active', revenue: 2550000 ,revenueAU:90000, revenueSE:130000, revenueMO:2400000 , likes:5000000 ,likesAU:9000 ,likesSE:200000, likesMO:208000, shares: 19230, sharesAU: 1890 , sharesSE: 8830, sharesMO: 12230,  followers:2010290,  followersAU:10800,  followersSE:70000,  followersMO:130308 },
    { id: 3, name: 'Dopelyme', genre: 'RBNB', streams: 4500000,streamsAU: 40000,streamsSE: 760000,streamsMO: 450000, status: 'inactive', revenue: 130500,revenueAU:6000, revenueSE:100000, revenueMO:20000, likes:110000 ,likesAU:3000 ,likesSE:19000, likesMO:78000 , shares: 9230, sharesAU: 1090 , sharesSE: 7000, sharesMO: 5230,  followers:800000,  followersAU:900,  followersSE:10905,  followersMO:70890 },
    { id: 4, name: 'Espoire 2000', genre: 'Zouglou', streams: 2500000,streamsAU: 45000,streamsSE: 200000,streamsMO: 900000, status: 'inactive', revenue: 110500,revenueAU:9000 , revenueSE:40000 , revenueMO:20000, likes:90000 ,likesAU:32000 ,likesSE:16000, likesMO:99000 , shares: 13230, sharesAU: 830 , sharesSE: 6500, sharesMO: 10002,  followers:760000,  followersAU:8090,  followersSE:7600,  followersMO:80000 },
    { id: 5, name: 'José', genre: 'RBNB', streams: 5500000,streamsAU: 12000,streamsSE: 320000,streamsMO: 600000, status: 'active', revenue: 1250000,revenueAU:80000 , revenueSE:12000 , revenueMO:90000, likes:50000 ,likesAU:16000 ,likesSE:150000, likesMO:39000, shares: 18000, sharesAU: 800 , sharesSE: 2230, sharesMO: 33330 ,  followers:907801,  followersAU:1902,  followersSE:9090,  followersMO:90957 },
    { id: 6, name: 'Milano', genre: 'Maémouna', streams: 9500000,streamsAU: 90000,streamsSE: 130000,streamsMO: 100000, status: 'active', revenue: 2002500,revenueAU:25000 , revenueSE:5000 , revenueMO:120000 , likes:98000 ,likesAU:1000 ,likesSE:15000, likesMO:33000, shares: 56230, sharesAU: 9830 , sharesSE: 9899, sharesMO: 45030,  followers:7780000,  followersAU:10000,  followersSE:76000,  followersMO:10670 },
    { id: 7, name: '3XDave', genre: 'Maémouna', streams: 3500000,streamsAU: 2000,streamsSE: 670000,streamsMO: 230000, status: 'inactive', revenue: 1000500,revenueAU:50000 , revenueSE:4000 , revenueMO:60000, likes:34000 ,likesAU:6000 ,likesSE:19000, likesMO:33000, shares: 11230, sharesAU: 1230 , sharesSE: 7930, sharesMO: 10230 ,  followers:200993,  followersAU:33080,  followersSE:89000,  followersMO:15900 },
  ]);

  const [selectedArtist, setSelectedArtist] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleViewDetails = (artist) => {
    setSelectedArtist(artist);
    setIsViewModalOpen(true);
  };

  const handleEdit = (artist) => {
    setSelectedArtist(artist);
    setIsEditModalOpen(true);
  };

  const handleDelete = (artist) => {
    setSelectedArtist(artist);
    setIsDeleteModalOpen(true);
  };

  const handleSave = (updatedArtist) => {
    setArtists(artists.map((artist) => (artist.id === updatedArtist.id ? updatedArtist : artist)));
    setIsEditModalOpen(false);
  };

  const handleConfirmDelete = (id) => {
    setArtists(artists.filter((artist) => artist.id !== id));
    setIsDeleteModalOpen(false);
  };

  const filteredArtists = artists.filter((artist) =>
    `${artist.name} ${artist.genre}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden"
    >
      <div className="p-6">
        <div className="overflow-x-hidden">
          <table className="w-full">
            <thead className="bg-slate-600/20">
              <tr>
                <th className="px-6 py-3 text-left text-slate-300 font-medium">Nom </th>
                <th className="px-6 py-3 text-left text-slate-300 font-medium">Genre</th>
                <th className="px-6 py-3 text-left text-slate-300 font-medium">Streams</th>
                <th className="px-6 py-3 text-left text-slate-300 font-medium">Statut</th>
                <th className="px-6 py-3 text-left text-slate-300 font-medium">Revenus</th>
                <th className="px-6 py-3 text-left text-slate-300 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              <AnimatePresence>
                {filteredArtists.map((artist) => (
                  <motion.tr
                    key={artist.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ 
                      scale: 1.01,
                      backgroundColor: 'rgba(51, 65, 85, 0.5)',
                      transition: { duration: 0.2 }
                    }}
                    className="hover:bg-slate-700/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-slate-200">{artist.name}</td>
                    <td className="px-6 py-4 text-slate-400">{artist.genre}</td>
                    <td className="px-6 py-4 text-orange-500">{new Intl.NumberFormat().format(artist.streams)}</td>
                    <td className="px-6 py-4">
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className={`px-3 py-1 rounded-full text-sm ${
                          artist.status === 'active'
                            ? 'bg-green-500/20 text-green-500'
                            : 'bg-red-500/20 text-red-500'
                        }`}
                      >
                        {artist.status}
                      </motion.span>
                    </td>
                    <td className="px-6 py-4 text-green-500">XOF {new Intl.NumberFormat().format(artist.revenue)}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleViewDetails(artist)}
                          className="text-slate-400 hover:text-orange-500 transition-colors"
                        >
                          <FiEye />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleEdit(artist)}
                          className="text-slate-400 hover:text-green-500 transition-colors"
                        >
                          <FiEdit />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDelete(artist)}
                          className="text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <FiTrash />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Modales avec animations */}
      <AnimatePresence>
        {isViewModalOpen && (
          <ViewDetailsModal artist={selectedArtist} onClose={() => setIsViewModalOpen(false)} />
        )}
        {isEditModalOpen && (
          <EditArtistModal
            artist={selectedArtist}
            onSave={handleSave}
            onClose={() => setIsEditModalOpen(false)}
          />
        )}
        {isDeleteModalOpen && (
          <DeleteConfirmationModal
            artist={selectedArtist}
            onConfirm={handleConfirmDelete}
            onClose={() => setIsDeleteModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ArtistTable;