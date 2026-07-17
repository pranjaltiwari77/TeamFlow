import { useEffect } from "react";
import { useForm } from "react-hook-form";

function CreateTask({
  onSubmit,
  projects,
  users,
  defaultValues,
}) {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    if (defaultValues) {
      reset({
        title: defaultValues.title,
        description: defaultValues.description,
        project: defaultValues.project?._id,
        assignedTo: defaultValues.assignedTo?._id,
        priority: defaultValues.priority,
        startDate: defaultValues.startDate?.substring(0, 10),
        dueDate: defaultValues.dueDate?.substring(0, 10),
      });
    }
  }, [defaultValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 mb-8"
    >
      <input
        {...register("title")}
        placeholder="Task Title"
        className="w-full border p-3 rounded-lg"
      />

      <textarea
        {...register("description")}
        placeholder="Description"
        className="w-full border p-3 rounded-lg"
      />

      <select
        {...register("project")}
        className="w-full border p-3 rounded-lg"
      >
        <option value="">Select Project</option>

        {projects.map((project) => (
          <option
            key={project._id}
            value={project._id}
          >
            {project.name}
          </option>
        ))}
      </select>

      <select
        {...register("assignedTo")}
        className="w-full border p-3 rounded-lg"
      >
        <option value="">Assign User</option>

        {users.map((user) => (
          <option
            key={user._id}
            value={user._id}
          >
            {user.name}
          </option>
        ))}
      </select>

      <select
        {...register("priority")}
        className="w-full border p-3 rounded-lg"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
        <option value="Urgent">Urgent</option>
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

      <button
        type="submit"
        className="bg-blue-600 text-white px-5 py-2 rounded-lg"
      >
        {defaultValues ? "Update Task" : "Create Task"}
      </button>
      <button
  type="button"
  onClick={() => window.location.reload()}
  className="w-full mt-2 bg-gray-500 text-white py-2 rounded-lg"
>
  Cancel
</button>
    </form>
  );
}

export default CreateTask;