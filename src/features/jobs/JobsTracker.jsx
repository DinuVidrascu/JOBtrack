import React, { useState, useMemo, useCallback } from 'react';
import { useAuth } from './hooks/useAuth';
import { useJobs } from './hooks/useJobs';
import { useTheme } from '../../hooks/useTheme';
import { useToast } from '../../hooks/useToast';

// Features Components
import JobForm from './components/JobForm';
import DeleteConfirm from './components/DeleteConfirm';
import JobHeader from './components/JobHeader';
import JobStats from './components/JobStats';
import JobFilters from './components/JobFilters';
import JobFeed from './components/JobFeed';
import JobLoading from './components/JobLoading';
import JobAuthError from './components/JobAuthError';
import Toast from '../../components/ui/Toast';

export default function JobsTracker() {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, authLoading, authError } = useAuth();
  const { 
    jobs, 
    loading: jobsLoading, 
    error: jobsError, 
    isActionLoading, 
    stats, 
    handleSaveJob, 
    handleDeleteJob 
  } = useJobs(user);
  const { toasts, addToast } = useToast();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [jobToDelete, setJobToDelete] = useState(null);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesFilter = filter === 'all' || job.status === filter;
      const matchesSearch = !search || 
        job.company.toLowerCase().includes(search.toLowerCase()) || 
        job.role.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [jobs, filter, search]);

  const handleOpenAdd = useCallback(() => {
    setEditingJob(null);
    setIsFormOpen(true);
  }, []);

  const handleOpenEdit = useCallback((job) => {
    setEditingJob(job);
    setIsFormOpen(true);
  }, []);

  const handleSave = useCallback(async (formData) => {
    const success = await handleSaveJob(formData, editingJob?.id);
    if (success) {
      setIsFormOpen(false);
      addToast(editingJob ? 'Aplicație actualizată!' : 'Aplicație adăugată!');
    } else {
      addToast('Eroare la salvare. Încearcă din nou.', 'error');
    }
  }, [handleSaveJob, editingJob, addToast]);

  const handleDelete = useCallback(async () => {
    const success = await handleDeleteJob(jobToDelete);
    if (success) {
      setJobToDelete(null);
      addToast('Aplicație ștearsă!');
    } else {
      addToast('Eroare la ștergere. Încearcă din nou.', 'error');
    }
  }, [handleDeleteJob, jobToDelete, addToast]);

  const handleDownloadCV = useCallback((cvData, fileName) => {
    if (!cvData) return;
    const a = document.createElement('a');
    a.href = cvData;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, []);

  if (authLoading || jobsLoading) {
    return <JobLoading />;
  }

  return (
    <div className="min-h-screen p-4 sm:p-8 lg:p-12 animate-fade-in transition-colors duration-500">
      <div className="max-w-6xl mx-auto space-y-10">
        
        <JobAuthError error={authError || jobsError} />

        <JobHeader 
          isDarkMode={isDarkMode} 
          toggleTheme={toggleTheme} 
          onOpenAdd={handleOpenAdd} 
        />

        <JobStats stats={stats} isDarkMode={isDarkMode} />

        <JobFilters 
          filter={filter} 
          setFilter={setFilter} 
          search={search}
          setSearch={setSearch}
          isDarkMode={isDarkMode} 
        />

        <JobFeed 
          jobs={filteredJobs} 
          onEdit={handleOpenEdit} 
          onDelete={setJobToDelete}
          onDownload={handleDownloadCV}
          isDarkMode={isDarkMode}
        />
      </div>

      {isFormOpen && (
        <JobForm 
          job={editingJob} 
          onSubmit={handleSave} 
          onClose={() => setIsFormOpen(false)} 
          isLoading={isActionLoading}
          isDark={isDarkMode}
        />
      )}

      {jobToDelete && (
        <DeleteConfirm 
          onConfirm={handleDelete}
          onCancel={() => setJobToDelete(null)}
          isLoading={isActionLoading}
          isDark={isDarkMode}
        />
      )}

      <Toast toasts={toasts} />
    </div>
  );
}
