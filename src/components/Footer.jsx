import { BriefcaseBusiness, Code2, Mail, Share2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/70 py-10 dark:border-slate-800 dark:bg-slate-950/70">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-[1.2fr_.8fr_.8fr]">
        <div>
          <div className="mb-3 flex items-center gap-2 text-xl font-black"><BriefcaseBusiness className="text-teal-600" /> HireHub</div>
          <p className="max-w-md text-sm leading-6 text-slate-600 dark:text-slate-300">A polished job marketplace for candidates who want clarity and employers who want speed.</p>
        </div>
        <div className="grid gap-2 text-sm text-slate-600 dark:text-slate-300">
          <strong className="text-slate-950 dark:text-white">Platform</strong>
          <a href="/jobs">Browse jobs</a>
          <a href="/signup">Post jobs</a>
          <a href="/login">Dashboard</a>
        </div>
        <div className="grid gap-2 text-sm text-slate-600 dark:text-slate-300">
          <strong className="text-slate-950 dark:text-white">Connect</strong>
          <span className="flex items-center gap-2"><Mail size={16} /> hello@hirehub.local</span>
          <span className="flex items-center gap-2"><Share2 size={16} /> LinkedIn ready</span>
          <span className="flex items-center gap-2"><Code2 size={16} /> Portfolio project</span>
        </div>
      </div>
    </footer>
  );
}
