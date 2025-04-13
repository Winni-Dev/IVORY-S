import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { FiTrash, FiCalendar, FiUsers } from 'react-icons/fi';
import DeleteConfirmationModalU from '../components/DeleteConfirmationModalU';
import { motion, AnimatePresence } from 'framer-motion';

const Users = () => {
  // Données simulées des utilisateurs
  const [users, setUsers] = useState([
    { id: 1, mail: 'JessiPyton109@gmail.com', lastName: 'Python', signupDate: '2023-09-01', lastLogin: '2025-02-10' , status: 'active' , Ip: '120EZ789K' },
    { id: 2, mail: 'CurieNex10@gmail.com', lastName: 'Curie', signupDate: '2023-08-15', lastLogin: '2025-02-09' , status: 'inactive', Ip: '180EZ789K' },
    { id: 3, mail: 'JessiPyton109@gmail.com', lastName: 'Martin', signupDate: '2023-07-20', lastLogin: '2025-02-01', status: 'inactive', Ip: '150EZ789K' },
    { id: 4, mail: 'JessiPyton109@gmail.com', lastName: 'Bernard', signupDate: '2023-06-10', lastLogin: '2025-01-25', status: 'active', Ip: '100EZ789K' },
    { id: 5, mail: 'JessiPyton109@gmail.com', lastName: 'Dubois', signupDate: '2023-05-05', lastLogin: '2025-01-10', status: 'active', Ip: '320EZ789K' },
    { id: 6, mail: 'Kouadioemmanuel109@gmail.com', lastName: 'Winni', signupDate: '2023-09-01', lastLogin: '2025-03-5' , status: 'active', Ip: '920EZ789K' },
    { id: 7, mail: 'JessiPyton109@gmail.com', lastName: 'NGORAN', signupDate: '2023-09-01', lastLogin: '2025-02-25',status: 'inactive', Ip: '910EZ789w' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [loginFilter, setLoginFilter] = useState('all'); // 'all', 'today', 'week', 'month'

  const [selectedUser, setSelectedUser] = useState(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };
  const handleSave = (updatedUser) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
    setIsEditModalOpen(false);
  };

  const handleConfirmDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
    setIsDeleteModalOpen(false);
  };

  // Fonction pour filtrer les utilisateurs
  const filteredUsers = users.filter((user) => {
    const matchesSearch = `${user.mail} ${user.lastName} ${user.Ip}`.toLowerCase().includes(searchQuery.toLowerCase());
    const lastLoginDate = new Date(user.lastLogin);
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    let matchesLoginFilter = true;
    switch (loginFilter) {
      case 'today':
        matchesLoginFilter = lastLoginDate >= startOfDay;
        break;
      case 'week':
        matchesLoginFilter = lastLoginDate >= startOfWeek;
        break;
      case 'month':
        matchesLoginFilter = lastLoginDate >= startOfMonth;
        break;
      default:
        matchesLoginFilter = true;
    }

    return matchesSearch && matchesLoginFilter;
  });

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

  const tableRowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
    exit: { 
      opacity: 0, 
      x: 20,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="flex w-full bg-slate-950 min-h-screen"
    >
      <div className="flex-1 p-8">
        <motion.div variants={itemVariants}>
          <Header title="Utilisateurs" onSearch={setSearchQuery} />
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="flex justify-between items-center mb-6"
        >
          <div className="flex items-center space-x-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="bg-blue-500/20 p-2 rounded-full"
            >
              <FiUsers className="text-blue-500 text-xl" />
            </motion.div>
            <h3 className="text-lg font-semibold text-slate-200">Liste des utilisateurs</h3>
          </div>
          
          <motion.div 
            variants={itemVariants}
            className="flex items-center space-x-4"
          >
            <div className="relative">
              <FiCalendar className="absolute left-3 top-3 text-slate-400" />
              <select
                value={loginFilter}
                onChange={(e) => setLoginFilter(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-800 text-slate-200 rounded-lg focus:outline-none focus:ring-2 cursor-pointer focus:ring-orange-500 transition-all hover:bg-slate-700"
              >
                <option value="all">Tous</option>
                <option value="today">Connectés aujourd'hui</option>
                <option value="week">Connectés cette semaine</option>
                <option value="month">Connectés ce mois-ci</option>
              </select>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden shadow-lg"
        >
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-slate-300 font-medium">Pseudo</th>
                    <th className="px-6 py-3 text-left text-slate-300 font-medium">Adresse E-mail</th>
                    <th className="px-6 py-3 text-left text-slate-300 font-medium">Date d'inscription</th>
                    <th className="px-6 py-3 text-left text-slate-300 font-medium">Dernière connexion</th>
                    <th className="px-6 py-3 text-left text-slate-300 font-medium">Statut</th>
                    <th className="px-6 py-3 text-left text-slate-300 font-medium">Adress IP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  <AnimatePresence>
                    {filteredUsers.map((user) => (
                      <motion.tr 
                        key={user.id} 
                        variants={tableRowVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        whileHover={{ scale: 1.01, backgroundColor: "rgba(51, 65, 85, 0.5)" }}
                        className="hover:bg-slate-700/50 transition-colors"
                      >
                        <td className="px-6 py-4 text-slate-200">{user.lastName}</td>
                        <td className="px-2 py-4 text-orange-500">{user.mail}</td>
                        <td className="px-3 py-4 text-slate-400">{user.signupDate}</td>
                        <td className="px-3 py-4 text-slate-400">{user.lastLogin}</td>
                        <td className="px-6 py-4 flex justify-center items-center">
                          <span
                            className={`px-2 py-1 rounded-full text-sm ${
                              user.status === 'active'
                                ? 'bg-green-500/20 text-green-500'
                                : 'bg-red-500/20 text-red-500'
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="px-0 text-sm py-4 text-slate-400">
                          {user.Ip}
                          <motion.button
                            whileHover={{ scale: 1.2, color: "#ef4444" }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDelete(user)}
                            className="text-slate-400 ml-3 hover:text-red-500 transition-colors"
                          >
                            <FiTrash />
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
          <AnimatePresence>
            {isDeleteModalOpen && (
              <DeleteConfirmationModalU
                user={selectedUser}
                onConfirm={handleConfirmDelete}
                onClose={() => setIsDeleteModalOpen(false)}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Users;