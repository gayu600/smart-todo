// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import * as api from "../services/api";
// import { Trash2, Plus, CheckCircle, Circle, Clock } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import BubbleBackground from "../components/BubbleBackground";

// export default function Dashboard() {
//   const [user, setUser] = useState(() => {
//     try {
//       const storedUser = localStorage.getItem("user");
//       return storedUser ? JSON.parse(storedUser) : null;
//     } catch {
//       localStorage.removeItem("user");
//       return null;
//     }
//   });

//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState({
//     title: "",
//     description: "",
//     due_date: "",
//   });
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState("all");
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user) navigate("/login");
//   }, [user, navigate]);

//   const fetchTasks = async () => {
//     setLoading(true);
//     try {
//       const res = await api.fetchTasks();

//       const formatted = res.data.map((t) => ({
//         ...t,
//         is_completed: t.status === "completed",
//       }));

//       setTasks(formatted);
//     } catch (err) {
//       console.error("Error fetching tasks:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const addTask = async (e) => {
//     e.preventDefault();
//     if (!newTask.title.trim()) return alert("Please enter a task title");

//     try {
//       const res = await api.createTask(newTask);

//       const formatted = {
//         ...res.data,
//         is_completed: res.data.status === "completed",
//       };

//       setTasks((prev) => [...prev, formatted]);
//       setNewTask({ title: "", description: "", due_date: "" });
//     } catch (err) {
//       console.error("Error creating task:", err);
//     }
//   };

//   const toggleComplete = async (id, is_completed) => {
//     try {
//       const newStatus = is_completed ? "pending" : "completed";

//       await api.updateTask(id, { status: newStatus });

//       setTasks((prev) =>
//         prev.map((t) =>
//           t.id === id
//             ? { ...t, status: newStatus, is_completed: !is_completed }
//             : t
//         )
//       );
//     } catch (err) {
//       console.error("Error updating task:", err);
//       fetchTasks();
//     }
//   };

//   // DELETE FROM BACKEND TOO
//   const deleteTask = async (id) => {
//     try {
//       await api.deleteTask(id);
//       setTasks((prev) => prev.filter((t) => t.id !== id));
//     } catch (err) {
//       console.error("Error deleting task:", err);
//     }
//   };

//   const total = tasks.length;
//   const completed = tasks.filter((t) => t.is_completed).length;
//   const pending = total - completed;
//   const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

//   const filteredTasks = tasks.filter((task) =>
//     filter === "all"
//       ? true
//       : filter === "pending"
//       ? !task.is_completed
//       : task.is_completed
//   );

//   if (!user) {
//     return (
//       <div className="flex justify-center items-center min-h-screen text-white bg-[#0a0f1f]">
//         <p className="text-lg">⚠️ Please log in to view your dashboard.</p>
//       </div>
//     );
//   }

//   const tabVariants = {
//     hidden: { opacity: 0, x: 50 },
//     visible: { opacity: 1, x: 0 },
//     exit: { opacity: 0, x: -50 },
//   };

//   return (
//     <div className="relative min-h-screen flex flex-col justify-center items-center bg-[#0a0f1f] text-white overflow-hidden">
//       <BubbleBackground />

//       <div className="relative z-10 w-full max-w-4xl bg-[#111827]/80 backdrop-blur-md border border-cyan-500/30 rounded-xl shadow-xl p-8">
//         <h1 className="text-3xl font-bold mb-6 text-center text-cyan-400">
//           Task Dashboard
//         </h1>

//         {/* User Profile + Logout */}
//         <div className="flex justify-between items-center mb-6">
//           <div>
//             <p className="text-gray-300 text-sm">Logged in as:</p>
//             <p className="text-cyan-400 font-semibold">{user?.email}</p>
//           </div>

//           <button
//             onClick={() => {
//               localStorage.removeItem("token");
//               localStorage.removeItem("user");
//               navigate("/login");
//             }}
//             className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white font-medium"
//           >
//             Logout
//           </button>
//         </div>

//         {/* Stats */}
//         <div className="flex justify-around mb-6 text-sm md:text-base">
//           <div className="text-yellow-400">Pending: {pending}</div>
//           <div className="text-green-400">Completed: {completed}</div>
//           <div className="text-cyan-400">Total: {total}</div>
//           <div className="text-purple-400">{completionRate}% Done</div>
//         </div>

//         {/* Tabs */}
//         <div className="flex justify-center gap-4 mb-6 border-b border-cyan-500">
//           {["all", "pending", "completed"].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setFilter(tab)}
//               className={`px-4 py-2 font-medium border-b-2 ${
//                 filter === tab
//                   ? "border-cyan-400 text-white"
//                   : "border-transparent text-gray-400 hover:text-white"
//               }`}
//             >
//               {tab.charAt(0).toUpperCase() + tab.slice(1)}
//               {tab === "pending" && ` (${pending})`}
//               {tab === "completed" && ` (${completed})`}
//             </button>
//           ))}
//         </div>

//         {/* Add Task */}
//         <form
//           onSubmit={addTask}
//           className="flex flex-col md:flex-row gap-3 mb-6 items-center"
//         >
//           <input
//             type="text"
//             placeholder="Task title"
//             value={newTask.title}
//             onChange={(e) =>
//               setNewTask({ ...newTask, title: e.target.value })
//             }
//             className="w-full md:flex-1 p-2 rounded bg-[#0a0f1f] border border-cyan-600 text-white"
//           />
//           <input
//             type="text"
//             placeholder="Description"
//             value={newTask.description}
//             onChange={(e) =>
//               setNewTask({ ...newTask, description: e.target.value })
//             }
//             className="w-full md:flex-1 p-2 rounded bg-[#0a0f1f] border border-cyan-600 text-white"
//           />
//           <input
//             type="date"
//             value={newTask.due_date}
//             onChange={(e) =>
//               setNewTask({ ...newTask, due_date: e.target.value })
//             }
//             className="p-2 rounded bg-[#0a0f1f] border border-cyan-600 text-white"
//           />
//           <button
//             type="submit"
//             className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded text-white font-medium"
//           >
//             <Plus size={18} /> Add Task
//           </button>
//         </form>

//         {/* Task List */}
//         <AnimatePresence exitBeforeEnter>
//           <motion.div
//             key={`${filter}-${tasks.map((t) => t.is_completed).join(",")}`}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             variants={tabVariants}
//             transition={{ duration: 0.3 }}
//           >
//             {loading ? (
//               <p className="text-center text-gray-400">Loading tasks...</p>
//             ) : filteredTasks.length === 0 ? (
//               <p className="text-center text-gray-400">
//                 No {filter} tasks found. Add one!
//               </p>
//             ) : (
//               <div className="space-y-3">
//                 {filteredTasks.map((task) => (
//                   <motion.div
//                     key={task.id}
//                     layout
//                     className={`flex justify-between items-center border rounded-lg p-4 transition-all duration-200 ${
//                       task.is_completed
//                         ? "border-green-500 bg-green-900/20"
//                         : "border-cyan-600 bg-cyan-900/20"
//                     }`}
//                   >
//                     <div>
//                       <h3
//                         className={`text-lg font-semibold ${
//                           task.is_completed
//                             ? "line-through text-gray-400"
//                             : "text-white"
//                         }`}
//                       >
//                         {task.title}
//                       </h3>

//                       {task.description && (
//                         <p className="text-sm text-gray-400">
//                           {task.description}
//                         </p>
//                       )}

//                       {task.due_date && (
//                         <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
//                           <Clock size={14} />
//                           {new Date(task.due_date).toDateString()}
//                         </div>
//                       )}
//                     </div>

//                     <div className="flex items-center gap-3">
//                       <button
//                         onClick={() =>
//                           toggleComplete(task.id, task.is_completed)
//                         }
//                         className="text-cyan-400 hover:text-green-400 transition"
//                         title="Mark as complete"
//                       >
//                         {task.is_completed ? (
//                           <CheckCircle size={22} />
//                         ) : (
//                           <Circle size={22} />
//                         )}
//                       </button>

//                       <button
//                         onClick={() => deleteTask(task.id)}
//                         className="text-red-500 hover:text-red-700 transition"
//                         title="Delete task"
//                       >
//                         <Trash2 size={20} />
//                       </button>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             )}
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import * as api from "../services/api";
// import { Trash2, Plus, CheckCircle, Circle, Clock, User, LogOut, Settings } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import BubbleBackground from "../components/BubbleBackground";
// import { Menu } from "@headlessui/react";

// export default function Dashboard() {
//   const [user, setUser] = useState(() => {
//     try {
//       const storedUser = localStorage.getItem("user");
//       return storedUser ? JSON.parse(storedUser) : null;
//     } catch {
//       localStorage.removeItem("user");
//       return null;
//     }
//   });

//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState({
//     title: "",
//     description: "",
//     due_date: "",
//   });
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState("all");
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user) navigate("/login");
//   }, [user, navigate]);

//   const fetchTasks = async () => {
//     setLoading(true);
//     try {
//       const res = await api.fetchTasks();
//       const formatted = res.data.map((t) => ({
//         ...t,
//         is_completed: t.status === "completed",
//       }));
//       setTasks(formatted);
//     } catch (err) {
//       console.error("Error fetching tasks:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const addTask = async (e) => {
//     e.preventDefault();
//     if (!newTask.title.trim()) return alert("Please enter a task title");

//     try {
//       const res = await api.createTask(newTask);
//       const formatted = {
//         ...res.data,
//         is_completed: res.data.status === "completed",
//       };
//       setTasks((prev) => [...prev, formatted]);
//       setNewTask({ title: "", description: "", due_date: "" });
//     } catch (err) {
//       console.error("Error creating task:", err);
//     }
//   };

//   const toggleComplete = async (id, is_completed) => {
//     try {
//       const newStatus = is_completed ? "pending" : "completed";
//       await api.updateTask(id, { status: newStatus });
//       setTasks((prev) =>
//         prev.map((t) =>
//           t.id === id
//             ? { ...t, status: newStatus, is_completed: !is_completed }
//             : t
//         )
//       );
//     } catch (err) {
//       console.error("Error updating task:", err);
//       fetchTasks();
//     }
//   };

//   const deleteTask = async (id) => {
//     try {
//       await api.deleteTask(id);
//       setTasks((prev) => prev.filter((t) => t.id !== id));
//     } catch (err) {
//       console.error("Error deleting task:", err);
//     }
//   };

//   const total = tasks.length;
//   const completed = tasks.filter((t) => t.is_completed).length;
//   const pending = total - completed;
//   const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

//   const filteredTasks = tasks.filter((task) =>
//     filter === "all"
//       ? true
//       : filter === "pending"
//       ? !task.is_completed
//       : task.is_completed
//   );

//   if (!user) {
//     return (
//       <div className="flex justify-center items-center min-h-screen text-white bg-[#0a0f1f]">
//         <p className="text-lg">⚠️ Please log in to view your dashboard.</p>
//       </div>
//     );
//   }

//   const tabVariants = {
//     hidden: { opacity: 0, x: 50 },
//     visible: { opacity: 1, x: 0 },
//     exit: { opacity: 0, x: -50 },
//   };

//   return (
//     <div className="relative min-h-screen flex flex-col justify-center items-center bg-[#0a0f1f] text-white overflow-hidden">
//       <BubbleBackground />

//       <div className="relative z-10 w-full max-w-4xl bg-[#111827]/80 backdrop-blur-md border border-cyan-500/30 rounded-xl shadow-xl p-8">
//         <h1 className="text-3xl font-bold mb-6 text-center text-cyan-400">
//           Task Dashboard
//         </h1>

//         {/* User Profile + Logout Dropdown */}
//         <div className="flex justify-between items-center mb-6">
//           <div>
//             <p className="text-gray-300 text-sm">Logged in as:</p>
//             <p className="text-cyan-400 font-semibold">{user?.email}</p>
//           </div>

//           <Menu as="div" className="relative inline-block text-left">
//             <Menu.Button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
//               <User size={18} />
//               Profile
//             </Menu.Button>

//             <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-[#111827] border border-cyan-500/30 divide-y divide-gray-700 rounded-md shadow-lg focus:outline-none z-20">
//               <div className="px-1 py-1">
//                 <Menu.Item>
//                   {({ active }) => (
//                     <button
//                       onClick={() => navigate("/profile")}
//                       className={`${
//                         active ? "bg-cyan-600 text-white" : "text-gray-200"
//                       } group flex rounded-md items-center w-full px-2 py-2 text-sm gap-2`}
//                     >
//                       <Settings size={16} />
//                       Update Profile
//                     </button>
//                   )}
//                 </Menu.Item>

//                 <Menu.Item>
//                   {({ active }) => (
//                     <button
//                       onClick={() => {
//                         localStorage.removeItem("token");
//                         localStorage.removeItem("user");
//                         navigate("/login");
//                       }}
//                       className={`${
//                         active ? "bg-red-600 text-white" : "text-gray-200"
//                       } group flex rounded-md items-center w-full px-2 py-2 text-sm gap-2`}
//                     >
//                       <LogOut size={16} />
//                       Logout
//                     </button>
//                   )}
//                 </Menu.Item>
//               </div>
//             </Menu.Items>
//           </Menu>
//         </div>

//         {/* Stats */}
//         <div className="flex justify-around mb-6 text-sm md:text-base">
//           <div className="text-yellow-400">Pending: {pending}</div>
//           <div className="text-green-400">Completed: {completed}</div>
//           <div className="text-cyan-400">Total: {total}</div>
//           <div className="text-purple-400">{completionRate}% Done</div>
//         </div>

//         {/* Tabs */}
//         <div className="flex justify-center gap-4 mb-6 border-b border-cyan-500">
//           {["all", "pending", "completed"].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setFilter(tab)}
//               className={`px-4 py-2 font-medium border-b-2 ${
//                 filter === tab
//                   ? "border-cyan-400 text-white"
//                   : "border-transparent text-gray-400 hover:text-white"
//               }`}
//             >
//               {tab.charAt(0).toUpperCase() + tab.slice(1)}
//               {tab === "pending" && ` (${pending})`}
//               {tab === "completed" && ` (${completed})`}
//             </button>
//           ))}
//         </div>

//         {/* Add Task */}
//         <form
//           onSubmit={addTask}
//           className="flex flex-col md:flex-row gap-3 mb-6 items-center"
//         >
//           <input
//             type="text"
//             placeholder="Task title"
//             value={newTask.title}
//             onChange={(e) =>
//               setNewTask({ ...newTask, title: e.target.value })
//             }
//             className="w-full md:flex-1 p-2 rounded bg-[#0a0f1f] border border-cyan-600 text-white"
//           />
//           <input
//             type="text"
//             placeholder="Description"
//             value={newTask.description}
//             onChange={(e) =>
//               setNewTask({ ...newTask, description: e.target.value })
//             }
//             className="w-full md:flex-1 p-2 rounded bg-[#0a0f1f] border border-cyan-600 text-white"
//           />
//           <input
//             type="date"
//             value={newTask.due_date}
//             onChange={(e) =>
//               setNewTask({ ...newTask, due_date: e.target.value })
//             }
//             className="p-2 rounded bg-[#0a0f1f] border border-cyan-600 text-white"
//           />
//           <button
//             type="submit"
//             className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded text-white font-medium"
//           >
//             <Plus size={18} /> Add Task
//           </button>
//         </form>

//         {/* Task List */}
//         <AnimatePresence exitBeforeEnter>
//           <motion.div
//             key={`${filter}-${tasks.map((t) => t.is_completed).join(",")}`}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             variants={tabVariants}
//             transition={{ duration: 0.3 }}
//           >
//             {loading ? (
//               <p className="text-center text-gray-400">Loading tasks...</p>
//             ) : filteredTasks.length === 0 ? (
//               <p className="text-center text-gray-400">
//                 No {filter} tasks found. Add one!
//               </p>
//             ) : (
//               <div className="space-y-3">
//                 {filteredTasks.map((task) => (
//                   <motion.div
//                     key={task.id}
//                     layout
//                     className={`flex justify-between items-center border rounded-lg p-4 transition-all duration-200 ${
//                       task.is_completed
//                         ? "border-green-500 bg-green-900/20"
//                         : "border-cyan-600 bg-cyan-900/20"
//                     }`}
//                   >
//                     <div>
//                       <h3
//                         className={`text-lg font-semibold ${
//                           task.is_completed
//                             ? "line-through text-gray-400"
//                             : "text-white"
//                         }`}
//                       >
//                         {task.title}
//                       </h3>

//                       {task.description && (
//                         <p className="text-sm text-gray-400">
//                           {task.description}
//                         </p>
//                       )}

//                       {task.due_date && (
//                         <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
//                           <Clock size={14} />
//                           {new Date(task.due_date).toDateString()}
//                         </div>
//                       )}
//                     </div>

//                     <div className="flex items-center gap-3">
//                       <button
//                         onClick={() =>
//                           toggleComplete(task.id, task.is_completed)
//                         }
//                         className="text-cyan-400 hover:text-green-400 transition"
//                         title="Mark as complete"
//                       >
//                         {task.is_completed ? (
//                           <CheckCircle size={22} />
//                         ) : (
//                           <Circle size={22} />
//                         )}
//                       </button>

//                       <button
//                         onClick={() => deleteTask(task.id)}
//                         className="text-red-500 hover:text-red-700 transition"
//                         title="Delete task"
//                       >
//                         <Trash2 size={20} />
//                       </button>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             )}
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../services/api";
import { Trash2, Plus, CheckCircle, Circle, Clock, LogOut, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BubbleBackground from "../components/BubbleBackground";
import { Menu } from "@headlessui/react";

export default function Dashboard() {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    due_date: "",
  });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await api.fetchTasks();
      const formatted = res.data.map((t) => ({
        ...t,
        is_completed: t.status === "completed",
      }));
      setTasks(formatted);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return alert("Please enter a task title");

    try {
      const res = await api.createTask(newTask);
      const formatted = {
        ...res.data,
        is_completed: res.data.status === "completed",
      };
      setTasks((prev) => [...prev, formatted]);
      setNewTask({ title: "", description: "", due_date: "" });
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  const toggleComplete = async (id, is_completed) => {
    try {
      const newStatus = is_completed ? "pending" : "completed";
      await api.updateTask(id, { status: newStatus });
      setTasks((prev) =>
        prev.map((t) =>
          t.id === id
            ? { ...t, status: newStatus, is_completed: !is_completed }
            : t
        )
      );
    } catch (err) {
      console.error("Error updating task:", err);
      fetchTasks();
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const total = tasks.length;
  const completed = tasks.filter((t) => t.is_completed).length;
  const pending = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const filteredTasks = tasks.filter((task) =>
    filter === "all"
      ? true
      : filter === "pending"
      ? !task.is_completed
      : task.is_completed
  );

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white bg-[#0a0f1f]">
        <p className="text-lg">⚠️ Please log in to view your dashboard.</p>
      </div>
    );
  }

  const tabVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-[#0a0f1f] text-white overflow-hidden">
      <BubbleBackground />

      <div className="relative z-10 w-full max-w-4xl bg-[#111827]/80 backdrop-blur-md border border-cyan-500/30 rounded-xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-cyan-400">Task Dashboard</h1>

          {/* Profile Dropdown Button */}
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded text-white font-medium">
              Profile
            </Menu.Button>

            <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-[#111827] border border-cyan-500/30 divide-y divide-gray-700 rounded-md shadow-lg focus:outline-none z-20">
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => navigate("/profile")}
                      className={`${
                        active ? "bg-cyan-600 text-white" : "text-gray-200"
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm gap-2`}
                    >
                      <Settings size={16} />
                      Update Profile
                    </button>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("user");
                        navigate("/login");
                      }}
                      className={`${
                        active ? "bg-red-600 text-white" : "text-gray-200"
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm gap-2`}
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>
        </div>

        {/* Stats */}
        <div className="flex justify-around mb-6 text-sm md:text-base">
          <div className="text-yellow-400">Pending: {pending}</div>
          <div className="text-green-400">Completed: {completed}</div>
          <div className="text-cyan-400">Total: {total}</div>
          <div className="text-purple-400">{completionRate}% Done</div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-6 border-b border-cyan-500">
          {["all", "pending", "completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 font-medium border-b-2 ${
                filter === tab
                  ? "border-cyan-400 text-white"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tab === "pending" && ` (${pending})`}
              {tab === "completed" && ` (${completed})`}
            </button>
          ))}
        </div>

        {/* Add Task */}
        <form
          onSubmit={addTask}
          className="flex flex-col md:flex-row gap-3 mb-6 items-center"
        >
          <input
            type="text"
            placeholder="Task title"
            value={newTask.title}
            onChange={(e) =>
              setNewTask({ ...newTask, title: e.target.value })
            }
            className="w-full md:flex-1 p-2 rounded bg-[#0a0f1f] border border-cyan-600 text-white"
          />
          <input
            type="text"
            placeholder="Description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            className="w-full md:flex-1 p-2 rounded bg-[#0a0f1f] border border-cyan-600 text-white"
          />
          <input
            type="date"
            value={newTask.due_date}
            onChange={(e) =>
              setNewTask({ ...newTask, due_date: e.target.value })
            }
            className="p-2 rounded bg-[#0a0f1f] border border-cyan-600 text-white"
          />
          <button
            type="submit"
            className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded text-white font-medium"
          >
            <Plus size={18} /> Add Task
          </button>
        </form>

        {/* Task List */}
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={`${filter}-${tasks.map((t) => t.is_completed).join(",")}`}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={tabVariants}
            transition={{ duration: 0.3 }}
          >
            {loading ? (
              <p className="text-center text-gray-400">Loading tasks...</p>
            ) : filteredTasks.length === 0 ? (
              <p className="text-center text-gray-400">
                No {filter} tasks found. Add one!
              </p>
            ) : (
              <div className="space-y-3">
                {filteredTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    layout
                    className={`flex justify-between items-center border rounded-lg p-4 transition-all duration-200 ${
                      task.is_completed
                        ? "border-green-500 bg-green-900/20"
                        : "border-cyan-600 bg-cyan-900/20"
                    }`}
                  >
                    <div>
                      <h3
                        className={`text-lg font-semibold ${
                          task.is_completed
                            ? "line-through text-gray-400"
                            : "text-white"
                        }`}
                      >
                        {task.title}
                      </h3>

                      {task.description && (
                        <p className="text-sm text-gray-400">
                          {task.description}
                        </p>
                      )}

                      {task.due_date && (
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                          <Clock size={14} />
                          {new Date(task.due_date).toDateString()}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          toggleComplete(task.id, task.is_completed)
                        }
                        className="text-cyan-400 hover:text-green-400 transition"
                        title="Mark as complete"
                      >
                        {task.is_completed ? (
                          <CheckCircle size={22} />
                        ) : (
                          <Circle size={22} />
                        )}
                      </button>

                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-red-500 hover:text-red-700 transition"
                        title="Delete task"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
 