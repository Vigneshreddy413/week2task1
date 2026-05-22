import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, Building2, CheckCircle2, Clock3, Send, Sparkles, TrendingUp, UsersRound, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import JobCard from '../components/JobCard.jsx';
import StatCard from '../components/StatCard.jsx';
import { useApp } from '../context/AppContext.jsx';
import { testimonials, topCompanies } from '../data/seedData.js';

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.58, ease: 'easeOut' } },
};

export default function Home() {
  const { jobs } = useApp();
  const featured = jobs.filter((job) => job.featured).slice(0, 4);

  return (
    <>
      <section className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-[1.02fr_.98fr] lg:py-20">
        <motion.div variants={fadeUp} initial="hidden" animate="show">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/80 px-4 py-2 text-sm font-bold text-teal-700 shadow-lg shadow-teal-500/10 dark:border-teal-900 dark:bg-slate-900/70 dark:text-teal-300">
            <Sparkles size={16} /> Portfolio-ready hiring platform
          </div>
          <h1 className="max-w-4xl text-5xl font-black leading-tight tracking-normal md:text-7xl">
            HireHub <span className="gradient-text">connects talent with teams faster.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            A premium job portal inspired by LinkedIn and Naukri, built with polished candidate journeys, employer workflows, rich dashboards, and smooth motion everywhere it matters.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/jobs" className="btn-primary text-base">Explore Jobs <ArrowRight size={18} /></Link>
            <Link to="/signup" className="btn-soft text-base">Post a Job</Link>
          </div>
          <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
            {['Verified employers', 'One-click apply', 'Live dashboards'].map((item) => (
              <motion.span whileHover={{ x: 4 }} key={item} className="flex items-center gap-2 rounded-xl bg-white/62 px-3 py-2 text-sm font-bold text-slate-600 shadow-sm dark:bg-slate-900/52 dark:text-slate-300">
                <CheckCircle2 className="text-teal-600" size={18} /> {item}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.94, rotate: -1 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: 0.12, duration: 0.62 }} className="glass premium-card pulse-glow rounded-[2rem] p-4">
          <div className="relative overflow-hidden rounded-[1.5rem] bg-slate-950 p-5 text-white">
            <div className="aurora-line absolute left-0 right-0 top-0" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-teal-200">Hiring pulse</p>
                <h2 className="text-2xl font-black">Talent command center</h2>
              </div>
              <TrendingUp className="text-teal-300" />
            </div>
            <div className="mt-5 grid gap-3">
              {featured.slice(0, 3).map((job) => (
                <motion.div key={job.id} whileHover={{ x: 5 }} className="rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-black">{job.title}</p>
                      <p className="text-sm text-slate-300">{job.company} - {job.location}</p>
                    </div>
                    <span className="rounded-full bg-teal-400/20 px-3 py-1 text-xs font-bold text-teal-100">{job.salary}</span>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {[
                ['92%', 'Match score', BadgeCheck],
                ['18m', 'Avg response', Clock3],
                ['4.8x', 'Hiring speed', Zap],
              ].map(([value, label, Icon]) => (
                <motion.div key={label} whileHover={{ y: -4 }} className="rounded-2xl border border-white/10 bg-white/10 p-3">
                  <Icon className="mb-2 text-teal-300" size={18} />
                  <p className="text-xl font-black">{value}</p>
                  <p className="text-xs text-slate-300">{label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase text-teal-600">Featured jobs</p>
            <h2 className="text-3xl font-black">Roles getting attention now</h2>
          </div>
          <Link className="btn-soft" to="/jobs">View all <ArrowRight size={16} /></Link>
        </div>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={{ show: { transition: { staggerChildren: 0.08 } } }} className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featured.map((job) => <motion.div key={job.id} variants={fadeUp}><JobCard job={job} compact /></motion.div>)}
        </motion.div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={BriefIcon} value={1200} suffix="+" label="Active jobs" />
        <StatCard icon={UsersRound} value={8500} suffix="+" label="Candidate profiles" />
        <StatCard icon={Building2} value={420} suffix="+" label="Companies hiring" />
        <StatCard icon={Send} value={96} suffix="%" label="Application tracking" />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-6">
          <p className="text-sm font-black uppercase text-teal-600">Top companies</p>
          <h2 className="text-3xl font-black">Trusted by modern teams</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topCompanies.map((company, index) => (
            <motion.div key={company} whileHover={{ y: -6, scale: 1.01 }} className="glass premium-card flex items-center gap-4 rounded-2xl p-5">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-slate-950 to-teal-700 font-black text-white dark:from-white dark:to-teal-200 dark:text-slate-950">
                {company.split(' ').map((word) => word[0]).join('').slice(0, 2)}
              </div>
              <div>
                <p className="font-black">{company}</p>
                <p className="text-sm text-slate-500">{index + 3} open roles - fast responses</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <motion.blockquote key={item.name} whileHover={{ y: -6 }} className="glass premium-card rounded-2xl p-6">
              <p className="leading-7 text-slate-600 dark:text-slate-300">"{item.quote}"</p>
              <footer className="mt-4 font-black">{item.name}<span className="block text-sm font-semibold text-slate-500">{item.role}</span></footer>
            </motion.blockquote>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="premium-card overflow-hidden rounded-3xl bg-slate-950 p-8 text-white shadow-2xl shadow-blue-950/20 md:p-12">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-black uppercase text-teal-300">Ready for the next move?</p>
              <h2 className="mt-2 text-3xl font-black md:text-4xl">Find your next role or your next great hire today.</h2>
            </div>
            <Link className="btn-primary bg-none" to="/signup">Get Started <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>
    </>
  );
}

function BriefIcon(props) {
  return <Building2 {...props} />;
}
