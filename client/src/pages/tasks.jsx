import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import CreateTask from "../components/createtask";

import { getTasks, createTask,updateTaskStatus, deleteTask, updateTask,getFilteredTasks } from "../services/task.service";
import { getProjects } from "../services/project.service";
import { getUsers } from "../services/user.service";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("");
const [priorityFilter, setPriorityFilter] = useState("");
const navigate = useNavigate();

useEffect(() => {
    loadTasks();
  }, [search, statusFilter, priorityFilter]);
  
  useEffect(() => {
    loadProjects();
    loadUsers();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await getFilteredTasks({
        search,
        status: statusFilter,
        priority: priorityFilter,
      });
  
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadProjects = async () => {
    try {
      const response = await getProjects();
      setProjects(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      if (editingTask) {
        await updateTask(editingTask._id, taskData);
  
        toast.success("Task Created Successfully");
  
        setEditingTask(null);
      } else {
        await createTask(taskData);
  
        toast.success("Task Updated Successfully");
      }
  
      setShowForm(false);
  
      loadTasks();
  
    } catch (error) {
        toast.error(error.response?.data?.message || "Operation Failed");
    }
  };
  const handleStatusChange = async (id, status) => {
    try {
      await updateTaskStatus(id, status);
  
      loadTasks();
  
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
  
    if (!confirmDelete) return;
  
    try {
      await deleteTask(id);
  
      toast.success("Task Deleted Successfully");
  
      loadTasks();
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
      <div className="flex gap-4 mb-6">

<input
  type="text"
  placeholder="Search Task..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="border rounded-lg p-2 w-72"
/>

<select
  value={statusFilter}
  onChange={(e) => setStatusFilter(e.target.value)}
  className="border rounded-lg p-2"
>
  <option value="">All Status</option>
  <option value="Pending">Pending</option>
  <option value="In Progress">In Progress</option>
  <option value="Under Review">Under Review</option>
  <option value="Completed">Completed</option>
</select>

<select
  value={priorityFilter}
  onChange={(e) => setPriorityFilter(e.target.value)}
  className="border rounded-lg p-2"
>
  <option value="">All Priority</option>
  <option value="Low">Low</option>
  <option value="Medium">Medium</option>
  <option value="High">High</option>
  <option value="Urgent">Urgent</option>
</select>

</div>
        <h1 className="text-3xl font-bold">Tasks</h1>

        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + New Task
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <CreateTask
  onSubmit={handleCreateTask}
  projects={projects}
  users={users}
  defaultValues={editingTask}
/>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Priority</th>
              <th className="p-3 text-left">Project</th>
              <th className="p-3 text-left">Assigned To</th>
              <th className="p-3 text-left">Actions</th>
              
            </tr>
          </thead>

          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center p-6"
                  
                >
                  No Tasks Found
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr
                  key={task._id}
                  className="border-t"
                >
                 <td className="p-3">
  <button
    onClick={() => navigate(`/task/${task._id}`)}
    className="text-blue-600 hover:underline font-medium"
  >
    {task.title}
  </button>
</td>

                  <td className="p-3">
  <select
    value={task.status}
    onChange={(e) =>
      handleStatusChange(task._id, e.target.value)
    }
    className="border rounded-lg p-2"
  >
    <option value="Pending">Pending</option>
    <option value="In Progress">In Progress</option>
    <option value="Under Review">Under Review</option>
    <option value="Completed">Completed</option>
  </select>
</td>

                  <td className="p-3">{task.priority}</td>

                  <td className="p-3">
                    {task.project?.name}
                  </td>

                  <td className="p-3">{task.assignedTo?.name}</td>

<td className="p-3 flex gap-2">

  <button
    onClick={() => handleEdit(task)}
    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
  >
    Edit
  </button>

  <button
    onClick={() => handleDelete(task._id)}
    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
  >
    Delete
  </button>

</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
}

export default Tasks;