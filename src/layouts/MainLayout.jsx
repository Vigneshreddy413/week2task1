import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import Navbar from '../components/Navbar.jsx';
import Toast from '../components/Toast.jsx';

export default function MainLayout() {
  return (
    <div className="app-bg text-slate-950 dark:text-white">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toast />
    </div>
  );
}
