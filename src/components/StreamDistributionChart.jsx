import React from 'react';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const StreamDistributionChart = () => {
  // Données simulées pour la répartition des streams par genre
  const streamData = [
    { name: 'Drill', value: 400 },
    { name: 'Rap Ivoir', value: 300 },
    { name: 'R&B', value: 200 },
    { name: 'Rap', value: 150 },
    { name: 'Maémouna', value: 100 },
  ];

  // Couleurs pour chaque segment du camembert
  const COLORS = ['#FF6B35', '#00C49A', '#0088FE', '#FFBB28', '#FF8042'];

  return (
    <div className="bg-slate-700/20 p-2 md:w-[100%] rounded-xl border border-slate-700">
      <h3 className="text-sm  font-semibold text-slate-200 mb-4">Répartition des streams par genre</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={streamData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {streamData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: '#1E293B', border: 'none' }}
            itemStyle={{ color: '#F8FAFC' }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StreamDistributionChart;