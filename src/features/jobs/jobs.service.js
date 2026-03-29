import { collection, doc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase';

/**
 * Get a reference to the user's jobs collection
 * Path: users/{userId}/jobs
 * @param {string} userId 
 */
export const getJobsCollectionRef = (userId) => {
  return collection(db, 'users', userId, 'jobs');
};

/**
 * Subscribe to the user's jobs collection
 * @param {string} userId 
 * @param {function} callback 
 * @param {function} onError
 */
export const subscribeToJobs = (userId, callback, onError) => {
  if (!userId) return null;
  const jobsRef = getJobsCollectionRef(userId);
  
  return onSnapshot(jobsRef, (snapshot) => {
    const jobsList = [];
    snapshot.forEach((doc) => {
      jobsList.push({ id: doc.id, ...doc.data() });
    });
    // Sort descending by date
    jobsList.sort((a, b) => new Date(b.date) - new Date(a.date));
    callback(jobsList);
  }, (error) => {
    console.error("Firestore Subscription Error:", error);
    if (onError) onError(error);
  });
};

/**
 * Save or Update a job
 * @param {string} userId 
 * @param {object} jobData 
 * @param {string|null} jobId 
 */
export const saveJob = async (userId, jobData, jobId = null) => {
  if (!userId) throw new Error("User not authenticated");
  
  const id = jobId || Date.now().toString();
  const jobRef = doc(db, 'users', userId, 'jobs', id);
  
  await setDoc(jobRef, {
    ...jobData,
    updatedAt: new Date().toISOString(),
    userId: userId
  });
  return id;
};

/**
 * Delete a job
 * @param {string} userId 
 * @param {string} jobId 
 */
export const deleteJob = async (userId, jobId) => {
  if (!userId) throw new Error("User not authenticated");
  
  const jobRef = doc(db, 'users', userId, 'jobs', jobId);
  await deleteDoc(jobRef);
};
