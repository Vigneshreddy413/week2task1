import { AnimatePresence, motion } from 'framer-motion';
import { BriefcaseBusiness, LayoutDashboard, LogOut, Menu, Moon, Search, Sun, UserRound, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

const navClass = ({ isActive }) => `rounded-lg px-3 py-2 text-sm font-bold transition ${isActive ? 'bg-teal-500/12 text-teal-700 dark:text-teal-300' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'}`;

export default function Navbar() {
  const { currentUser, logout, theme, setTheme } = useApp();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dashboard = currentUser?.role === 'employer' ? '/employer' : '/candidate';

  const links = (
    <>
      <NavLink className={navClass} to="/">Home</NavLink>
      <NavLink className={navClass} to="/jobs">Jobs</NavLink>
      {currentUser && <NavLink className={navClass} to={dashboard}>Dashboard</NavLink>}
    </>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-white/82 shadow-sm shadow-slate-900/5 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/78">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-xl font-black tracking-tight">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-teal-500 via-blue-600 to-violet-600 text-white shadow-lg shadow-blue-500/20"><BriefcaseBusiness size={22} /></span>
          HireHub
        </Link>
        <div className="hidden items-center gap-1 md:flex">{links}</div>
        <div className="hidden items-center gap-2 md:flex">
          <button aria-label="Toggle theme" className="btn-soft px-3" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          {currentUser ? (
            <>
              <button className="btn-soft" onClick={() => navigate(dashboard)}><LayoutDashboard size={18} /> {currentUser.name.split(' ')[0]}</button>
              <button className="btn-soft px-3" onClick={logout} aria-label="Logout"><LogOut size={18} /></button>
            </>
          ) : (
            <>
              <Link className="btn-soft" to="/login"><UserRound size={18} /> Login</Link>
              <Link className="btn-primary" to="/signup">Join Free</Link>
            </>
          )}
        </div>
        <button aria-label="Open menu" className="btn-soft px-3 md:hidden" onClick={() => setOpen(true)}><Menu size={20} /></button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-slate-950/40 md:hidden" onClick={() => setOpen(false)}>
            <motion.aside initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="ml-auto flex h-full w-80 max-w-[86vw] flex-col gap-3 bg-white p-5 shadow-2xl dark:bg-slate-950" onClick={(event) => event.stopPropagation()}>
              <div className="flex items-center justify-between">
                <strong className="text-lg">HireHub</strong>
                <button className="btn-soft px-3" onClick={() => setOpen(false)} aria-label="Close menu"><X size={18} /></button>
              </div>
              <div className="grid gap-2" onClick={() => setOpen(false)}>{links}</div>
              <Link className="btn-primary mt-2" to="/jobs" onClick={() => setOpen(false)}><Search size={18} /> Find Jobs</Link>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
