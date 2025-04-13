// import { FiUsers, FiDollarSign, FiHeadphones } from 'react-icons/fi';
// import StatsCard from '../components/StatsCard';

// const Dashboard = () => {
//   return (
//     <div className=' min-h-screen w-full bg-slate-950 '>
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full p-6">
//       <StatsCard icon={<FiUsers />} title="Utilisateurs" value="12,456" color="orange" />
//       <StatsCard icon={<FiDollarSign />} title="Revenus" value="$452,300" color="green" />
//       <StatsCard icon={<FiHeadphones />} title="Streams" value="200,345,000" color="orange" />
//     </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUsers, FiDollarSign, FiHeadphones, FiActivity, FiTrendingUp, FiTrendingDown, FiCalendar, FiBarChart2, FiPieChart } from 'react-icons/fi';
import RevenueChart from '../components/RevenueChart';
import StreamDistributionChart from '../components/StreamDistributionChart';
import RetentionRateChart from '../components/RetentionRateChart';
import UserEngagementChart from '../components/UserEngagementChart';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 760,
    totalUsersActive: 500,
    totalRevenue: 452300,
    totalStreams: 235000,
    growthRate: 12.5,
    userGrowth: 8.3,
    streamGrowth: 15.2,
    engagementRate: 65.8
  });

  const [timeRange, setTimeRange] = useState('month');

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

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
    hover: {
      scale: 1.03,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, trend, trendValue }) => (
    <motion.div 
      variants={cardVariants}
      whileHover="hover"
      className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-800 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm">{title}</p>
          <h3 className="text-2xl font-bold text-slate-200">{value}</h3>
          <div className="flex items-center mt-1 text-xs">
            {trend === 'up' ? (
              <span className="text-green-500 flex items-center">
                <FiTrendingUp className="mr-1" />
                <span>{trendValue}</span>
              </span>
            ) : (
              <span className="text-red-500 flex items-center">
                <FiTrendingDown className="mr-1" />
                <span>{trendValue}</span>
              </span>
            )}
          </div>
        </div>
        <div className={`bg-${color}-500/20 p-3 rounded-full`}>
          <Icon className={`text-${color}-500 text-xl`} />
        </div>
      </div>
    </motion.div>
  );

  const ChartCard = ({ title, children, options, icon: Icon, className = "" }) => (
    <motion.div 
      variants={cardVariants}
      whileHover="hover"
      className={`bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-800 shadow-lg ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="text-slate-400 text-xl" />}
          <h3 className="text-lg font-semibold text-slate-200">{title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Période:</span>
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="text-xs bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-200"
          >
            {options.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>
      {children}
    </motion.div>
  );
  
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="flex w-full min-h-screen bg-slate-950"
    >
      <div className="flex-1 p-6 md:p-8">
        <motion.div variants={itemVariants} className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500/20 p-2 rounded-full">
              <FiTrendingUp className="text-orange-500 text-xl" />
            </div>
            <h1 className="text-2xl font-bold text-slate-200">Tableau de bord</h1>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <FiCalendar className="text-slate-500" />
            <span className="text-sm">Dernière mise à jour: {new Date().toLocaleDateString()}</span>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard 
            title="Utilisateurs" 
            value={`${stats.totalUsers}K`} 
            icon={FiUsers} 
            color="orange"
            trend="up"
            trendValue={`${stats.userGrowth}% ce mois`}
          />
          <StatCard 
            title="Utilisateurs actifs" 
            value={`${stats.totalUsersActive}K`} 
            icon={FiActivity} 
            color="red"
            trend="up"
            trendValue={`${stats.engagementRate}% taux d'engagement`}
          />
          <StatCard 
            title="Revenus" 
            value={`XOF ${stats.totalRevenue.toLocaleString()}`} 
            icon={FiDollarSign} 
            color="green"
            trend="up"
            trendValue={`${stats.growthRate}% ce mois`}
          />
          <StatCard 
            title="Streams" 
            value={stats.totalStreams.toLocaleString()} 
            icon={FiHeadphones} 
            color="orange"
            trend="up"
            trendValue={`${stats.streamGrowth}% ce mois`}
          />
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="md:w-2/3">
            <ChartCard 
              title="Revenus" 
              icon={FiBarChart2}
              options={[
                { value: 'week', label: '7 derniers jours' },
                { value: 'month', label: '30 derniers jours' },
                { value: 'year', label: '12 derniers mois' }
              ]}
            >
              <RevenueChart />
            </ChartCard>
          </div>
          <div className="md:w-1/3">
            <ChartCard 
              title=" streams" 
              icon={FiPieChart}
              options={[
                { value: 'genre', label: 'Par genre' },
                { value: 'artist', label: 'Par artiste' },
                { value: 'region', label: 'Par région' }
              ]}
            >
              <StreamDistributionChart />
            </ChartCard>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartCard 
            title="Taux de rétention" 
            options={[
              { value: '30', label: '30 jours' },
              { value: '90', label: '90 jours' },
              { value: '180', label: '180 jours' }
            ]}
          >
            <RetentionRateChart />
          </ChartCard>
          <ChartCard 
            title="Engagement des utilisateurs" 
            options={[
              { value: 'week', label: '7 derniers jours' },
              { value: 'month', label: '30 derniers jours' },
              { value: 'year', label: '12 derniers mois' }
            ]}
          >
            <UserEngagementChart />
          </ChartCard>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;



