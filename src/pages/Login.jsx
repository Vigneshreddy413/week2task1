import { motion } from 'framer-motion';
import { BriefcaseBusiness, LogIn } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

export default function Login() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: 'candidate@hirehub.com', password: 'demo123' });

  const submit = (event) => {
    event.preventDefault();
    const user = login(form.email, form.password);
    if (user) navigate(user.role === 'employer' ? '/employer' : '/candidate');
  };

  return (
    <section className="mx-auto grid min-h-[76vh] max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-sm font-black uppercase text-teal-600">Welcome back</p>
        <h1 className="mt-2 text-4xl font-black">Login to manage your career or hiring pipeline.</h1>
        <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">Demo accounts are prefilled. Use candidate@hirehub.com or employer@hirehub.com with password demo123.</p>
      </motion.div>
      <motion.form initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} onSubmit={submit} className="glass rounded-3xl p-6 md:p-8">
        <div className="mb-6 flex items-center gap-2 text-2xl font-black"><BriefcaseBusiness className="text-teal-600" /> HireHub</div>
        <div className="grid gap-4">
          <label className="grid gap-2 text-sm font-bold">Email<input className="field" type="email" required value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label>
          <label className="grid gap-2 text-sm font-bold">Password<input className="field" type="password" required value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} /></label>
          <button className="btn-primary w-full" type="submit"><LogIn size={18} /> Login</button>
        </div>
        <p className="mt-5 text-center text-sm text-slate-500">New here? <Link className="font-black text-teal-700 dark:text-teal-300" to="/signup">Create an account</Link></p>
      </motion.form>
    </section>
  );
}
