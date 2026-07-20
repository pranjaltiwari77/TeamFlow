function TaskInfo({ task }) {
    return (
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-5">{task.title}</h2>
  
        <div className="grid md:grid-cols-2 gap-5">
  
          <div>
            <p className="font-semibold">Description</p>
            <p className="text-gray-600 mt-1">
              {task.description}
            </p>
          </div>
  
          <div>
            <p className="font-semibold">Project</p>
            <p>{task.project?.name}</p>
          </div>
  
          <div>
            <p className="font-semibold">Assigned To</p>
            <p>{task.assignedTo?.name}</p>
          </div>
  
          <div>
            <p className="font-semibold">Status</p>
  
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
              {task.status}
            </span>
          </div>
  
          <div>
            <p className="font-semibold">Priority</p>
  
            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
              {task.priority}
            </span>
          </div>
  
          <div>
            <p className="font-semibold">Due Date</p>
  
            <p>
              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString()
                : "Not Set"}
            </p>
          </div>
  
        </div>
      </div>
    );
  }
  
  export default TaskInfo;