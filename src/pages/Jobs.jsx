import { AnimatePresence } from 'framer-motion';
import { Filter, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import EmptyState from '../components/EmptyState.jsx';
import JobCard from '../components/JobCard.jsx';
import SkeletonCard from '../components/SkeletonCard.jsx';
import { useApp } from '../context/AppContext.jsx';
import { categories, jobTypes, locations } from '../data/seedData.js';
import { useFilteredJobs } from '../hooks/useFilteredJobs.js';

const initialFilters = { search: '', location: '', category: '', type: '', salary: '' };

export default function Jobs() {
  const { jobs } = useApp();
  const [filters, setFilters] = useState(initialFilters);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const filtered = useFilteredJobs(jobs, filters);
  const pageSize = 6;
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const shown = filtered.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(timer);
  }, [filters, page]);

  const update = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="section-shell premium-card mb-8 p-6">
        <p className="text-sm font-black uppercase text-teal-600">Job listings</p>
        <h1 className="text-4xl font-black">Browse <span className="gradient-text">opportunities</span></h1>
        <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-300">Search, filter, save, and apply through a fast marketplace-style experience.</p>
      </div>
      <div className="grid gap-5 lg:grid-cols-[300px_1fr]">
        <aside className="glass h-fit rounded-2xl p-5">
          <div className="mb-4 flex items-center gap-2 text-lg font-black"><Filter size={20} /> Filters</div>
          <div className="grid gap-4">
            <label className="grid gap-2 text-sm font-bold">Search
              <div className="relative"><Search className="absolute left-3 top-3 text-slate-400" size={18} /><input className="field pl-10" value={filters.search} onChange={(event) => update('search', event.target.value)} placeholder="Title, skill, company" /></div>
            </label>
            <Select label="Location" value={filters.location} onChange={(value) => update('location', value)} options={locations} />
            <Select label="Category" value={filters.category} onChange={(value) => update('category', value)} options={categories} />
            <Select label="Job type" value={filters.type} onChange={(value) => update('type', value)} options={jobTypes} />
            <Select label="Minimum salary" value={filters.salary} onChange={(value) => update('salary', value)} options={['5', '10', '15', '20', '25']} suffix=" LPA+" />
            <button className="btn-soft" onClick={() => setFilters(initialFilters)}>Reset filters</button>
          </div>
        </aside>
        <div>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="font-bold text-slate-600 dark:text-slate-300">{filtered.length} matching jobs</p>
            <p className="text-sm text-slate-500">Page {page} of {pages}</p>
          </div>
          {loading ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)}</div>
          ) : shown.length ? (
            <AnimatePresence>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{shown.map((job) => <JobCard key={job.id} job={job} />)}</div>
            </AnimatePresence>
          ) : <EmptyState title="No jobs found" text="Try changing your filters or search for a broader skill, role, or location." />}
          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: pages }).map((_, index) => (
              <button key={index} className={`h-10 w-10 rounded-xl font-black ${page === index + 1 ? 'bg-teal-600 text-white' : 'bg-white dark:bg-slate-900'}`} onClick={() => setPage(index + 1)}>{index + 1}</button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Select({ label, value, onChange, options, suffix = '' }) {
  return (
    <label className="grid gap-2 text-sm font-bold">{label}
      <select className="field" value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">All</option>
        {options.map((item) => <option key={item} value={item}>{item}{suffix}</option>)}
      </select>
    </label>
  );
}
