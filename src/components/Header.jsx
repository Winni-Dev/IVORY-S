import { FiSearch } from 'react-icons/fi';

const Header = ({ title, onSearch }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-bold text-slate-200">{title}</h1>
      <div className="relative">
        <FiSearch className="absolute left-3 top-3 text-slate-400" />
        <input
          type="text"
          placeholder="Rechercher..."
          className="pl-10 pr-4 py-2 bg-slate-800 text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Header;