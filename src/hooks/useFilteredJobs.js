import { useMemo } from 'react';

export function useFilteredJobs(jobs, filters) {
  return useMemo(() => jobs.filter((job) => {
    const search = filters.search.trim().toLowerCase();
    const matchesSearch = !search || [job.title, job.company, job.location, job.skills.join(' ')].join(' ').toLowerCase().includes(search);
    const matchesLocation = !filters.location || job.location === filters.location;
    const matchesCategory = !filters.category || job.category === filters.category;
    const matchesType = !filters.type || job.type === filters.type;
    const matchesSalary = !filters.salary || job.salaryValue >= Number(filters.salary);
    return matchesSearch && matchesLocation && matchesCategory && matchesType && matchesSalary;
  }), [jobs, filters]);
}
