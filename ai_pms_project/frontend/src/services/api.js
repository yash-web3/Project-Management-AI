import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const fetchProjects = () => axios.get(`${API_BASE_URL}/projects`);
export const fetchTasks = () => axios.get(`${API_BASE_URL}/tasks`);
export const createTask = (taskData) => axios.post(`${API_BASE_URL}/tasks`, taskData);
export const updateTask = (taskId, taskData) => axios.put(`${API_BASE_URL}/tasks/${taskId}`, taskData);