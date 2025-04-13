import "./App.css";
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Dashboard from './pages/Dashboard';
import Artists from './pages/Artists';
import Sidebar from './components/Sidebar';
import Users from './pages/Users';
function App() {
    
  return (
      <div className="flex min-h-screen w-full bg-slate-950 text-slate-200 ">
       <Sidebar/>
       <div className="w-full relative overflow-hidden ">
                   
        <Routes >
        <Route path="/" element={<Dashboard />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/users" element={<Users />} />
        </Routes>
        </div>
      </div>
    
  );
}

export default App;