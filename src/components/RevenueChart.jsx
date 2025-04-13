import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RevenueChart = () => {
  // Données simulées pour l'évolution des revenus mensuels
  const revenueData = [
    { month: 'Jan', revenue: 65000 },
    { month: 'Fév', revenue: 80000 },
    { month: 'Mar', revenue: 120000 },
    { month: 'Avr', revenue: 90000 },
    { month: 'Mai', revenue: 150000 },
    { month: 'Juin', revenue: 180000 },
  ];

  return (
    <div className="bg-slate-800/20 p-2 md:w-[80%] rounded-xl border border-slate-700">
      <h3 className="text-lg font-semibold text-slate-200 mb-4">Évolution des revenus mensuels</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={revenueData}>
          <XAxis dataKey="month" stroke="#F8FAFC" />
          <YAxis stroke="#F8FAFC" />
          <Tooltip
            contentStyle={{ backgroundColor: '#1E293B', border: 'none' }}
            itemStyle={{ color: '#F8FAFC' }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#00C49A"
            name="Revenus ($)"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;