import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const UserEngagementChart = () => {
  // Données simulées pour l'engagement des utilisateurs
  const engagementData = [
    { day: '01/01', timeSpent: 45, peakUsers: 1200 },
    { day: '02/01', timeSpent: 50, peakUsers: 1500 },
    { day: '03/01', timeSpent: 55, peakUsers: 1800 },
    { day: '04/01', timeSpent: 60, peakUsers: 2000 },
    { day: '05/01', timeSpent: 65, peakUsers: 2200 },
    { day: '06/01', timeSpent: 70, peakUsers: 2500 },
    { day: '07/01', timeSpent: 100, peakUsers: 2500 },
    { day: '08/01', timeSpent: 100, peakUsers: 2500 },
    { day: '09/01', timeSpent: 150, peakUsers: 2500 },
    { day: '10/01', timeSpent: 170, peakUsers: 2500 },
    { day: '11/01', timeSpent: 70, peakUsers: 2500 },
    { day: '12/01', timeSpent: 70, peakUsers: 2500 },
  ];

  return (
    <div className="bg-slate-700/15 p-2 rounded-xl border border-slate-700">
      <h3 className="text-lg font-semibold text-slate-200 mb-4">Engagement des utilisateurs</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={engagementData}>
          <XAxis dataKey="day" stroke="#F8FAFC" />
          <YAxis stroke="#F8FAFC" />
          <Tooltip
            contentStyle={{ backgroundColor: '#1E293B', border: 'none' }}
            itemStyle={{ color: '#F8FAFC' }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="timeSpent"
            stroke="#00C49A"
            name="Temps moyen (min)"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="peakUsers"
            stroke="#FF6B35"
            name="Pics d'audience"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserEngagementChart;