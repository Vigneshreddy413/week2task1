import { motion } from 'framer-motion';
import { Bookmark, BriefcaseBusiness, IndianRupee, MapPin, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

export default function JobCard({ job, compact = false }) {
  const { currentUser, savedJobs, applications, applyToJob, toggleSaveJob } = useApp();
  const navigate = useNavigate();
  const saved = currentUser && savedJobs.some((item) => item.jobId === job.id && item.userId === currentUser.id);
  const applied = currentUser && applications.some((item) => item.jobId === job.id && item.userId === currentUser.id);

  return (
    <motion.article layout initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -7, scale: 1.01 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }} className="glass premium-card group rounded-2xl p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex gap-3">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-teal-500 via-blue-600 to-violet-600 font-black text-white shadow-lg shadow-blue-500/20 transition group-hover:rotate-3 group-hover:scale-105">{job.logo}</div>
          <div>
            <Link to={`/jobs/${job.id}`} className="text-lg font-black hover:text-teal-700 dark:hover:text-teal-300">{job.title}</Link>
            <p className="text-sm text-slate-500 dark:text-slate-400">{job.company}</p>
          </div>
        </div>
        {currentUser?.role === 'candidate' && (
          <button className={`rounded-full p-2 transition hover:scale-110 ${saved ? 'bg-teal-100 text-teal-700 dark:bg-teal-900/40' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'}`} onClick={() => toggleSaveJob(job.id)} aria-label="Save job">
            <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
          </button>
        )}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-600 dark:text-slate-300">
        <span className="flex items-center gap-2 rounded-xl bg-white/54 px-2.5 py-2 dark:bg-slate-900/44"><IndianRupee size={16} className="text-teal-600" /> {job.salary}</span>
        <span className="flex items-center gap-2 rounded-xl bg-white/54 px-2.5 py-2 dark:bg-slate-900/44"><BriefcaseBusiness size={16} className="text-blue-600" /> {job.experience}</span>
        <span className="flex items-center gap-2 rounded-xl bg-white/54 px-2.5 py-2 dark:bg-slate-900/44"><MapPin size={16} className="text-rose-600" /> {job.location}</span>
        <span className="flex items-center gap-2 rounded-xl bg-white/54 px-2.5 py-2 dark:bg-slate-900/44"><Sparkles size={16} className="text-violet-600" /> {job.type}</span>
      </div>
      {!compact && <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{job.description}</p>}
      <div className="mt-4 flex flex-wrap gap-2">
        {job.skills.slice(0, 4).map((skill) => <span key={skill} className="rounded-full border border-slate-200 bg-slate-100/80 px-3 py-1 text-xs font-bold text-slate-600 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300">{skill}</span>)}
      </div>
      <div className="mt-5 flex gap-2">
        <button className="btn-primary flex-1" onClick={() => (currentUser?.role === 'candidate' ? applyToJob(job.id) : navigate(`/jobs/${job.id}`))}>
          {applied ? 'Applied' : 'Apply Now'}
        </button>
        <Link className="btn-soft" to={`/jobs/${job.id}`}>Details</Link>
      </div>
    </motion.article>
  );
}
