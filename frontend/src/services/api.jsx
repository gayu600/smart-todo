// // import axios from "axios";

// // const API_URL = "http://localhost:5000";

// // export const register = (data) => axios.post(`${API_URL}/api/auth/register`, data);
// // export const login = (data) =>
// //   axios.post(`${API_URL}/api/auth/login`, data, {
// //     headers: { "Content-Type": "application/json" },
// //   });
// // export const createTask = (data) => axios.post(`${API_URL}/api/tasks`, data);
// // export const getTasks = () => axios.get(`${API_URL}/api/tasks`);
// // export const updateTask = (id, data) => axios.put(`${API_URL}/api/tasks/${id}`, data);
// // export const deleteTask = (id) => axios.delete(`${API_URL}/api/tasks/${id}`);
// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// // 🔒 Attach token automatically to every request
// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     req.headers.Authorization = `Bearer ${token}`;
//   }
//   return req;
// });

// // ===============================
// // AUTH APIs
// // ===============================
// export const register = (data) => API.post("/register", data);
// export const login = (data) => API.post("/login", data);

// // ===============================
// // TASK APIs
// // ===============================
// export const fetchTasks = () => API.get("/tasks");
// export const createTask = (data) => API.post("/tasks", data);
// export const updateTask = (id, data) => API.put(`/tasks/${id}`, data);
// export const deleteTask = (id) => API.delete(`/tasks/${id}`);
// export const completeTask = (id) => API.put(`/tasks/${id}/complete`);


// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     req.headers.Authorization = `Bearer ${token}`;
//   }
//   return req;
// });

// export const signup = (data) => API.post("auth/signup", data);
// export const login = (data) => API.post("auth/login", data);

// export const fetchTasks = () => API.get("/tasks");
// export const createTask = (data) => API.post("/tasks", data);
// export const updateTask = (id, data) => API.put(`/tasks/${id}`, data);
// export const deleteTask = (id) => API.delete(`/tasks/${id}`);
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// AUTH
export const signup = (data) => API.post("/auth/signup", data);
export const login = (data) => API.post("/auth/login", data);

// TODOS
export const fetchTasks = () => API.get("/todo");
export const createTask = (data) => API.post("/todo", data);
export const updateTask = (id, data) => API.put(`/todo/${id}`, data);
export const deleteTask = (id) => API.delete(`/todo/${id}`);
