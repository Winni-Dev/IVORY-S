/** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'orange-500': '#FF6B35', // Définir la couleur orange
        'green-500': '#00C49A',  // Définir la couleur verte
        'slate-800': '#1E293B',  // Définir la couleur bleu nuit
        'slate-900': '#0F172A',  // Définir une nuance plus sombre de bleu nuit
      },
    },
  },
  plugins: [],
};



