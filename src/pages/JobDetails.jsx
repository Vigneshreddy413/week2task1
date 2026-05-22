import { motion } from 'framer-motion';
import { ArrowLeft, Bookmark, BriefcaseBusiness, CheckCircle2, IndianRupee, MapPin, UsersRound } from 'lucide-react';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import EmptyState from '../components/EmptyState.jsx';
import JobCard from '../components/JobCard.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { jobs, currentUser, applications, savedJobs, applyToJob, toggleSaveJob, markViewed } = useApp();
  const job = jobs.find((item) => item.id === id);
  const recommended = jobs.filter((item) => item.id !== id && (item.category === job?.category || item.location === job?.location)).slice(0, 3);
  const applied = currentUser && applications.some((item) => item.jobId === id && item.userId === currentUser.id);
  const saved = currentUser && savedJobs.some((item) => item.jobId === id && item.userId === currentUser.id);

  useEffect(() => {
    if (id) markViewed(id);
  }, [id]);

  if (!job) return <section className="mx-auto max-w-4xl px-4 py-12"><EmptyState title="Job not found" text="This role may have been removed by the employer." /></section>;

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <button className="btn-soft mb-5" onClick={() => navigate(-1)}><ArrowLeft size={18} /> Back</button>
      <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
        <motion.article initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-3xl p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex gap-4">
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-teal-500 to-blue-600 text-xl font-black text-white">{job.logo}</div>
              <div>
                <p className="text-sm font-black uppercase text-teal-600">{job.company}</p>
                <h1 className="text-3xl font-black md:text-4xl">{job.title}</h1>
                <p className="mt-2 text-slate-500">{job.posted} • {job.category}</p>
              </div>
            </div>
            {currentUser?.role === 'candidate' && <button className="btn-soft" onClick={() => toggleSaveJob(job.id)}><Bookmark size={18} fill={saved ? 'currentColor' : 'none'} /> {saved ? 'Saved' : 'Save'}</button>}
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Info icon={IndianRupee} label="Salary" value={job.salary} />
            <Info icon={BriefcaseBusiness} label="Experience" value={job.experience} />
            <Info icon={MapPin} label="Location" value={job.location} />
            <Info icon={UsersRound} label="Type" value={job.type} />
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-black">Job description</h2>
            <p className="mt-3 leading-8 text-slate-600 dark:text-slate-300">{job.description}</p>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-black">Skills required</h2>
            <div className="mt-3 flex flex-wrap gap-2">{job.skills.map((skill) => <span key={skill} className="rounded-full bg-teal-100 px-3 py-1 text-sm font-bold text-teal-800 dark:bg-teal-900/40 dark:text-teal-200">{skill}</span>)}</div>
          </div>
          <div className="mt-8 rounded-2xl bg-slate-100 p-5 dark:bg-slate-900">
            <h2 className="font-black">Why this role stands out</h2>
            <div className="mt-3 grid gap-2 text-sm text-slate-600 dark:text-slate-300">
              {['Clear ownership and modern product workflows', 'Responsive employer and transparent application status', 'Strong match for candidates with listed skills'].map((item) => <span className="flex items-center gap-2" key={item}><CheckCircle2 className="text-teal-600" size={18} /> {item}</span>)}
            </div>
          </div>
        </motion.article>
        <aside className="space-y-5">
          <div className="glass rounded-3xl p-6">
            <h2 className="text-xl font-black">Ready to apply?</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">Submit your profile to {job.company}. You can track this application in your candidate dashboard.</p>
            <button className="btn-primary mt-5 w-full" onClick={() => applyToJob(job.id)}>{applied ? 'Application Sent' : 'Apply Now'}</button>
            {!currentUser && <Link className="btn-soft mt-3 w-full" to="/login">Login to continue</Link>}
          </div>
          <div className="glass rounded-3xl p-6">
            <h2 className="text-xl font-black">Company snapshot</h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">{job.company} is hiring for high-impact teams and values candidates who communicate clearly, learn fast, and ship thoughtful work.</p>
          </div>
        </aside>
      </div>
      {recommended.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-5 text-2xl font-black">Recommended jobs</h2>
          <div className="grid gap-5 md:grid-cols-3">{recommended.map((item) => <JobCard key={item.id} job={item} compact />)}</div>
        </div>
      )}
    </section>
  );
}

function Info({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl bg-white/70 p-4 dark:bg-slate-900/70">
      <Icon className="mb-2 text-teal-600" size={20} />
      <p className="text-xs font-bold uppercase text-slate-500">{label}</p>
      <p className="mt-1 font-black">{value}</p>
    </div>
  );
}
