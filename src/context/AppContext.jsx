import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { seedJobs, seedUsers } from '../data/seedData.js';
import { storage, uid } from '../utils/storage.js';

const AppContext = createContext(null);

const keys = {
  users: 'hirehub_users',
  jobs: 'hirehub_jobs',
  applications: 'hirehub_applications',
  saved: 'hirehub_saved_jobs',
  auth: 'hirehub_auth_user',
  theme: 'hirehub_theme',
  viewed: 'hirehub_recently_viewed',
};

export function AppProvider({ children }) {
  const [users, setUsers] = useState(() => storage.get(keys.users, seedUsers));
  const [jobs, setJobs] = useState(() => storage.get(keys.jobs, seedJobs));
  const [applications, setApplications] = useState(() => storage.get(keys.applications, []));
  const [savedJobs, setSavedJobs] = useState(() => storage.get(keys.saved, []));
  const [currentUser, setCurrentUser] = useState(() => storage.get(keys.auth, null));
  const [theme, setTheme] = useState(() => storage.get(keys.theme, 'light'));
  const [recentlyViewed, setRecentlyViewed] = useState(() => storage.get(keys.viewed, []));
  const [toast, setToast] = useState(null);

  useEffect(() => storage.set(keys.users, users), [users]);
  useEffect(() => storage.set(keys.jobs, jobs), [jobs]);
  useEffect(() => storage.set(keys.applications, applications), [applications]);
  useEffect(() => storage.set(keys.saved, savedJobs), [savedJobs]);
  useEffect(() => storage.set(keys.auth, currentUser), [currentUser]);
  useEffect(() => storage.set(keys.theme, theme), [theme]);
  useEffect(() => storage.set(keys.viewed, recentlyViewed), [recentlyViewed]);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const notify = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 2600);
  };

  const signup = (payload) => {
    if (users.some((user) => user.email.toLowerCase() === payload.email.toLowerCase())) {
      notify('An account with this email already exists.', 'error');
      return false;
    }
    const nextUser = { id: uid('user'), ...payload };
    setUsers((prev) => [...prev, nextUser]);
    setCurrentUser(nextUser);
    notify(`Welcome to HireHub, ${payload.name}!`);
    return true;
  };

  const login = (email, password) => {
    const user = users.find((item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password);
    if (!user) {
      notify('Invalid email or password.', 'error');
      return null;
    }
    setCurrentUser(user);
    notify(`Welcome back, ${user.name}!`);
    return user;
  };

  const logout = () => {
    setCurrentUser(null);
    notify('Logged out successfully.');
  };

  const addJob = (job) => {
    const nextJob = {
      id: uid('job'),
      employerId: currentUser.id,
      logo: job.company.split(' ').map((word) => word[0]).join('').slice(0, 2).toUpperCase(),
      salaryValue: Number(job.salaryValue || String(job.salary).match(/\d+/)?.[0] || 10),
      posted: 'Just now',
      featured: false,
      ...job,
      skills: Array.isArray(job.skills) ? job.skills : job.skills.split(',').map((skill) => skill.trim()).filter(Boolean),
    };
    setJobs((prev) => [nextJob, ...prev]);
    notify('Job posted successfully.');
  };

  const updateJob = (id, updates) => {
    setJobs((prev) => prev.map((job) => (job.id === id ? { ...job, ...updates, skills: Array.isArray(updates.skills) ? updates.skills : updates.skills.split(',').map((skill) => skill.trim()).filter(Boolean) } : job)));
    notify('Job updated.');
  };

  const deleteJob = (id) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));
    setApplications((prev) => prev.filter((app) => app.jobId !== id));
    notify('Job deleted.');
  };

  const applyToJob = (jobId) => {
    if (!currentUser) {
      notify('Please login as a candidate to apply.', 'error');
      return false;
    }
    if (currentUser.role !== 'candidate') {
      notify('Employer accounts cannot apply for jobs.', 'error');
      return false;
    }
    if (applications.some((app) => app.jobId === jobId && app.userId === currentUser.id)) {
      notify('You already applied to this job.', 'error');
      return false;
    }
    setApplications((prev) => [{ id: uid('app'), jobId, userId: currentUser.id, status: 'Under Review', date: new Date().toISOString() }, ...prev]);
    notify('Application submitted.');
    return true;
  };

  const toggleSaveJob = (jobId) => {
    if (!currentUser || currentUser.role !== 'candidate') {
      notify('Login as a candidate to save jobs.', 'error');
      return;
    }
    const exists = savedJobs.some((item) => item.jobId === jobId && item.userId === currentUser.id);
    setSavedJobs((prev) => (exists ? prev.filter((item) => !(item.jobId === jobId && item.userId === currentUser.id)) : [{ jobId, userId: currentUser.id }, ...prev]));
    notify(exists ? 'Removed from saved jobs.' : 'Saved for later.');
  };

  const markViewed = (jobId) => {
    setRecentlyViewed((prev) => [jobId, ...prev.filter((id) => id !== jobId)].slice(0, 5));
  };

  const updateProfile = (updates) => {
    setUsers((prev) => prev.map((user) => (user.id === currentUser.id ? { ...user, ...updates } : user)));
    setCurrentUser((prev) => ({ ...prev, ...updates }));
    notify('Profile updated.');
  };

  const value = useMemo(() => ({
    users,
    jobs,
    applications,
    savedJobs,
    currentUser,
    theme,
    toast,
    recentlyViewed,
    login,
    signup,
    logout,
    addJob,
    updateJob,
    deleteJob,
    applyToJob,
    toggleSaveJob,
    setTheme,
    markViewed,
    updateProfile,
    notify,
  }), [users, jobs, applications, savedJobs, currentUser, theme, toast, recentlyViewed]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);
