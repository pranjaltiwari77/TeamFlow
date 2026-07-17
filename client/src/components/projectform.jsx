import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getUsers } from "../services/user.service";

function ProjectForm({ onSubmit }) {
  const { register, handleSubmit } = useForm();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

      <input
        {...register("name")}
        placeholder="Project Name"
        className="w-full border p-3 rounded-lg"
      />

      <textarea
        {...register("description")}
        placeholder="Description"
        className="w-full border p-3 rounded-lg"
      />

      <select
        {...register("status")}
        className="w-full border p-3 rounded-lg"
      >
        <option value="Planning">Planning</option>
        <option value="Active">Active</option>
        <option value="On Hold">On Hold</option>
        <option value="Completed">Completed</option>
      </select>

      <input
        type="date"
        {...register("startDate")}
        className="w-full border p-3 rounded-lg"
      />

      <input
        type="date"
        {...register("dueDate")}
        className="w-full border p-3 rounded-lg"
      />

      <div>
        <label className="block mb-2 font-medium">
          Select Members
        </label>

        <select
          multiple
          {...register("members")}
          className="w-full border p-3 rounded-lg h-40"
        >
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>

        <p className="text-sm text-gray-500 mt-1">
          Hold Ctrl (Windows) / Cmd (Mac) to select multiple users.
        </p>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-5 py-2 rounded-lg"
      >
        Create Project
      </button>

    </form>
  );
}

export default ProjectForm;