import { useEffect, useState } from "react";
import TaskForm from "./taskform";

import { createTask } from "../services/task.service";
import { getProjects } from "../services/project.service";
import { getUsers } from "../services/user.service";

function CreateTaskModal({ onClose, onSuccess }) {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const projectRes = await getProjects();
      const userRes = await getUsers();

      setProjects(projectRes.data);
      setUsers(userRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (data) => {
    try {
      await createTask(data);

      toast.success("Task Created Successfully");

      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || "Task Creation Failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

      <div className="bg-white w-full max-w-2xl rounded-xl p-6">

        <div className="flex justify-between items-center mb-5">

          <h2 className="text-2xl font-bold">
            Create Task
          </h2>

          <button
            onClick={onClose}
            className="text-red-600 text-xl"
          >
            ✕
          </button>

        </div>

        <TaskForm
          onSubmit={handleSubmit}
          projects={projects}
          users={users}
        />

      </div>

    </div>
  );
}

export default CreateTaskModal;