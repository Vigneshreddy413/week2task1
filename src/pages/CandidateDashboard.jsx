import { motion } from 'framer-motion';
import { Bookmark, BriefcaseBusiness, CheckCircle2, Clock3, Settings, UserRound } from 'lucide-react';
import { useMemo, useState } from 'react';
import EmptyState from '../components/EmptyState.jsx';
import JobCard from '../components/JobCard.jsx';
import StatCard from '../components/StatCard.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function CandidateDashboard() {
  const { currentUser, jobs, applications, savedJobs, recentlyViewed, updateProfile } = useApp();
  const [profile, setProfile] = useState({
    name: currentUser.name,
    title: currentUser.title || '',
    location: currentUser.location || '',
    skills: (currentUser.skills || []).join(', '),
  });
  const myApplications = applications.filter((item) => item.userId === currentUser.id);
  const appliedJobs = myApplications.map((item) => ({ ...jobs.find((job) => job.id === item.jobId), application: item })).filter((item) => item.id);
  const saved = savedJobs.filter((item) => item.userId === currentUser.id).map((item) => jobs.find((job) => job.id === item.jobId)).filter(Boolean);
  const viewed = recentlyViewed.map((id) => jobs.find((job) => job.id === id)).filter(Boolean);
  const recommended = useMemo(() => jobs.filter((job) => job.skills.some((skill) => currentUser.skills?.includes(skill)) || job.location === currentUser.location).slice(0, 3), [jobs, currentUser]);

  const saveProfile = (event) => {
    event.preventDefault();
    updateProfile({ ...profile, skills: profile.skills.split(',').map((skill) => skill.trim()).filter(Boolean) });
  };

  return (
    <div className="space-y-6">
      <section className="glass premium-card rounded-3xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase text-teal-600">Candidate dashboard</p>
            <h1 className="text-3xl font-black">Welcome, <span className="gradient-text">{currentUser.name.split(' ')[0]}</span></h1>
          </div>
          <div className="float-slow rounded-2xl bg-slate-950 px-5 py-3 text-white shadow-xl shadow-blue-950/20">
            <p className="text-xs text-slate-300">Profile strength</p>
            <p className="text-xl font-black">86%</p>
          </div>
        </div>
      </section>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={BriefcaseBusiness} value={appliedJobs.length} label="Applied jobs" />
        <StatCard icon={Bookmark} value={saved.length} label="Saved jobs" />
        <StatCard icon={Clock3} value={viewed.length} label="Recently viewed" />
        <StatCard icon={CheckCircle2} value={recommended.length} label="Recommended" />
      </section>
      <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Panel title="Applied jobs">
            {appliedJobs.length ? <div className="grid gap-4 lg:grid-cols-2">{appliedJobs.map((job) => <JobCard key={job.id} job={job} compact />)}</div> : <EmptyState title="No applications yet" text="Apply to jobs and your progress will appear here." />}
          </Panel>
          <Panel title="Saved jobs">
            {saved.length ? <div className="grid gap-4 lg:grid-cols-2">{saved.map((job) => <JobCard key={job.id} job={job} compact />)}</div> : <EmptyState title="No saved jobs" text="Save interesting roles while browsing so you can revisit them later." />}
          </Panel>
          <Panel title="Job recommendations">
            {recommended.length ? <div className="grid gap-4 lg:grid-cols-3">{recommended.map((job) => <JobCard key={job.id} job={job} compact />)}</div> : <EmptyState title="No recommendations yet" text="Add skills and location details to improve matching." />}
          </Panel>
        </div>
        <div className="space-y-6">
          <motion.form initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} onSubmit={saveProfile} className="glass rounded-3xl p-6">
            <div className="mb-4 flex items-center gap-2 text-xl font-black"><Settings className="text-teal-600" /> Account settings</div>
            <div className="grid gap-3">
              <label className="grid gap-2 text-sm font-bold">Name<input className="field" value={profile.name} onChange={(event) => setProfile({ ...profile, name: event.target.value })} /></label>
              <label className="grid gap-2 text-sm font-bold">Title<input className="field" value={profile.title} onChange={(event) => setProfile({ ...profile, title: event.target.value })} /></label>
              <label className="grid gap-2 text-sm font-bold">Location<input className="field" value={profile.location} onChange={(event) => setProfile({ ...profile, location: event.target.value })} /></label>
              <label className="grid gap-2 text-sm font-bold">Skills<textarea className="field min-h-24" value={profile.skills} onChange={(event) => setProfile({ ...profile, skills: event.target.value })} /></label>
              <button className="btn-primary" type="submit">Save Profile</button>
            </div>
          </motion.form>
          <Panel title="Recently viewed">
            {viewed.length ? <div className="grid gap-3">{viewed.map((job) => <JobCard key={job.id} job={job} compact />)}</div> : <div className="text-sm text-slate-500">Open job details to build your viewed list.</div>}
          </Panel>
        </div>
      </section>
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <section className="glass premium-card rounded-3xl p-5">
      <h2 className="mb-4 flex items-center gap-2 text-xl font-black"><UserRound className="text-teal-600" size={20} /> {title}</h2>
      {children}
    </section>
  );
}
