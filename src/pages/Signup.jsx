import { motion } from 'framer-motion';
import { Building2, UserRoundPlus } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

export default function Signup() {
  const { signup } = useApp();
  const navigate = useNavigate();
  const [role, setRole] = useState('candidate');
  const [form, setForm] = useState({ name: '', email: '', password: '', company: '', location: '' });

  const submit = (event) => {
    event.preventDefault();
    const payload = { ...form, role, title: role === 'candidate' ? 'Job seeker' : undefined };
    if (signup(payload)) navigate(role === 'employer' ? '/employer' : '/candidate');
  };

  return (
    <section className="mx-auto grid min-h-[76vh] max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-[.9fr_1.1fr]">
      <div>
        <p className="text-sm font-black uppercase text-teal-600">Join HireHub</p>
        <h1 className="mt-2 text-4xl font-black">Create your workspace for hiring or job search.</h1>
        <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">Candidates get saved jobs and application tracking. Employers get posting tools, applicant views, and analytics.</p>
      </div>
      <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onSubmit={submit} className="glass rounded-3xl p-6 md:p-8">
        <div className="mb-5 grid grid-cols-2 gap-3">
          <button type="button" className={`rounded-xl border p-4 text-left ${role === 'candidate' ? 'border-teal-500 bg-teal-50 text-teal-800 dark:bg-teal-900/30 dark:text-teal-200' : 'border-slate-200 dark:border-slate-800'}`} onClick={() => setRole('candidate')}><UserRoundPlus className="mb-2" /> <strong>Candidate</strong></button>
          <button type="button" className={`rounded-xl border p-4 text-left ${role === 'employer' ? 'border-teal-500 bg-teal-50 text-teal-800 dark:bg-teal-900/30 dark:text-teal-200' : 'border-slate-200 dark:border-slate-800'}`} onClick={() => setRole('employer')}><Building2 className="mb-2" /> <strong>Employer</strong></button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold">Full name<input className="field" required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label>
          <label className="grid gap-2 text-sm font-bold">Email<input className="field" type="email" required value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label>
          <label className="grid gap-2 text-sm font-bold">Password<input className="field" type="password" required minLength={5} value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} /></label>
          <label className="grid gap-2 text-sm font-bold">Location<input className="field" required value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} /></label>
          {role === 'employer' && <label className="grid gap-2 text-sm font-bold sm:col-span-2">Company name<input className="field" required value={form.company} onChange={(event) => setForm({ ...form, company: event.target.value })} /></label>}
        </div>
        <button className="btn-primary mt-5 w-full" type="submit">Create Account</button>
        <p className="mt-5 text-center text-sm text-slate-500">Already joined? <Link className="font-black text-teal-700 dark:text-teal-300" to="/login">Login</Link></p>
      </motion.form>
    </section>
  );
}
