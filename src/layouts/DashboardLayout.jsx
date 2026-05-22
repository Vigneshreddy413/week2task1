import { BarChart3, BriefcaseBusiness, Home, LogOut, Moon, Sun, UserRound } from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Toast from '../components/Toast.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function DashboardLayout() {
  const { currentUser, logout, theme, setTheme } = useApp();
  const navigate = useNavigate();
  const base = currentUser?.role === 'employer' ? '/employer' : '/candidate';

  return (
    <div className="app-bg min-h-screen text-slate-950 dark:text-white">
      <div className="mx-auto grid min-h-screen max-w-7xl gap-4 px-4 py-4 lg:grid-cols-[260px_1fr]">
        <aside className="glass sticky top-4 h-fit rounded-2xl p-4">
          <button className="mb-6 flex items-center gap-2 text-xl font-black" onClick={() => navigate('/')}>
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-teal-500 to-blue-600 text-white"><BriefcaseBusiness size={22} /></span>
            HireHub
          </button>
          <div className="mb-5 rounded-xl bg-slate-100 p-3 dark:bg-slate-900">
            <p className="text-sm font-black">{currentUser?.name}</p>
            <p className="text-xs capitalize text-slate-500">{currentUser?.role} dashboard</p>
          </div>
          <nav className="grid gap-2">
            <NavLink to="/" className="btn-soft justify-start"><Home size={18} /> Home</NavLink>
            <NavLink to="/jobs" className="btn-soft justify-start"><BriefcaseBusiness size={18} /> Jobs</NavLink>
            <NavLink to={base} className="btn-primary justify-start"><BarChart3 size={18} /> Dashboard</NavLink>
            <button className="btn-soft justify-start" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />} Theme</button>
            <button className="btn-soft justify-start" onClick={() => navigate(base)}><UserRound size={18} /> Profile</button>
            <button className="btn-soft justify-start" onClick={logout}><LogOut size={18} /> Logout</button>
          </nav>
        </aside>
        <section className="min-w-0">
          <Outlet />
        </section>
      </div>
      <Toast />
    </div>
  );
}
