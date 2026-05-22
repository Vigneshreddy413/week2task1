import { Inbox } from 'lucide-react';

export default function EmptyState({ title, text }) {
  return (
    <div className="glass grid place-items-center rounded-2xl p-10 text-center">
      <Inbox className="mb-3 text-teal-600" size={36} />
      <h3 className="text-xl font-black">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">{text}</p>
    </div>
  );
}
