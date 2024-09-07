import { db } from '../../firebase/firebase_config';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs 
} from 'firebase/firestore';

export const addProject = (projectData) => {
  return addDoc(collection(db, 'projects'), projectData);
};

export const updateProject = (projectId, projectData) => {
  const projectRef = doc(db, 'projects', projectId);
  return updateDoc(projectRef, projectData);
};

export const deleteProject = (projectId) => {
  const projectRef = doc(db, 'projects', projectId);
  return deleteDoc(projectRef);
};

export const getProjects = async () => {
  const querySnapshot = await getDocs(collection(db, 'projects'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};