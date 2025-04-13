import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RetentionRateChart = () => {
  // Données simulées pour le taux de rétention
  const retentionData = [
    { month: 'Jan', retentionRate: 75 },
    { month: 'Fév', retentionRate: 70 },
    { month: 'Mar', retentionRate: 65 },
    { month: 'Avr', retentionRate: 80 },
    { month: 'Mai', retentionRate: 85 },
    { month: 'Juin', retentionRate: 90 },
  ];

  return (
    <div className="bg-slate-800/20 p-6 rounded-xl border border-slate-700">
      <h3 className="text-lg font-semibold text-slate-200 mb-4">Taux de rétention des utilisateurs</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={retentionData}>
          <XAxis dataKey="month" stroke="#F8FAFC" />
          <YAxis stroke="#F8FAFC" />
          <Tooltip
            contentStyle={{ backgroundColor: '#1E293B', border: 'none' }}
            itemStyle={{ color: '#F8FAFC' }}
          />
          <Legend />
          <Bar dataKey="retentionRate" fill="#FF6B35" name="Taux de rétention (%)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RetentionRateChart;