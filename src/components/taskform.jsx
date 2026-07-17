import { useForm } from "react-hook-form";

function TaskForm({
  onSubmit,
  projects = [],
  users = [],
  defaultValues = {},
}) {
  const { register, handleSubmit } = useForm({
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <div>
        <label className="block mb-1 font-medium">
          Title
        </label>

        <input
          {...register("title", {
            required: true,
          })}
          placeholder="Task Title"
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Description
        </label>

        <textarea
          {...register("description", {
            required: true,
          })}
          rows={4}
          placeholder="Description"
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Project
        </label>

        <select
          {...register("project", {
            required: true,
          })}
          className="w-full border rounded-lg p-3"
        >
          <option value="">
            Select Project
          </option>

          {projects.map((project) => (
            <option
              key={project._id}
              value={project._id}
            >
              {project.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Assign User
        </label>

        <select
          {...register("assignedTo", {
            required: true,
          })}
          className="w-full border rounded-lg p-3"
        >
          <option value="">
            Select User
          </option>

          {users.map((user) => (
            <option
              key={user._id}
              value={user._id}
            >
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">

        <div>
          <label className="block mb-1 font-medium">
            Priority
          </label>

          <select
            {...register("priority")}
            className="w-full border rounded-lg p-3"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Urgent">Urgent</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Status
          </label>

          <select
            {...register("status")}
            className="w-full border rounded-lg p-3"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">
              In Progress
            </option>
            <option value="Under Review">
              Under Review
            </option>
            <option value="Completed">
              Completed
            </option>
          </select>
        </div>

      </div>

      <div className="grid grid-cols-2 gap-4">

        <div>
          <label className="block mb-1 font-medium">
            Start Date
          </label>

          <input
            type="date"
            {...register("startDate")}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Due Date
          </label>

          <input
            type="date"
            {...register("dueDate")}
            className="w-full border rounded-lg p-3"
          />
        </div>

      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white rounded-lg px-5 py-3 w-full"
      >
        Save Task
      </button>

    </form>
  );
}

export default TaskForm;