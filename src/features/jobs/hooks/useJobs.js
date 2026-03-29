import { useState, useEffect, useMemo } from 'react';
import { subscribeToJobs, saveJob as saveJobService, deleteJob as deleteJobService } from '../jobs.service';

export function useJobs(user) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isActionLoading, setIsActionLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const unsubscribe = subscribeToJobs(
      user.uid, 
      (jobsList) => {
        setJobs(jobsList);
        setLoading(false);
      },
      (err) => {
        setLoading(false);
        if (err.code === 'permission-denied') {
          setError("Permisiune refuzată la citirea Firestore. Verifică Rules din Firebase Console.");
        }
      }
    );

    return () => unsubscribe && unsubscribe();
  }, [user]);

  const stats = useMemo(() => ({
    total: jobs.length,
    interviews: jobs.filter(j => j.status === 'interview').length,
    accepted: jobs.filter(j => j.status === 'accepted').length,
    rejected: jobs.filter(j => j.status === 'rejected').length,
  }), [jobs]);

  const handleSaveJob = async (formData, jobId) => {
    if (!user) return;
    setIsActionLoading(true);
    try {
      await saveJobService(user.uid, formData, jobId);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (!user) return;
    setIsActionLoading(true);
    try {
      await deleteJobService(user.uid, jobId);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    } finally {
      setIsActionLoading(false);
    }
  };

  return {
    jobs,
    loading,
    error,
    isActionLoading,
    stats,
    handleSaveJob,
    handleDeleteJob
  };
}
