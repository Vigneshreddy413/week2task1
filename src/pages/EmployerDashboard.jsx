import { AnimatePresence, motion } from 'framer-motion';
import { BarChart3, BriefcaseBusiness, Building2, Edit3, Eye, Plus, Trash2, UsersRound, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import EmptyState from '../components/EmptyState.jsx';
import StatCard from '../components/StatCard.jsx';
import { useApp } from '../context/AppContext.jsx';
import { categories, jobTypes, locations } from '../data/seedData.js';

const blankJob = {
  title: '',
  description: '',
  salary: '',
  salaryValue: '',
  experience: '',
  skills: '',
  location: 'Remote',
  type: 'Full-time',
  company: '',
  category: 'Engineering',
};

export default function EmployerDashboard() {
  const { currentUser, jobs, applications, users, addJob, updateJob, deleteJob, updateProfile } = useApp();
  const [editing, setEditing] = useState(null);
  const [showApplicants, setShowApplicants] = useState(null);
  const [jobForm, setJobForm] = useState({ ...blankJob, company: currentUser.company || '' });
  const [company, setCompany] = useState({ company: currentUser.company || '', location: currentUser.location || '', name: currentUser.name || '' });
  const postedJobs = jobs.filter((job) => job.employerId === currentUser.id);
  const applicantRows = applications.filter((app) => postedJobs.some((job) => job.id === app.jobId));
  const avgApplicants = postedJobs.length ? Math.round(applicantRows.length / postedJobs.length) : 0;

  const applicantDetails = useMemo(() => applicantRows.map((app) => ({
    ...app,
    job: jobs.find((job) => job.id === app.jobId),
    user: users.find((user) => user.id === app.userId),
  })).filter((row) => row.job && row.user), [applicantRows, jobs, users]);

  const submitJob = (event) => {
    event.preventDefault();
    if (editing) {
      updateJob(editing, jobForm);
      setEditing(null);
    } else {
      addJob(jobForm);
    }
    setJobForm({ ...blankJob, company: currentUser.company || jobForm.company });
  };

  const startEdit = (job) => {
    setEditing(job.id);
    setJobForm({ ...job, skills: job.skills.join(', ') });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const saveCompany = (event) => {
    event.preventDefault();
    updateProfile(company);
  };

  return (
    <div className="space-y-6">
      <section className="glass premium-card rounded-3xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase text-teal-600">Employer dashboard</p>
            <h1 className="text-3xl font-black">Manage hiring for <span className="gradient-text">{currentUser.company || 'your company'}</span></h1>
          </div>
          <button className="btn-primary" onClick={() => { setEditing(null); setJobForm({ ...blankJob, company: currentUser.company || '' }); }}><Plus size={18} /> New Job</button>
        </div>
      </section>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={BriefcaseBusiness} value={postedJobs.length} label="Posted jobs" />
        <StatCard icon={UsersRound} value={applicantRows.length} label="Applicants" />
        <StatCard icon={Eye} value={postedJobs.length * 124} label="Estimated views" />
        <StatCard icon={BarChart3} value={avgApplicants} label="Avg applicants/job" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <div className="space-y-6">
          <motion.form initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} onSubmit={submitJob} className="glass rounded-3xl p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-black">{editing ? 'Edit job' : 'Post a job'}</h2>
              {editing && <button type="button" className="btn-soft px-3" onClick={() => { setEditing(null); setJobForm({ ...blankJob, company: currentUser.company || '' }); }}><X size={18} /></button>}
            </div>
            <div className="grid gap-3">
              <Input label="Job title" value={jobForm.title} onChange={(value) => setJobForm({ ...jobForm, title: value })} />
              <Input label="Company name" value={jobForm.company} onChange={(value) => setJobForm({ ...jobForm, company: value })} />
              <div className="grid grid-cols-2 gap-3">
                <Select label="Category" value={jobForm.category} onChange={(value) => setJobForm({ ...jobForm, category: value })} options={categories} />
                <Select label="Job type" value={jobForm.type} onChange={(value) => setJobForm({ ...jobForm, type: value })} options={jobTypes} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input label="Salary" value={jobForm.salary} onChange={(value) => setJobForm({ ...jobForm, salary: value })} />
                <Input label="Salary value" type="number" value={jobForm.salaryValue} onChange={(value) => setJobForm({ ...jobForm, salaryValue: value })} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input label="Experience" value={jobForm.experience} onChange={(value) => setJobForm({ ...jobForm, experience: value })} />
                <Select label="Location" value={jobForm.location} onChange={(value) => setJobForm({ ...jobForm, location: value })} options={locations} />
              </div>
              <Input label="Skills" value={jobForm.skills} onChange={(value) => setJobForm({ ...jobForm, skills: value })} placeholder="React, SQL, CRM" />
              <label className="grid gap-2 text-sm font-bold">Description<textarea required className="field min-h-28" value={jobForm.description} onChange={(event) => setJobForm({ ...jobForm, description: event.target.value })} /></label>
              <button className="btn-primary" type="submit">{editing ? 'Update Job' : 'Publish Job'}</button>
            </div>
          </motion.form>

          <form onSubmit={saveCompany} className="glass rounded-3xl p-6">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-black"><Building2 className="text-teal-600" /> Company profile</h2>
            <div className="grid gap-3">
              <Input label="Contact name" value={company.name} onChange={(value) => setCompany({ ...company, name: value })} />
              <Input label="Company" value={company.company} onChange={(value) => setCompany({ ...company, company: value })} />
              <Input label="Location" value={company.location} onChange={(value) => setCompany({ ...company, location: value })} />
              <button className="btn-soft" type="submit">Save Company</button>
            </div>
          </form>
        </div>

        <div className="space-y-6">
          <section className="glass rounded-3xl p-5">
            <h2 className="mb-4 text-xl font-black">Posted jobs</h2>
            {postedJobs.length ? (
              <div className="grid gap-4">
                {postedJobs.map((job) => {
                  const count = applications.filter((app) => app.jobId === job.id).length;
                  return (
                    <motion.div key={job.id} layout className="rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-900/60">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-black">{job.title}</h3>
                          <p className="text-sm text-slate-500">{job.company} • {job.location} • {job.salary}</p>
                        </div>
                        <div className="flex gap-2">
                          <button className="btn-soft px-3" onClick={() => setShowApplicants(showApplicants === job.id ? null : job.id)}><UsersRound size={17} /> {count}</button>
                          <button className="btn-soft px-3" onClick={() => startEdit(job)}><Edit3 size={17} /></button>
                          <button className="btn-soft px-3 text-rose-600" onClick={() => deleteJob(job.id)}><Trash2 size={17} /></button>
                        </div>
                      </div>
                      <AnimatePresence>
                        {showApplicants === job.id && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <div className="mt-4 grid gap-2">
                              {applicantDetails.filter((row) => row.jobId === job.id).length ? applicantDetails.filter((row) => row.jobId === job.id).map((row) => (
                                <div key={row.id} className="rounded-xl bg-slate-100 p-3 text-sm dark:bg-slate-800">
                                  <strong>{row.user.name}</strong>
                                  <span className="block text-slate-500">{row.user.email} • {row.status}</span>
                                </div>
                              )) : <p className="text-sm text-slate-500">No applicants yet.</p>}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            ) : <EmptyState title="No jobs posted" text="Create your first job listing to start receiving candidates." />}
          </section>

          <section className="glass rounded-3xl p-5">
            <h2 className="mb-4 text-xl font-black">Applicants overview</h2>
            {applicantDetails.length ? (
              <div className="grid gap-3">
                {applicantDetails.map((row) => (
                  <div key={row.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white/70 p-4 dark:bg-slate-900/60">
                    <div>
                      <p className="font-black">{row.user.name}</p>
                      <p className="text-sm text-slate-500">{row.job.title}</p>
                    </div>
                    <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-black text-teal-800 dark:bg-teal-900/40 dark:text-teal-200">{row.status}</span>
                  </div>
                ))}
              </div>
            ) : <EmptyState title="No applicants yet" text="Applicants will appear here once candidates apply to your posted jobs." />}
          </section>
        </div>
      </section>
    </div>
  );
}

function Input({ label, value, onChange, type = 'text', placeholder = '' }) {
  return <label className="grid gap-2 text-sm font-bold">{label}<input required className="field" type={type} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} /></label>;
}

function Select({ label, value, onChange, options }) {
  return (
    <label className="grid gap-2 text-sm font-bold">{label}
      <select className="field" value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((item) => <option key={item} value={item}>{item}</option>)}
      </select>
    </label>
  );
}
